import NextImage from "next/image";
import styled from "styled-components";
import css from "@styled-system/css";
import { format } from "date-fns";
import Flex from "components/Flex";
import Box from "components/Box";
import Tags from "components/Tags";
import Link from "components/Link";
import { transition } from "components/system";
import { BlogMeta } from "layouts/BlogArticle/types";

interface ArticleCardProps {
  meta: {
    frontmatter: BlogMeta;
    uri: string;
  };
}

export default function ArticleCard({ meta }: ArticleCardProps) {
  const image = meta.frontmatter.logo?.image;
  return (
    <OuterContainer style={{ flexDirection: image ? "row" : "column" }}>
      {image && (
        <ImageContainer>
          <NextImage
            src={image}
            alt={meta.frontmatter.articleTitle}
            layout="fill"
            objectFit="cover"
          />
        </ImageContainer>
      )}
      <TextContainer>
        <Box as="p" text="text-sm" color="darkest">
          {format(new Date(meta.frontmatter.date), "MMM d, yyyy")}
        </Box>
        <Box as="p" text="text-md" color="darkest" fontWeight="bold">
          By {meta.frontmatter.author}
        </Box>

        <ArticleTitleContainer>
          <ArticleLink href={meta.uri}>
            {meta.frontmatter.articleTitle}
          </ArticleLink>
        </ArticleTitleContainer>

        <DescriptionContainer>
          {meta.frontmatter.description}
        </DescriptionContainer>
        {!!meta.frontmatter.tags.length && (
          <StyledTags tags={meta.frontmatter.tags} size="sm" />
        )}
      </TextContainer>
    </OuterContainer>
  );
}

const StyledTags = styled(Tags)(
  css({
    mt: "auto",
    pt: 3,
    // position relative is used on the Tags link in order for Tags to be clickable
    // over ArticleLink (which makes the whole card clickable)
    position: "relative",
  })
);

const TextContainer = styled(Flex)(
  css({
    flexDirection: "column",
  })
);

const ArticleLink = styled(Link)(
  css({
    textDecoration: "none",
    color: "dark-purple",

    // psuedo-content :after is used to make the entire card clickable
    "&:after": {
      content: "''",
      position: "absolute",
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
  })
);

const OuterContainer = styled(Flex)(
  css({
    position: "relative",
    ml: -4,
    py: 5,
    px: 4,
    "&::after": {
      left: 4,
      display: "block",
      width: "840px",
      height: "1px",
      backgroundColor: "lightest-gray",
    },
    "&:hover": {
      transition: transition([["backgroundColor", "interaction"]]),
      backgroundColor: "lightest-gray",
    },

    "@media(max-width: 560px)": {
      py: 3,
    },
  })
);

const ImageContainer = styled("div")(
  css({
    position: "relative",
    flexShrink: 0,
    width: "240px",
    height: "auto",
    mr: 7,
    border: "1px solid",
    borderColor: "lightest-gray",
    borderRadius: "default",

    "& img": {
      borderRadius: "default",
    },

    "@media(max-width: 680px)": {
      width: "180px",
      mr: 5,
    },

    "@media(max-width: 560px)": {
      display: "none",
    },
  })
);

const ArticleTitleContainer = styled(Box)(
  css({
    fontSize: "header-3",
    lineHeight: "lg",
    color: "dark-purple",
    fontWeight: "black",
    mt: 3,

    "@media(max-width: 680px)": {
      fontSize: "header-4",
      lineHeight: "lg",
      mt: 2,
    },

    "@media(max-width: 560px)": {
      fontSize: "text-xl",
      lineHeight: "md",
    },
  })
);

const DescriptionContainer = styled(Box)(
  css({
    fontSize: "text-lg",
    lineHeight: "lg",
    color: "darkest",
    mt: "3",

    "@media(max-width: 680px)": {
      fontSize: "text-md",
      lineHeight: "md",
    },
  })
);
