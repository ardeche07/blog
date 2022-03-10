import { BoxProps } from "components/Box";
import styled from "styled-components";
import { css, all, transition } from "components/system";
import Link from "components/Link";

type Size = "sm" | "default";

const getSizeStyle = (size: Size) => {
  switch (size) {
    case "sm": {
      return {
        fontSize: "text-xs",
        lineHeight: "sm",
        px: 2,
      };
    }
    default:
      return {
        fontSize: "text-sm",
        lineHeight: "md",
        px: 3,
      };
  }
};

type TagsProps = {
  tags: string[];
  size?: Size;
} & BoxProps;

export function Tags({ tags, size, ...props }: TagsProps) {
  return (
    <StyledUL {...props}>
      {tags.map((tag, index) => (
        <li key={index}>
          <StyledLink
            href={`/tags/${encodeURIComponent(tag)}`}
            {...getSizeStyle(size)}
          >
            {tag}
          </StyledLink>
        </li>
      ))}
    </StyledUL>
  );
}

const StyledUL = styled("ul")(
  css({
    display: "flex",
    flexWrap: "wrap",
    listStyle: "none",
    m: 0,
    p: 0,

    "& li": {
      mr: 3,
      mb: 2,
    },
  }),
  all
);

const StyledLink = styled(Link)(
  css({
    display: "block",
    color: "darkest",
    borderWidth: "1px",
    borderColor: "lighter-gray",
    borderStyle: "solid",
    backgroundColor: "white",
    borderRadius: "default",
    textDecoration: "none",
    cursor: "pointer",
    transition: transition([
      ["borderColor", "interaction"],
      ["color", "interaction"],
    ]),

    "&:hover, &:focus": {
      outline: "none",
      borderColor: "dark-purple",
      color: "dark-purple",
    },
  }),
  all
);
