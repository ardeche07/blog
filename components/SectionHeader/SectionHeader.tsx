import Centrator from "components/Centrator";
import Box from "components/Box";
import Flex from "components/Flex";
import wave from "./fixtures/wave.svg";
import Button, { ButtonVariant, ButtonShape } from "components/Button";

export type BGColor = "white" | "wave-on-gray";

type LinkProps = {
  href: string;
  text: string;
  variant?: ButtonVariant;
  shape?: ButtonShape;
};
export interface SectionHeaderProps {
  title: string;
  description?: React.ReactNode;
  descriptionTextWidth?: string;
  subtitle?: React.ReactNode;
  children?: React.ReactNode;
  mode?: string;
  bg?: BGColor;
  link?: LinkProps;
  kind?: "column" | "row" | "default";
}

const getBG = (color: BGColor) => {
  switch (color) {
    case "white":
      return { backgroundImage: "white" };
    case "wave-on-gray":
      return {
        backgroundImage: `url(${wave}), linear-gradient(125deg ,#F0F2F4,#fff)`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "100%",
      };
    default:
      return {
        backgroundImage: "linear-gradient(180deg, #ffffff 0%, #f0f2f4 100%)",
      };
  }
};
export const SectionHeader = ({
  mode,
  children,
  descriptionTextWidth = "600px",
  subtitle,
  title,
  description,
  bg,
  link,
  kind = "default",
}: SectionHeaderProps) => {
  const titleInColumn = kind === "column" ? "column" : ["column", "row"];
  const leftGap = kind === "column" ? 0 : [0, 11];
  const titleBottomGap =
    kind === "column" ? [0, 5] : mode === "none" ? [4, 9] : [4, 11];
  const headerBottomGap = kind === "column" ? [3, 5] : 0;
  const sectionTopGap =
    kind === "column" ? [11, 9] : mode === "none" ? [4, 9] : [4, 11];
  return (
    <Flex
      pt={mode === "none" ? [3, 5] : [7, 11]}
      pb={headerBottomGap}
      {...getBG(bg)}
    >
      <Centrator
        justifyContent={["auto", "space-between"]}
        alignItems="stretch"
        flexDirection={titleInColumn}
      >
        <Box
          flex="1 1 auto"
          pt={sectionTopGap}
          pb={titleBottomGap}
          order={kind === "default" ? [1, 0] : 0}
        >
          <Flex flexDirection="column" alignItems="flexStart">
            {subtitle && (
              <Box
                mb={title ? 3 : 0}
                color="dark-purple"
                fontWeight="bold"
                fontSize="text-xl"
                lineHeight="md"
              >
                {subtitle}
              </Box>
            )}
            {title && (
              <Box
                as="h1"
                color="black"
                fontSize={["header-1", "54px"]}
                lineHeight={["xl", "72px"]}
                fontWeight="black"
                textAlign="left"
              >
                {title}
              </Box>
            )}
          </Flex>
          {description && (
            <Box
              mt={[3, 4]}
              fontSize="text-xl"
              lineHeight="lg"
              color="darkest"
              maxWidth={descriptionTextWidth}
            >
              {description}
            </Box>
          )}
          {link && (
            <Button
              mt={6}
              as="a"
              href={link.href}
              shape={link.shape}
              variant={link.variant}
            >
              {link.text}
            </Button>
          )}
        </Box>
        <Flex
          flex="0 0 auto"
          justifyContent={kind === "row" ? ["left", "center"] : "baseline"}
          alignItems="center"
          ml={leftGap}
          pt={kind === "row" ? [0, 2] : [3, 2]}
          pb={[0, 2]}
          px={kind === "default" ? [3, 0] : 0}
          maxWidth="100%"
        >
          {children}
        </Flex>
      </Centrator>
    </Flex>
  );
};
