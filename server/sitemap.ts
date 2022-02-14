import glob from "glob";
import { resolve, join } from "path";
import { writeFileSync } from "fs";
import { format } from "date-fns";
import { extensions, getURIFromPath, pagesRoot } from "./pages-helpers";

const host = process.env.NEXT_PUBLIC_HOST as string;
const defaultLastmod = format(new Date(), "yyyy-MM-dd");
const blogIndex = `${pagesRoot}/[[...path]].jsx`;

interface SitemapPage {
  loc: string;
  lastmod?: string;
  changefreq?:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  priority?: number;
}

const generateSitemapPage = ({
  loc,
  lastmod = defaultLastmod,
  changefreq = "daily",
  priority,
}: SitemapPage) => {
  return (
    "  <url>\n" +
    `    <loc>${host}${loc}</loc>\n` +
    `    <lastmod>${lastmod}</lastmod>\n` +
    `    <changefreq>${changefreq}</changefreq>\n` +
    (priority ? `    <priority>${priority}</priority>\n` : "") +
    "  </url>\n"
  );
};

interface Sitemap {
  pages: SitemapPage[];
  path: string;
}

const sitemapGenerator = ({ pages, path }: Sitemap) => {
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

const getBlogPaths = () => {
  return glob
    .sync(join(pagesRoot, `**/*.{${extensions.join()}}`))
    .filter(
      (path) =>
        !ignorePages.some((regexp) => regexp.test(path)) && path !== blogIndex
    )
    .map((path) => getURIFromPath(path));
};

/*
 * Generates sitemap used by search engines.
 */

export const generateSitemap = () => {
  const blogPages = getBlogPaths().map((loc) => ({ loc }));

  sitemapGenerator({
    pages: [...blogPages],
    path: resolve("./public", "blog_sitemap.xml"),
  });
};
