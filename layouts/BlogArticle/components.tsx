import styled from "styled-components";
import css from "@styled-system/css";
import { components as baseComponents } from "layouts/SitePage";

const articleText = styled("p")(
  css({
    fontSize: ["text-xl", "header-4"],
    m: 0,
    "& + p": {
      mt: 5,
      fontSize: ["text-xl", "header-4"],
    },
  })
);

const itemList = styled("li")(
  css({
    fontSize: ["text-xl", "header-4"],
    lineHeight: "lg",
    mt: 3,
  })
);

const header2 = styled("h2")(
  css({
    fontWeight: "bold",
    mt: 6,
    color: "dark-purple",
  })
);

const header3 = styled("h3")(
  css({
    fontSize: "header-4",
    lineHeight: "lg",
    mt: 6,
  })
);

const StyledTable = styled("table")(
  css({
    width: "100%",
    borderCollapse: "collapse",
    boxShadow: "0 1px 4px rgb(0, 0, 0, .24)",
    lineHeight: "md",
    mb: 5,
    mt: 5,
    "&:last-child": {
      mb: 0,
    },
    thead: {
      tr: {
        backgroundColor: "dark-purple",
      },
      th: {
        py: 2,
        px: 3,
        fontSize: "text-lg",
        textTransform: "uppercase",
        whiteSpace: ["auto", "nowrap"],
        color: "white",
        textAlign: "left",
      },
    },
    tbody: {
      "tr:nth-child(2n)": {
        bg: "lightest-gray",
      },
      td: {
        p: 3,
        fontSize: "text-lg",
        verticalAlign: "top",
      },
      "td > p": {
        fontSize: "text-lg",
      },
      "td > p + p": {
        m: 0,
      },
      "ul > li, ul > li > p": {
        fontSize: "text-lg",
        lineHeight: "md",
        mt: 2,
      },
    },
  })
);

export const components = {
  ...baseComponents,
  h2: header2,
  h3: header3,
  p: articleText,
  li: itemList,
  table: StyledTable,
};
