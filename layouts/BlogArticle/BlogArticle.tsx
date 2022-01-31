import { MDXProvider } from "@mdx-js/react";
import styled from "styled-components";
import css from "@styled-system/css";
import Drift from "components/Drift";
import { format } from "date-fns";
import NextImage, { ImageProps } from "next/image";
import Box from "components/Box";
import Flex from "components/Flex";
import FeaturedArticleCards from "./FeaturedArticleCards";
import type { BlogArticle as BlogArticleInfo } from "./types";
import Footer from "components/Footer";
import Head from "components/Head";
import Centrator from "components/Centrator";
import Layout from "components/Layout";
import Section from "components/Section";
import Tags from "components/Tags";
import Link from "components/Link";
import TryTeleport from "components/TryTeleport";
import SearchSite from "components/SearchSite";
import divider from "./assets/divider.png";
import rss from "./assets/rss.svg";
import { components } from "./components";

interface BlogArticleProps {
  meta: {
    title: string;
    description: string;
    articleTitle: string;
    date: Date;
    logo?: { image: Exclude<ImageProps["src"], string>; alt: string };
    author: string;
    tags: string[];
    noindex?: boolean;
    featuredList?: BlogArticleInfo[];
    articleTags?: string[];
  };
  children: React.ReactNode;
}

export const BlogArticle = ({
  children,
  meta: {
    title,
    description,
    articleTitle,
    date,
    logo,
    author,
    tags,
    noindex,
    featuredList,
    articleTags,
  },
}: BlogArticleProps) => {
  const articlesInfo: BlogArticleInfo[] = featuredList
    ?.filter((article) => article.frontmatter.articleTitle !== articleTitle)
    .slice(0, 3);

  return (
    <>
      <Head title={title} description={description} noIndex={noindex} />
      <Layout
        border="none"
        behaviour="floating"
        lineHeight="lg"
        hideWave="true"
        pt={[6, 11]}
      >
        <Section py={[6, 11]} bg="flatWhite">
          <Centrator flexDirection="column" textAlign="center">
            <StyledLink href="/blog/rss.xml" ariaLabel="rss feed"></StyledLink>
            <Flex justifyContent="space-between" flexWrap={["wrap", "unset"]}>
              <Box
                width="200px"
                flexShrink={0}
                display={["none", "block"]}
              ></Box>
              <StyledTitle as="h1">{articleTitle}</StyledTitle>
              <SearchSite />
            </Flex>
            <Box
              as="p"
              textTransform="uppercase"
              text="text-md"
              mt="2"
              mb={[6, 11]}
            >
              {format(new Date(date), "MMM d, yyyy")} by {author}
            </Box>
            {logo && (
              <NextImage
                src={logo.image}
                width={1240}
                height={704}
                layout="intrinsic"
                alt={logo.alt}
              />
            )}
          </Centrator>
          <StyledWrapper>
            <MDXProvider components={components}>{children}</MDXProvider>
            <Tags size="sm" tags={tags} mt={[5, 8]} />
          </StyledWrapper>
        </Section>
        {articlesInfo && (
          <Section py={[6, 11]} bg="flatGray">
            <Centrator maxWidth={760} flexDirection="column">
              <Box as="h2" text="text-xl" textTransform="uppercase">
                Featured articles:
              </Box>
              <FeaturedArticleCards articles={articlesInfo} />
              <Box as="h2" text="text-xl" textTransform="uppercase" mt={[5, 9]}>
                View articles by topic:
              </Box>
              <Tags tags={articleTags} mt="4" />
            </Centrator>
          </Section>
        )}
        <TryTeleport />
      </Layout>
      <Footer />
      <Drift />
    </>
  );
};

const StyledWrapper = styled(Centrator)(
  css({
    position: "relative",
    maxWidth: 980,
    flexDirection: "column",
    backgroundImage: `url(${divider})`,
    backgroundSize: "100% auto",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "top center",
    px: [4, "110px"],
    pt: [4, "90px"],

    "& p": {
      fontSize: ["text-xl", "header-4"],
    },

    "& video": {
      mt: 5,
    },
  })
);

const StyledTitle = styled(Box)(
  css({
    fontSize: ["header-2", "header-1"],
    lineHeight: ["xl", "xxl"],
    px: 3,
    width: ["100%", "auto"],
    order: [2, "unset"],
    mt: [3, 0],
  })
);

const StyledLink = styled(Link).attrs({ "aria-label": "rss feed" })(
  css({
    width: "fit-content",
    alignSelf: "center",
    p: 2,

    "&::before": {
      content: '""',
      display: "block",
      width: "16px",
      height: "16px",
      backgroundColor: "darkest",
      maskImage: `url(${rss})`,
    },

    "&:hover::before, &:focus::before": {
      backgroundColor: "light-purple",
    },
  })
);
