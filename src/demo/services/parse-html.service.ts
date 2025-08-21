import * as cheerio from 'cheerio';

export function extractDescriptions(html: string): string[] {
  const $ = cheerio.load(html);
  return $('p')
    .map((_: number, el: cheerio.Element) => $(el).text().trim())
    .get()
    .filter(Boolean);
}
