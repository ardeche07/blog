/*
 * For some reason that I don't understand and can't reproduce in separate repo,
 * Vercel will fall with error in svgr image path if this file has tsx extension
 * AND also have getStaticProps. So I changed it to JSX.
 */

import Blog from "layouts/Blog";
import { generateCoverImagePath } from "utils/generate-cover-image-path";
import { getArticlesListAndTags } from "server/pages-helpers";

const ARTICLES_BY_PAGE = 25;
const ARTICLE_COVERS_FOLDER = "/blog/covers/";

function getArticlesByTag(artList, tag) {
  return artList.filter((art) =>
    art.frontmatter.tags.some((artTag) => artTag === tag)
  );
}

function addPaths(articlesList, pathsArray, tag) {
  const maxPages = Math.ceil((articlesList.length + 1) / ARTICLES_BY_PAGE);

  if (tag) {
    pathsArray.push({ params: { path: ["tags", tag] } });
    for (let i = 0; i <= maxPages; i++) {
      pathsArray.push({ params: { path: ["tags", tag, "page", `${i + 1}`] } });
    }
  } else {
    for (let i = 0; i <= maxPages; i++) {
      pathsArray.push({ params: { path: ["page", `${i + 1}`] } });
    }
  }
}

/*
 * write the path to the image, which is in the public folder,
 * for the first five posts on the home page and on the tags page
 */
function createPathToCover(articles, pageNumber) {
  return articles.map((a, i) => {
    if (pageNumber === "1" && i < 5 && a.frontmatter.logo) {
      return {
        ...a,
        frontmatter: {
          ...a.frontmatter,
          logo: {
            ...a.frontmatter.logo,
            image: `${ARTICLE_COVERS_FOLDER}${generateCoverImagePath(
              articles[i].frontmatter.logo.image,
              articles[i].uri
            )}`,
          },
        },
      };
    } else {
      return { ...a };
    }
  });
}

/*
 * remove the logo field from the frontmatter for posts where we don't display the cover
 */
function removeImage(articles, pageNumber) {
  return articles.map((a, i) => {
    if (i > 4 || pageNumber !== "1") {
      return {
        ...a,
        frontmatter: { ...a.frontmatter, logo: null },
      };
    }
    return { ...a };
  });
}

export async function getStaticPaths() {
  const articlesAndTags = await getArticlesListAndTags();
  const tags = articlesAndTags.tags;
  const articles = articlesAndTags.list;
  const paths = [];

  tags.forEach((tag) => {
    const articlesByTag = getArticlesByTag(articles, tag);
    addPaths(articlesByTag, paths, tag);
  });

  addPaths(articles, paths);

  paths.unshift({ params: { path: null } });

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const { tags, list } = await getArticlesListAndTags();
  let tag = null;
  let pageNumber = "1";
  let maxPages = Math.ceil(list.length / ARTICLES_BY_PAGE);

  if (params.path) {
    for (let i = 0; i < params.path.length; i++) {
      if (params.path[i] === "tags") {
        tag = params.path[i + 1];
      }
      if (params.path[i] === "page") {
        pageNumber = params.path[i + 1];
      }
    }
  }

  let articles = [];
  let articlesWithPathToCover = [];
  let articlesWithoutLogo = [];
  const initialPageCount = ARTICLES_BY_PAGE * (Number(pageNumber) - 1);
  const finalPageCount = ARTICLES_BY_PAGE * Number(pageNumber);

  if (tag) {
    const articlesByFilter = getArticlesByTag(list, tag);
    maxPages = Math.ceil((articlesByFilter.length + 1) / ARTICLES_BY_PAGE);
    articles = articlesByFilter.slice(initialPageCount, finalPageCount);
    articlesWithPathToCover = createPathToCover(articles, pageNumber);
    articlesWithoutLogo = removeImage(articlesWithPathToCover, pageNumber);
  } else {
    articles = list.slice(initialPageCount, finalPageCount);
    articlesWithPathToCover = createPathToCover(articles, pageNumber);
    articlesWithoutLogo = removeImage(articlesWithPathToCover, pageNumber);
  }

  return {
    props: {
      tag,
      tags,
      articles: articlesWithoutLogo,
      currentPage: pageNumber,
      maxPages,
    },
  };
}

export default function BlogPage(props) {
  return <Blog {...props} />;
}
