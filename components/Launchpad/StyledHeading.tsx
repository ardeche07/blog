import css from "@styled-system/css";
import styled from "styled-components";
import { all, StyledSystemProps, variant } from "components/system";

type Variant = "plain" | "embedded";

export interface HeadingProps extends StyledSystemProps {
  variant?: Variant | Variant[];
}

export const StyledHeading = styled("h2")<HeadingProps>(
  all,
  css({
    mt: 0,
    mb: [0, 2],
    mx: [0, 2],
    color: "darkest",
    lineHeight: "40px",
    borderBottom: "1px solid",
    borderBottomColor: "lightest-gray",
  }),
  variant({
    variants: {
      embedded: {
        mt: 32,
        lineHeight: "sm",
        borderBottom: "none",
      },
    },
  })
);

StyledHeading.displayName = "StyledHeading";
