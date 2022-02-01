/*
 * Collection of helpers for gathering metainformation from mdx files.
 */

import type { MDXPage, MDXPageData, MDXPageFrontmatter } from "./types-unist";

import glob from "glob";
import { resolve, join } from "path";
import { readSync } from "to-vfile";
import matter from "gray-matter";
import { sorter } from "../utils/sorter";

export const extensions = ["md", "mdx", "ts", "tsx", "js", "jsx"];

export const pagesRoot = resolve("pages");

/*
 * Returns public uri that the files in "pages" folder will have on prod.
 *
 * Does NOT normaize current versions for docs.
 */

export const getURIFromPath = (path: string): string => {
  return path
    .replace(pagesRoot, "")
    .replace(new RegExp(`(/index)?.(${extensions.join("|")})$`), "/");
};

/* Next build happens in the single process so we can cache file data */

const cache: Record<string, MDXPage> = {};

/*
 * Returns VFile for the mdx file in "pages" with parsed frontmatter and public uri.
 *
 * Tip: Replace T with correct frontmatter structure for the page type
 * then executing for better autosuggerst and error handling
 */

export const getPageInfo = <T = MDXPageFrontmatter>(
  path: string
): MDXPage<T> => {
  let result: MDXPage<T> = cache[path] as MDXPage<T>;

  if (!result) {
    const file = readSync(path, "utf-8") as MDXPage<T>;

    const { data } = matter(file.value);

    file.data = {
      frontmatter: data,
      uri: getURIFromPath(path),
    } as MDXPageData<T>;

    result = file;
    cache[path] = result as MDXPage<MDXPageFrontmatter>;
  }

  return result;
};

interface GetPagesInfoOptions<T = MDXPageFrontmatter> {
  sort?: string | ((frontmatter: T) => unknown);
  order?: "ASC" | "DESC";
  filter?: (frontmatter: T) => boolean;
  limit?: number;
}

/*
 * Returns filtered, sorted and limited to a number of entries array of page info objects.
 */

export const getPagesInfo = <T = MDXPageFrontmatter>(
  pagesGlob: string,
  { sort, order = "ASC", filter, limit }: GetPagesInfoOptions<T> = {}
): MDXPage<T>[] => {
  let pages = glob
    .sync(join(pagesRoot, pagesGlob))
    .map((path) => getPageInfo<T>(path));

  if (filter) {
    pages = pages.filter(({ data: { frontmatter } }) => filter(frontmatter));
  }

  if (sort) {
    pages = pages.sort((A, B) => {
      const sortFunc =
        typeof sort === "string" ? (frontmatter: T) => frontmatter[sort] : sort;

      const valueA = sortFunc(A.data.frontmatter);
      const valueB = sortFunc(B.data.frontmatter);

      return sorter(valueA, valueB, order);
    });
  }

  if (limit) {
    pages = pages.slice(0, limit);
  }

  return pages;
};
