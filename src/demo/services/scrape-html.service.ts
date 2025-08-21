import { fetchHTML } from "./browser.service";
import { extractDescriptions } from "./parse-html.service";

export async function scrapeHTMLProducts() {
  const html = await fetchHTML("https://fakestoreapi.com/");

  return extractDescriptions(html);
}