import { useEffect, useLayoutEffect, useState } from "react";

import css from "@styled-system/css";
import styled from "styled-components";

import Box from "components/Box";
import Button from "components/Button";
import Flex from "components/Flex";
import Link from "components/Link";

const gtagRegions = [
  "BE",
  "BG",
  "CZ",
  "DK",
  "DE",
  "EE",
  "IE",
  "GR",
  "ES",
  "FR",
  "HR",
  "IT",
  "CY",
  "LV",
  "LT",
  "LU",
  "HU",
  "MT",
  "NL",
  "AT",
  "PL",
  "PT",
  "RO",
  "SI",
  "SK",
  "FI",
  "SE",
  "US-CA",
];

// use useEffect on server-side rendering and useLayoutEffect on client-side
// this removes errors related to server-side rendering
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const GDPRBanner = () => {
  const [showBanner, setShowBanner] = useState(false);

  useIsomorphicLayoutEffect(() => {
    const shouldShowBanner =
      typeof window !== "undefined" &&
      localStorage.getItem("hasClickedAccept") !== "true";
    setShowBanner(shouldShowBanner);
  }, []);

  const handleAcceptClick = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("hasClickedAccept", "true");
      setShowBanner(false);

      // window.gtag needs to be gated because in development, NEXT_PUBLIC_GTAG_ID is undefined which throws an error
      if (window.gtag) {
        // updating consent to track in google analytics in states/countries that require consent to do so
        window.gtag("consent", "update", {
          ad_storage: "granted",
          analytics_storage: "granted",
          region: gtagRegions,
        });
      }
    }
  };

  return (
    <>
      {showBanner && (
        <OuterContainer>
          <Message>
            <TextContainer>
              This site uses cookies to improve service. By using this site, you
              agree to our use of cookies.&nbsp;
              <Link href="https://goteleport.com/privacy/" color="white">
                More info.
              </Link>
            </TextContainer>
          </Message>
          <Button onClick={handleAcceptClick} variant="secondary">
            Ok, got it.
          </Button>
        </OuterContainer>
      )}
    </>
  );
};

export default GDPRBanner;

const Message = styled(Flex)(
  css({
    fontSize: ["text-md", "text-lg"],
    lineHeight: "md",
    marginBottom: [2, 0],
  })
);

const OuterContainer = styled(Flex)(
  css({
    alignItems: ["left", "center"],
    backgroundColor: "dark-purple",
    bottom: 0,
    boxShadow: "0px 2px 10px #455A64",
    color: "white",
    flexDirection: ["column", "row"],
    justifyContent: "space-around",
    padding: [2, 3],
    position: "fixed",
    width: "100%",
    zIndex: "999999",
  })
);

const TextContainer = styled(Box)(
  css({
    display: "inline-block",
    padding: [2, 0],
  })
);
