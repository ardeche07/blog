import { ImageProps } from "next/image";

export interface BlogMeta {
  title: string;
  description: string;
  articleTitle: string;
  date: Date;
  author: string;
  logo?: { image: Exclude<ImageProps["src"], string>; alt: string };
  tags: string[];
  layout: string;
}

export interface BlogArticle {
  frontmatter: BlogMeta;
  uri: string;
}

export interface FeaturedArticleCardsProps {
  articles: BlogArticle[];
}
