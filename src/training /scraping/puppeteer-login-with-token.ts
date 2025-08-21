import axios from "axios";
import puppeteer from "puppeteer";
import * as cheerio from "cheerio";

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto("https://the-internet.herokuapp.com/login", {
    waitUntil: "networkidle0",
  });

  const html = await page.content();
  const $ = cheerio.load(html);

  console.log("Page title:", $("title").text());
  console.log("H2:", $("h2").text());


  page.on("response", async (res) => {
    if (res.url().includes("/auth/login")) {
      console.log("Login response:", res.status(), res.url());
      try {
        const data = await res.json();
        console.log("Token:", data.token);
      } catch (e) {
        console.error("Could not parse JSON:", e);
      }
    }
  });

  await page.goto("https://fakestoreapi.com");
  const token = await page.evaluate(async () => {
    const res = await fetch("https://fakestoreapi.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: "mor_2314",
        password: "83r5^_",
      }),
    });
    const data = await res.json();
    return data.token;
  });

  console.log("token:", token);

  if (token) {
  const res = await axios.get("https://fakestoreapi.com/carts", {
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log("🛒 carts:", res.data);
}

  //await browser.close();
})();