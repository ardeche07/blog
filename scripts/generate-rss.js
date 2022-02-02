/*
 * Generates rss feed file.
 */

const { resolve } = require("path");
const { writeFileSync, existsSync, mkdirSync } = require("fs");
const dotEnv = require("dotenv");

/* dotEnv is used here to read .env file values that are used inside server/rss */

dotEnv.config();

if (process.env.NODE_ENV === "development") {
  dotEnv.config({ path: resolve(process.cwd(), ".env.development") });
} else {
  dotEnv.config({ path: resolve(process.cwd(), ".env.production") });
}

const { generateRss } = require("../.build/server/rss");

const RSS_FILE_FOLDER = resolve("./public/blog");
const RSS_FILE_NAME = resolve(RSS_FILE_FOLDER, "rss.xml");

const rss = generateRss();

if (!existsSync(RSS_FILE_FOLDER)) {
  mkdirSync(RSS_FILE_FOLDER);
}

writeFileSync(RSS_FILE_NAME, rss);

console.log(`Rss successfully created: ${RSS_FILE_NAME}`);
