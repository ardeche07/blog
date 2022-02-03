/*
 * Generates rss feed file.
 */

import { resolve } from "path";
import { writeFileSync, existsSync, mkdirSync } from "fs";
import dotEnv from "dotenv";

/* dotEnv is used here to read .env file values that are used inside server/rss */

dotEnv.config();

if (process.env.NODE_ENV === "development") {
  dotEnv.config({ path: resolve(process.cwd(), ".env.development") });
} else {
  dotEnv.config({ path: resolve(process.cwd(), ".env.production") });
}

import { generateRss } from "../.build/server/rss.mjs";

const RSS_FILE_FOLDER = resolve("./public/");
const RSS_FILE_NAME = resolve(RSS_FILE_FOLDER, "rss.xml");

const rss = generateRss();

if (!existsSync(RSS_FILE_FOLDER)) {
  mkdirSync(RSS_FILE_FOLDER);
}

writeFileSync(RSS_FILE_NAME, rss);

console.log(`Rss successfully created: ${RSS_FILE_NAME}`);
