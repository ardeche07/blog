import Box from "components/Box";
import Flex, { FlexProps } from "components/Flex";
import { StyledLink } from "components/Link";
import { CURRENT_YEAR } from "utils/date";

type Props = FlexProps & {
  links: {
    url: string;
    title: string;
  }[];
};

export function Copyright({ links, ...props }: Props) {
  return (
    <Flex
      width="100%"
      flexDirection={["column", "row"]}
      py="4"
      px={[0, 3]}
      {...props}
    >
      <Box as="p" text="text-xs" color="gray" py={[0, 2]}>
        {`© ${CURRENT_YEAR} Gravitational Inc.; all rights reserved.`}
      </Box>
      <Flex
        as="ul"
        listStyle="none"
        m="0"
        p="0"
        ml={[0, 5]}
        flexDirection={["column", "row"]}
      >
        {links.map((item, index) => (
          <Box as="li" key={index} mt={[2, 0]}>
            <StyledLink
              href={item.url}
              text="text-xs"
              variant="copyright"
              passthrough
            >
              {item.title}
            </StyledLink>
          </Box>
        ))}
      </Flex>
    </Flex>
  );
}
