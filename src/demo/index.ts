import { login } from './services/auth.service';
import { scrapeProducts } from './services/scrape.service';
import { scrapeHTMLProducts } from './services/scrape-html.service';
import { saveJSON } from './utils/file';
import { prisma } from './utils/db';

type Product = {
  id: number;
  title: string;
  price: number;
  category: string;
  description?: string;
  image?: string;
};

type Description = string | null;

type CombinedProduct = {
  id: number;
  title: string;
  price: number;
  category: string;
  from: 'api';
  htmlSnippet: Description;
};

async function main(): Promise<void> {
  console.log('Start');
  const token = await login();
  if (!token) throw new Error('Failed to retrieve token');
  console.log('Token received');

  const products: Product[] = await scrapeProducts(token);
  console.log(`Products: ${products.length}`);
  await saveJSON('src/demo/data/products.json', products);

  const descriptions: Description[] = await scrapeHTMLProducts();
  console.log(`HTML snippets: ${descriptions.length}`);
  await saveJSON('src/demo/data/descriptions.json', descriptions);

  const combined: CombinedProduct[] = products.map(
    (p, i): CombinedProduct => ({
      id: p.id,
      title: p.title,
      price: p.price,
      category: p.category,
      from: 'api',
      htmlSnippet: descriptions[i] ?? null,
    })
  );

  await saveJSON('src/demo/data/combined.json', combined);
  console.log(`Combined: ${combined.length}`);

  await prisma.product.deleteMany();
  const result = await prisma.product.createMany({
    data: combined,
    //skipDuplicates: true,
  });

  console.log(`Saved to DB. Inserted: ${result.count}`);
}

main()
  .catch((e: unknown) => {
    if (e instanceof Error) console.error('Error in main:', e.message);
    else console.error('Error in main:', e);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log('Prisma disconnected');
  });
