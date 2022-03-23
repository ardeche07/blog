import { MDXProvider } from "@mdx-js/react";
import styled from "styled-components";
import css from "@styled-system/css";
import Drift from "components/Drift";
import NextImage from "next/image";
import Box from "components/Box";
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
import ShareButtons from "components/ShareButtons";
import { BlogMeta } from "layouts/BlogArticle/types";
import divider from "./assets/divider.png";
import rss from "./assets/rss.svg";
import { components } from "./components";
import { format } from "date-fns";

interface MetaBlogArticle extends BlogMeta {
  noindex?: boolean;
  featuredList?: BlogArticleInfo[];
  articleTags?: string[];
}

interface BlogArticleProps {
  meta: MetaBlogArticle;
  children: React.ReactNode;
}

export const getParsedDate = (date) => {
  // date needs to be coerced into DateTime because dates can't be of type string when passed as arg to 'format'
  const initialParsedDate = new Date(date);
  // date needs to be adjusted to take into account time zone differences
  // the time zone offset from PST is subtracted from the initial parsed date
  const adjustedDate = new Date(
    // valueOf() returns number of milliseconds between 1 January 1970 00:00:00 UTC and the given date
    initialParsedDate.valueOf() +
      // getTimeZoneOffset returns the time zone difference, in minutes, from current locale to UTC
      // multiplying by '60' gives us the difference in seconds
      // multiplying by '1000' gives us the difference in milliseconds
      initialParsedDate.getTimezoneOffset() * 60 * 1000
  );
  // formats the date to be Month, Day Year
  return format(adjustedDate, "MMM d, yyyy");
};

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
  // articlesInfo returns the last 6 blog posts
  const articlesInfo: BlogArticleInfo[] = featuredList
    ?.filter(
      (article) =>
        article.frontmatter.articleTitle !== articleTitle &&
        Boolean(article.frontmatter.logo) // filter out the post itself as well as posts without cover photo
    )
    .slice(0, 3);
  const parsedDate = getParsedDate(date);

  return (
    <>
      <Head
        title={title ? title : articleTitle}
        description={description}
        noIndex={noindex}
      />
      <Layout lineHeight="lg" hideWave="true" pt={[6, 11]}>
        <Section py={[6, 11]} bg="flatWhite">
          <Centrator
            flexDirection="column"
            textAlign="center"
            alignItems="center"
          >
            <a href="/blog/rss.xml" aria-label="rss feed">
              <StyledIconRSS />
            </a>
            <SearchSite />
            <StyledTitle as="h1">{articleTitle}</StyledTitle>
            <Box
              as="p"
              textTransform="uppercase"
              text="text-md"
              mt="2"
              mb={[6, 11]}
            >
              {parsedDate} by {author}
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
            <Tags tags={tags} mt={[5, 8]} />
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
      <ShareButtons />
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
    width: "100%",
    mt: [3, 4],
  })
);

const StyledIconRSS = styled("span")(
  css({
    display: "block",
    width: "16px",
    height: "16px",
    p: 2,
    backgroundColor: "darkest",
    maskImage: `url(${rss})`,
    maskRepeat: "no-repeat",
    maskPosition: "center",
  })
);
