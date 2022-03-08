import styled from "styled-components";
import { css } from "components/system";

import Company, { CompanyId } from "components/Company";
import Flex from "components/Flex";
import leftQuotationMark from "./assets/left.svg";
import rightQuotationMark from "./assets/right.svg";

const bg = [
  `url(${leftQuotationMark}) left 24px top no-repeat`,
  `url(${rightQuotationMark}) right 24px top no-repeat`,
].join(",");

type ReviewItemProps = {
  company: CompanyId;
  children: React.ReactNode;
};

export default function Review({ company, children }: ReviewItemProps) {
  return (
    <Container>
      <StyledQuote>{children}</StyledQuote>
      <CompanyLogoContainer>
        <Company id={company} />
      </CompanyLogoContainer>
    </Container>
  );
}

const CompanyLogoContainer = styled("div")(
  css({
    my: 2,
  })
);

const StyledQuote = styled("p")(
  css({
    color: "darkest",
    fontSize: ["text-lg", "header-4"],
    lineHeight: ["md", "lg"],
    mb: 4,
    mt: 11,
    textAlign: "center",
  })
);

const Container = styled(Flex)(
  css({
    background: bg,
    backgroundSize: "80px 100px, 80px 100px",
    border: "1px solid",
    borderColor: ["transparent", "dark-purple"],
    borderRadius: "md",
    boxShadow: ["none", "0 1px 4px rgba(0, 0, 0, 0.24)"],
    flexDirection: "column",
    maxWidth: "780px",
    my: 4,
    px: [3, 9],
    py: 2,
  })
);
