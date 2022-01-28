import Box, { BoxProps } from "components/Box";
import waveGrayBG from "./assets/waveGray.png";
import waveWhiteBG from "./assets/waveWhite.png";
import wavelight from "./assets/wave-light.png";

export type BGColor =
  | "wavelight"
  | "grayGradient"
  | "grayWave"
  | "purple"
  | "flatGray"
  | "flatWhite";

const getBG = (color: BGColor) => {
  switch (color) {
    case "flatGray":
      return {
        backgroundColor: "page-bg",
      };
    case "flatWhite":
      return {
        backgroundColor: "white",
      };
    case "grayGradient":
      return {
        backgroundImage: `linear-gradient(125deg ,rgba(240,242,244,.56),#fff)`,
      };
    case "grayWave":
      return {
        backgroundColor: "#f7f8f9",
        backgroundImage: `url(${waveGrayBG})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundSize: "cover",
      };
    case "wavelight":
      return {
        backgroundImage: `url(${wavelight})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundSize: "cover",
      };
    default:
      return {
        backgroundColor: "white",
        backgroundImage: `url(${waveWhiteBG})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundSize: "cover",
      };
  }
};

export interface SectionProps {
  bg?: BGColor;
  children: React.ReactNode;
}

export const Section = ({
  bg,
  children,
  ...props
}: SectionProps & BoxProps) => {
  return (
    <Box as="section" {...getBG(bg)} {...props}>
      {children}
    </Box>
  );
};
