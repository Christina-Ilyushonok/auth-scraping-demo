import { login } from './services/auth.service';
import { scrapeProducts } from './services/scrape.service';
import { scrapeHTMLProducts } from './services/scrape-html.service';
import { saveJSON } from './utils/file';

type Product = {
  id: number;
  title: string;
  price: number;
  category: string;
  description?: string;
  image?: string;
};
type Description = string | null;

type CombinedProduct = Product & {
  from: 'api';
  htmlSnippet: Description;
};

async function main() {
  const token = await login();
  console.log('token:', token);

  if (!token) {
    throw new Error('Failed to retrieve token');
  }

  const products: Product[] = await scrapeProducts(token);
  await saveJSON('src/demo/data/products.json', products);

  const descriptions: Description[] = await scrapeHTMLProducts();
  await saveJSON('src/demo/data/descriptions.json', descriptions);

    const combined: CombinedProduct[] = products.map((p, i): CombinedProduct => ({
    id: p.id,
    title: p.title,
    price: p.price,
    category: p.category,
    from: 'api',
    htmlSnippet: descriptions[i] ?? null,
  }));

  await saveJSON('src/demo/data/combined.json', combined);
}

main().catch(e => console.error('Error in main:', e));
