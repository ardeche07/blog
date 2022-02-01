import { ImageProps } from "next/image";

export interface BlogArticle {
  frontmatter: {
    title: string;
    description: string;
    articleTitle: string;
    date: Date;
    author: string;
    logo: { image: Exclude<ImageProps["src"], string>; alt: string };
    tags: string[];
    layout: string;
  };
  uri: string;
}

export interface FeaturedArticleCardsProps {
  articles: BlogArticle[];
}
