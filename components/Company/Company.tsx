import styled from "styled-components";
import css from "@styled-system/css";

import * as logos from "./logos";
import Box from "components/Box";
import { CompanyId } from "./types";
import companiesList from "./companiesList";
import Flex from "components/Flex";
import Image from "components/Image";

export type Company = {
  id: CompanyId;
  size?: "sm" | "md" | "lg";
};

const sizes = {
  sm: "100px",
  md: "200px",
  lg: "300px",
};

export default function Company({ id, size = "md" }: Company) {
  const data = companiesList.find(({ id: companyId }) => companyId === id);
  const imageSource: string = logos[id];

  return (
    <Container>
      <Box width={sizes[size]}>
        <Image
          src={imageSource}
          alt={data?.title}
          title={data?.title}
          loading="lazy"
        />
      </Box>
    </Container>
  );
}

const Container = styled(Flex)(
  css({
    borderRadius: "default",
    height: "100%",
    justifyContent: "center",
    overflow: "hidden",
    width: "100%",
  })
);
