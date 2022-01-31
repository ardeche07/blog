import Box from "components/Box";
import Flex from "components/Flex";
import { Launchpad } from "components/Launchpad";
import { EmailSubscribe } from "components/EmailSubscribe";
import theme from "components/theme";
import { Copyright } from "./Copyright";
import { launchpadData, copyrightLinks } from "./structure";
import gridPngUrl from "./assets/grid-light.png";

const background = [
  `url(${gridPngUrl}) 100% 100% no-repeat`,
  theme.gradients.grayToWhite.background,
].join(",");

export interface Props {
  short?: boolean;
}

export default function Footer({ short }: Props) {
  const copyrightProps: { pt?: number[] } = {};

  if (!short) {
    copyrightProps.pt = [6, 8];
  }

  return (
    <Flex
      as="footer"
      width="100%"
      flexDirection="column"
      alignItems="stretch"
      borderTop="1px solid"
      borderTopColor="lightest-gray"
    >
      <EmailSubscribe px={[3, 9]} />
      <Box
        px={[3, 9]}
        borderTop="1px solid"
        borderTopColor="lightest-gray"
        backgroundSize="cover"
        backgroundRepeat="no-repeat"
        background={background}
      >
        {!short && <Launchpad sections={launchpadData} />}
        <Copyright links={copyrightLinks} {...copyrightProps} />
      </Box>
    </Flex>
  );
}
