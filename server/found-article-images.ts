import { BlogMeta } from "layouts/BlogArticle/types";
import { getPagesInfo, getArticleTags } from "./pages-helpers";

// We need this script to copy the images from the last five articles into a public folder.
// These images are needed on the main page of the blog.

export const foundArticleImages = () => {
  const posts = getPagesInfo<BlogMeta>(`/**/*.mdx`, {
    sort: "date",
    order: "DESC",
  });

  const tags = getArticleTags();
  const featuredPosts = [];

  tags.forEach((tag) => {
    const postsByTag = posts.filter((post) => {
      return post.data.frontmatter.tags.some((postTag) => postTag === tag);
    });

    featuredPosts.push(...postsByTag.slice(0, 5));
  });

  featuredPosts.push(...posts.slice(0, 5));

  const images = [];

  featuredPosts.forEach((post) => {
    const {
      data: {
        frontmatter: {
          logo: { image },
        },
        uri,
      },
    } = post;

    images.push({ image, uri: uri.replaceAll("/", "") });
  });

  return images;
};
