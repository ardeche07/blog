import { Feed } from "feed";
import { BlogMeta } from "layouts/BlogArticle/types";
import { getPagesInfo } from "./pages-helpers";

const host = process.env.NEXT_PUBLIC_HOST as string;

/*
 * Generates RRS feed from the *.mdx files in the "pages" folder.
 
 * For now it uses "description" field value for the post content because
 * converting actual mdx to sanitized html was deemed to time consuming.
 * But actual content can be added ifby either removing all react components 
 * from posts and rendering them to html with remark/rehype, or by parsing and
 * normalizing static html files in the .next folder.
 */

export const generateRss = () => {
  const posts = getPagesInfo<BlogMeta>(`/**/*.mdx`, {
    sort: "date",
    order: "DESC",
  });

  const feed = new Feed({
    title: "The Teleport Blog",
    description: "Recent content in The Teleport Blog",
    id: "https://goteleport.com/blog/",
    link: "https://goteleport.com/blog/",
    language: "en-us",
    favicon: "https://goteleport.com/blog/static/favicon.ico",
    copyright:
      "Copyright © 2021, built by Gravitational Inc. All rights reserved.",
  });

  posts.forEach((post) => {
    const {
      data: {
        frontmatter: { title, date, description },
        uri,
      },
    } = post;

    const link = `${host}${uri}`;

    feed.addItem({
      title,
      link,
      date: new Date(date),
      id: link,
      description,
    });
  });

  return feed.rss2();
};
