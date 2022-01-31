import css from "@styled-system/css";
import Box from "components/Box";
import Button from "components/Button";
import Centrator from "components/Centrator";
import Section from "components/Section";
import Link from "components/Link";
import { transition } from "components/system";

const TryTeleport = () => {
  return (
    <Section bg="purple">
      <Centrator
        color="white"
        flexDirection="column"
        alignItems="center"
        py={[5, 11]}
      >
        <Box
          as="h2"
          mb={2}
          fontSize="section-header"
          fontWeight="black"
          lineHeight="xxl"
        >
          Try Teleport today
        </Box>
        <Box fontSize="text-xl" lineHeight="lg" opacity="0.87">
          In the cloud, self-hosted, or open source
        </Box>
        <Button
          as={Link}
          href="/pricing/"
          variant="secondary"
          shape="lg"
          mt={[3, 5]}
          mb={[2, 3]}
          width={["100%", "auto"]}
        >
          Get Started
        </Button>
        <Link
          href="/docs/"
          bg="transparent"
          width={["100%", "auto"]}
          px={7}
          borderRadius="default"
          color="white"
          textAlign="center"
          fontSize="text-lg"
          fontWeight="bold"
          lineHeight="xxl"
          transition={transition([["backgroundColor", "interaction"]])}
          css={css({
            "&:hover,&:active,&:focus": {
              bg: "light-purple",
            },
          })}
        >
          View developer docs
        </Link>
      </Centrator>
    </Section>
  );
};

export default TryTeleport;
