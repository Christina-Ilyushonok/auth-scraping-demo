-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "category" TEXT NOT NULL,
    "from" TEXT NOT NULL DEFAULT 'api',
    "htmlSnippet" TEXT
);
INSERT INTO "new_Product" ("category", "from", "htmlSnippet", "id", "price", "title") SELECT "category", "from", "htmlSnippet", "id", "price", "title" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
