import css from "@styled-system/css";
import styled from "styled-components";
import { all, StyledSystemProps, transition, variant } from "components/system";
import Link from "./Link";

type variant = "copyright";

interface StyledLinkProps extends StyledSystemProps {
  variant?: variant | variant[];
}

export const StyledLink = styled(Link)<StyledLinkProps>(
  all,
  css({
    display: "block",
    px: [3, 2],
    lineHeight: ["xl", "lg"],
    borderRadius: "default",
    color: "darkest",
    transition: transition([
      ["backgroundColor", "interaction"],
      ["color", "interaction"],
    ]),
    bg: ["lightest-gray", "transparent"],
    textDecoration: "none",
    "&:hover, &:active, &:focus": {
      bg: "white",
      color: "dark-purple",
    },
    "&:active, &:focus": {
      outline: "none",
      bg: "lightest-gray",
    },
  }),
  variant({
    variants: {
      copyright: {
        color: "gray",
        lineHeight: ["lg", "xl"],
        "&:hover, &:active, &:focus": {
          color: "dark-purple",
          bg: "transparent",
        },
        "&:hover": {
          textDecoration: "underline",
        },
        "&:active, &:focus": {
          outline: "none",
          bg: "lightest-gray",
        },
      },
    },
  })
);

StyledLink.displayName = "StyledLink";
