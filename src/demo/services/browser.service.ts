import puppeteer from "puppeteer";

export async function fetchHTML(url: string): Promise<string> {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: "domcontentloaded" });

  const html = await page.content();

  await browser.close();
  return html;
}