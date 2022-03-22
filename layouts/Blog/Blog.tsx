import styled from "styled-components";
import css from "@styled-system/css";
import Drift from "react-driftjs";
import Head from "components/Head";
import Centrator from "components/Centrator";
import GDPRBanner from "components/GDPRBanner";
import Layout from "components/Layout";
import Box from "components/Box";
import Flex from "components/Flex";
import SectionHeader from "components/SectionHeader";
import Footer from "components/Footer";
import ArticleCard from "components/ArticleCard";
import SearchSite from "components/SearchSite";
import Link from "components/Link";
import rss from "./assets/rss.svg";
import Pagination from "components/Pagination";

function BlogIndexPage({
  articles = [],
  tags = [],
  tag,
  currentPage,
  maxPages,
}) {
  const articlesList = articles.map((art, index) => {
    return (
      <Box as="li" key={index}>
        <ArticleCard meta={art} />
      </Box>
    );
  });
  const additionalArticles = articlesList.slice(5);
  const tagsList = tags.map((tag, index) => {
    return (
      <Box as="li" marginRight={[2, 0]} key={index}>
        <StyledTags scheme="site" href={`/tags/${encodeURIComponent(tag)}`}>
          {tag}
        </StyledTags>
      </Box>
    );
  });

  return (
    <>
      <Head
        title={!!tag ? `Blog articles on ${tag}` : "Blog"}
        description="Welcome to the Teleport Blog! We write about operating cloud software in production"
      />
      <Layout>
        <SectionHeader
          subtitle={
            <StyledSubtitle as="p">
              Article & News
              <Link href="/rss.xml" aria-label="rss feed">
                <StyledIconRSS />
              </Link>
            </StyledSubtitle>
          }
          title="Teleport Blog"
          bg="wave-on-gray"
        />
        <Centrator>
          <StyledWrapper>
            <Box maxWidth="920px" mt={["3", "0"]}>
              <StyledTitle as="h2" text="text-xl">
                {`Articles ${!!tag ? `by topic ${tag}` : ""}`}
              </StyledTitle>
              <Box as="ul" listStyle="none" mt="3" mb="6">
                {articlesList.slice(0, 5)}
              </Box>
              {!!additionalArticles.length && (
                <>
                  {currentPage === "1" && (
                    <StyledTitle as="h2" text="text-xl" mt={["8", "11"]}>
                      Additional articles
                    </StyledTitle>
                  )}
                  <Box as="ul" listStyle="none" mt="3" mb="6">
                    {additionalArticles}
                  </Box>
                </>
              )}
              {maxPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  maxPage={maxPages}
                  baseUrl={!!tag ? `/tags/${tag}` : ""}
                />
              )}
            </Box>
            <StyledSideWrapper>
              <SearchSite smallSize />
              <StyledWrapperTags>
                <StyledLineTitle as="h2">Articles by topic</StyledLineTitle>
                <Box
                  as="ul"
                  listStyle="none"
                  mt={["0", "2"]}
                  mb="5"
                  display={["flex", "block"]}
                  flexWrap="wrap"
                >
                  {tagsList}
                </Box>
              </StyledWrapperTags>
            </StyledSideWrapper>
          </StyledWrapper>
        </Centrator>
      </Layout>
      <GDPRBanner />
      <Footer />
      <Drift appId={process.env.NEXT_PUBLIC_DRIFT_ID} />
    </>
  );
}

const StyledWrapper = styled("div")(
  css({
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    pt: 11,
    flexDirection: ["column-reverse", "row"],

    "@media(max-width: 560px)": {
      pt: 6,
    },
  })
);

const StyledTitle = styled(Box)(
  css({
    textTransform: "uppercase",
    color: "dark-gray",
  })
);

const StyledSubtitle = styled(Flex)(
  css({
    m: 0,
    alignItems: "center",
  })
);

const StyledIconRSS = styled("span")(
  css({
    display: "block",
    width: "16px",
    height: "16px",
    ml: 1,
    p: 2,
    backgroundColor: "dark-purple",
    maskImage: `url(${rss})`,
    maskRepeat: "no-repeat",
    maskPosition: "center",
  })
);

const StyledSideWrapper = styled("div")(
  css({
    display: ["flex", "block"],
    flexShrink: 0,

    "@media(max-width: 680px)": {
      flexDirection: "row",
    },

    "@media(max-width: 560px)": {
      flexDirection: "column-reverse",
    },
  })
);

const StyledLineTitle = styled(StyledTitle)(
  css({
    fontSize: "text-sm",
    lineHeight: "lg",
    mt: [2, 5],
    borderBottom: ["none", "1px solid"],
    borderBottomColor: ["transparent", "lightest-gray"],
  })
);

const StyledWrapperTags = styled("div")(
  css({
    mt: 0,
    width: "initial",

    "@media(max-width: 899px)": {
      mt: -7,
      width: "100%",
    },

    "@media(max-width: 560px)": {
      mt: 3,
    },
  })
);

const StyledTags = styled(Link)(
  css({
    display: "block",
    fontSize: "text-md",
    lineHeight: "lg",
    textDecoration: "none",
    color: "dark-gray",
    "&:visited": {
      color: "dark-gray",
    },
    "&:hover, &:focus, &:active": {
      color: "light-purple",
    },
  })
);

export default BlogIndexPage;
