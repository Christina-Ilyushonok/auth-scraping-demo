Mini-project to practice auth-aware scraping with JS/TS: token-based auth (Bearer/JWT), cookie-based auth (session), Puppeteer + Cheerio parsing, and saving results to SQLite via Prisma.

Stack
	•	Node.js (TypeScript)
	•	Axios / native fetch
	•	Puppeteer
	•	Cheerio
	•	Prisma + SQLite
	•	ts-node

Project structure

src/
  training/               # step-by-step exercises (HTTP, redirects, login flows)
    http/
      get-post.ts
      token-auth.ts
      redirect-test.ts
    scraping/
      puppeteer-login-with-token.ts
      puppeteer-login-with-cookies.ts
  demo/                   # end-to-end demo pipeline
    index.ts              # ogin -> fetch -> scrape -> combine -> save
    data/                 # generated JSON files
    services/
      auth.service.ts     # login/token helpers
      scrape.service.ts   # API products (axios/fetch)
      scrape-html.service.ts  # HTML scraping via Puppeteer + Cheerio
    utils/
      file.ts             # saveJSON with mkdirp
      db.ts               # Prisma client
prisma/
  schema.prisma


Prerequisites
	•	Node.js 18+ (native fetch is available)
	•	npm
	•	SQLite (bundled with Prisma; no separate install needed)

Setup
	1.	Install dependencies

npm install

	2.	Initialize Prisma (creates prisma/dev.db)

npm run prisma:init   # optional alias if you add a script
# or explicitly:
npx prisma init --datasource-provider sqlite
npx prisma migrate dev --name init

	3.	Environment (if needed)

	•	Demo uses public fakestoreapi.com credentials for token auth:
	•	username: mor_2314
	•	password: 83r5^_
	•	No .env is strictly required for the core demo.

Run the end-to-end demo

npm run demo
