import Box, { BoxProps } from "components/Box";
import Flex from "components/Flex";
import { Section } from "./Section";
import { SectionData } from "./types";

export interface LaunchpadProps {
  sections: SectionData[];
}

export function Launchpad({ sections, ...props }: LaunchpadProps & BoxProps) {
  const partition = 100 / sections.length;

  return (
    <Box as="nav" pt={[2, 5]} pb={24} {...props}>
      <Flex
        as="ul"
        m="0"
        p="0"
        flexDirection={["column", "row"]}
        listStyle="none"
      >
        {sections.map((section, index) => (
          <Box
            as="li"
            key={index}
            width={["100%", `${partition}%`]}
            mx={[0, 2]}
            mt={[24, 0]}
          >
            <Section data={section} />
          </Box>
        ))}
      </Flex>
    </Box>
  );
}
