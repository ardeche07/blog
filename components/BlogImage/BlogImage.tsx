import Box from "components/Box";
import styled from "styled-components";
import { css } from "components/system";
import { useState } from "react";
import Image from "components/Image";

export interface BlogImageProps {
  src: string;
  alt: string;
}

export default function BlogImage({ src, alt, ...props }: BlogImageProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = () => {
    setIsExpanded(true);
  };

  const clickToClose = () => {
    setIsExpanded(false);
  };
  return (
    <Box {...props} my={6} mx="auto">
      <StyledImage src={src} alt={alt} onClick={handleClick} />
      {isExpanded && (
        <StyledImgWrapper onClick={clickToClose}>
          <ExpandedImage src={src} alt={alt} />
        </StyledImgWrapper>
      )}
    </Box>
  );
}

const StyledImage = styled(Image)(
  css({
    cursor: "pointer",
    maxWidth: "100%",
    display: "block",
    transition: "all .3s",
    "&:hover": {
      background: "white",
      boxShadow: "0 8px 32px rgba(0, 0, 0, .24)",
    },
  })
);

const ExpandedImage = styled(Image)(
  css({
    cursor: "pointer",
    maxWidth: "90%",
    maxHeight: "90%",
    display: "block",
    transition: "all .3s",
    zIndex: 2,
    background: "white",
    "&:hover": {
      boxShadow: "0 8px 32px rgba(0, 0, 0, .24)",
    },
  })
);

const StyledImgWrapper = styled("div")(
  css({
    background: "hsla(0, 0%, 100%, .56)",
    boxShadow: "0 8px 64px rgba(0, 0, 0, .24)",
    display: "flex",
    position: "fixed",
    alignItems: "center",
    justifyContent: "center",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  })
);
