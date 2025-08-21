import * as cheerio from 'cheerio';

export function extractDescriptions(html: string): string[] {
  const $ = cheerio.load(html);
  return $('p')
    .map((_, el) => $(el).text().trim())
    .get()
    .filter(Boolean);
}
