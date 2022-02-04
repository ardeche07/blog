/*
 * Helper functions to generate props for "resources/*" pages.
 */

import type { BlogMeta } from "layouts/BlogArticle/types";
import { getPagesInfo } from "./pages-helpers";

const getArticlesList = () => {
  let articlesPageInfo = [];

  try {
    articlesPageInfo = getPagesInfo<BlogMeta>(`**/*.mdx`)
      .map(({ data }) => data)
      .filter((article) => article.frontmatter.layout === "blogArticle")
      .sort(
        (a, b) =>
          new Date(b.frontmatter.date).getTime() -
          new Date(a.frontmatter.date).getTime()
      );
  } catch (e) {
    console.error(e);
  }

  return articlesPageInfo;
};

export const getArticlesListAndTags = (limit?: number) => {
  const articlesList = getArticlesList();

  const rawAllTags: Set<string> = new Set();
  articlesList?.forEach((article) =>
    article.frontmatter.tags.forEach((tag) => rawAllTags.add(tag))
  );

  return {
    tags: Array.from(rawAllTags),
    list: limit ? articlesList.slice(0, limit) : articlesList,
  };
};
