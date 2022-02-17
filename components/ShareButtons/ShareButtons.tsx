import { useEffect } from "react";
import styled from "styled-components";
import css from "@styled-system/css";
import { transition } from "components/system";
import hn from "./assets/hn.svg";
import twitter from "./assets/twitter.svg";

export default function ShareButtons() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      import("share-buttons");
    }
  }, []);
  return (
    <StyledWrapper className="share-btn">
      <StyledHN className="btn-hn" data-id="hn" data-sharebtn-ref="2">
        Hacker News
      </StyledHN>
      <StyledTwitter className="btn-twitter" data-id="tw" data-sharebtn-ref="1">
        Twitter
      </StyledTwitter>
    </StyledWrapper>
  );
}

const StyledWrapper = styled("div")(
  css({
    position: "fixed",
    left: 0,
    bottom: "50%",
    borderTopRightRadius: "default",
    borderBottomRightRadius: "default",
    overflow: "hidden",

    "& a": {
      display: "block",
      width: "32px",
      height: "32px",
      cursor: "pointer",
      overflow: "hidden",
      fontSize: 0,
      backgroundSize: "32px 32px",
      "&:hover": {
        transition: transition([["opacity", "interaction"]]),
        opacity: 0.8,
      },
    },
  })
);

const StyledHN = styled("a")(
  css({
    backgroundImage: `url(${hn})`,
  })
);

const StyledTwitter = styled("a")(
  css({
    backgroundImage: `url(${twitter})`,
  })
);
