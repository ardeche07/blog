import glob from "glob";
import { resolve, join } from "path";
import { writeFileSync } from "fs";
import { format } from "date-fns";
import dotEnv from "dotenv";
import {
  extensions,
  getURIFromPath,
  pagesRoot,
} from "../.build/server/pages-helpers.mjs";

const SITEMAP_FILE_FOLDER = resolve("./public/");

dotEnv.config();

if (process.env.NODE_ENV === "development") {
  dotEnv.config({ path: resolve(process.cwd(), ".env.development") });
} else {
  dotEnv.config({ path: resolve(process.cwd(), ".env.production") });
}

const host = process.env.NEXT_PUBLIC_HOST;
const defaultLastmod = format(new Date(), "yyyy-MM-dd");
const blogIndex = `${pagesRoot}/[[...path]].jsx`;

const generateSitemapPage = ({
  loc,
  lastmod = defaultLastmod,
  changefreq = "daily",
  priority,
}) => {
  return (
    "  <url>\n" +
    `    <loc>${host}${loc}</loc>\n` +
    `    <lastmod>${lastmod}</lastmod>\n` +
    `    <changefreq>${changefreq}</changefreq>\n` +
    (priority ? `    <priority>${priority}</priority>\n` : "") +
    "  </url>\n"
  );
};

export const sitemapGenerator = ({ pages, path }) => {
  const sourcemap =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    pages.map(generateSitemapPage).join("") +
    "</urlset>";

  writeFileSync(path, sourcemap);
};

/*
 * Filenames inside "pages" folder to exclude from sitemsp.
 * Docs pages are also filtered here and are added separately later
 * to filter only the current version.
 */
const ignorePages = [
  new RegExp(`^${pagesRoot}/api/.*$`),
  new RegExp(`^${pagesRoot}/_app.(${extensions.join("|")})$`),
  new RegExp(`^${pagesRoot}/_document.(${extensions.join("|")})$`),
];

/*
 * We generate blog paths.
 */
export const getBlogPaths = () => {
  const paths = glob
    .sync(join(pagesRoot, `**/*.{${extensions.join()}}`))
    .filter(
      (path) =>
        !ignorePages.some((regexp) => regexp.test(path)) && path !== blogIndex
    );
  paths.unshift(pagesRoot + "/");
  return paths.map((path) => getURIFromPath(path));
};

/*
 * Generates sitemap used by search engines.
 */
const blogPages = getBlogPaths().map((loc) => ({ loc }));

sitemapGenerator({
  pages: [...blogPages],
  path: resolve(SITEMAP_FILE_FOLDER, "sitemap.xml"),
});
