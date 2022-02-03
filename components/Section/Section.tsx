import Box, { BoxProps } from "components/Box";
import waveWhiteBG from "./assets/waveWhite.png";
import wavePurpleBG from "./assets/wavePurple.png";

export type BGColor = "purple" | "flatGray" | "flatWhite";

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
    case "purple":
      return {
        backgroundImage: `url(${wavePurpleBG}), linear-gradient(125deg,#512fc9,#651fff)`,
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
