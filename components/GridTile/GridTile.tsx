import styled from "styled-components";
import { all, css } from "components/system";
import Link from "components/Link";
import Box, { BoxProps } from "components/Box";
import Flex from "components/Flex";
import articleImage from "./assets/featured-article.png";

/**
 * GridTiles are clickable, have hover functionality, and no "Learn More" button.
 * The href prop will be passed to the Link wrapper.
 */

export interface GridTileProps {
  children: React.ReactNode;
  title: string;
  href: string;
  bhColor?: string;
}

export default function GridTile({
  children,
  title,
  href,
  bhColor,
  ...props
}: GridTileProps & BoxProps) {
  return (
    <StyledWrapper href={href} {...props}>
      {/* top half */}
      <Flex
        flexDirection="row"
        pt="120px"
        pb={3}
        px={4}
        backgroundImage={`url("${articleImage}")`}
        backgroundPosition="center"
        backgroundSize="auto 100%"
        backgroundRepeat="no-repeat"
        borderRadius="8px 8px 0 0"
        backgroundColor="white"
      ></Flex>

      {/* bottom half */}
      <Flex
        flexDirection="column"
        flexGrow={1}
        alignItems="stretch"
        pb={4}
        pt={3}
        px={4}
        borderRadius="0 0 8px 8px"
        backgroundColor={bhColor}
      >
        <Box
          as="p"
          fontSize="text-md"
          lineHeight="md"
          color="black"
          fontWeight="bold"
        >
          {title}
        </Box>
        <Box fontSize="13px" lineHeight="md" color="gray" pb={0}>
          {children}
        </Box>
      </Flex>
    </StyledWrapper>
  );
}

const StyledWrapper = styled(Link)(
  css({
    width: ["340px", "auto", "auto"],
    flexDirection: "column",
    borderRadius: "md",
    textDecoration: "none",
    boxShadow: "0 1px 4px rgba(0, 0, 0, 0.24)",
    bg: "white",
    transition: ".3s all",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 8px 32px rgba(0, 0, 0, .24)",
    },
  }),
  all
);
