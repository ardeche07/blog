import styled from "styled-components";
import css from "@styled-system/css";

export const UL = styled("ul")(
  css({
    mt: 0,
    mb: 3,
    pl: 4,
    "&:last-child": {
      mb: 0,
    },
  })
);

export const OL = styled("ol")(
  css({
    mt: 0,
    mb: 3,
    pl: 4,
    "&:last-child": {
      mb: 0,
    },
  })
);

export const Video = styled("video")(
  css({
    mb: 3,
    maxWidth: "100%",
    "&:last-child": {
      mb: 0,
    },
  })
);
