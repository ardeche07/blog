import styled from "styled-components";
import { css, transition } from "components/system";
import Link from "components/Link";

interface PaginationItemProps {
  pageNumber: number | string;
  href: string;
  isCheck: boolean;
  index: number;
}
export interface PaginationProps {
  currentPage: string;
  maxPage: number;
  baseUrl: string;
}

const PaginationItem = ({
  pageNumber,
  href,
  isCheck,
  index,
}: PaginationItemProps) => {
  return (
    <StyledItem key={index}>
      {isCheck ? (
        <StyledCheckedPage>{pageNumber}</StyledCheckedPage>
      ) : (
        <StyledLink href={`${href}/page/${pageNumber}`} disabled={isCheck}>
          {pageNumber}
        </StyledLink>
      )}
    </StyledItem>
  );
};

export const Pagination = ({
  currentPage,
  maxPage,
  baseUrl,
}: PaginationProps) => {
  const items = [];
  const pageNumbers = [];

  if (maxPage < 7) {
    for (let i = 0; i < maxPage; i++) {
      pageNumbers.push(`${i + 1}`);
    }
  } else if (maxPage > 6) {
    const page = Number(currentPage);
    const knownTerraStart = Math.max(1, page - 2);
    const knownTerraEnd = Math.min(maxPage, page + 2);
    if (knownTerraStart > 1) {
      pageNumbers.push("1");
    }
    if (knownTerraStart > 2) {
      pageNumbers.push("...");
    }
    for (let i = knownTerraStart; i <= knownTerraEnd; i++) {
      pageNumbers.push(String(i));
    }
    if (knownTerraEnd < maxPage - 1) {
      pageNumbers.push("...");
    }
    if (knownTerraEnd < maxPage) {
      pageNumbers.push(String(maxPage));
    }
  }

  for (let i = 0; i < pageNumbers.length; i++) {
    if (pageNumbers[i] === "...") {
      items.push(
        <StyledItem key={i}>
          <StyledDots>{pageNumbers[i]}</StyledDots>
        </StyledItem>
      );
    } else {
      items.push(
        <PaginationItem
          key={i}
          pageNumber={pageNumbers[i]}
          href={baseUrl}
          isCheck={currentPage === pageNumbers[i]}
          index={i}
        />
      );
    }
  }

  return <StyledList>{items}</StyledList>;
};

const StyledList = styled("ul")(
  css({
    display: "flex",
    justifyContent: "center",
    listStyle: "none",
    pl: 0,
  })
);

const StyledItem = styled("li")(
  css({
    width: "30px",
    height: "30px",

    "& + li": {
      ml: 1,
    },
  })
);

const StyledLink = styled(Link)(
  css({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    textDecoration: "none",
    borderRadius: "default",
    backgroundColor: "white",
    color: "dark-purple",
    transition: transition([["backgroundColor", "interaction"]]),

    "&:hover": {
      backgroundColor: "lightest-gray",
    },
  })
);

const StyledDots = styled("p")(
  css({
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    m: 0,
    p: 0,
  })
);

const StyledCheckedPage = styled(StyledDots)(
  css({
    backgroundColor: "light-purple",
    color: "white",
    borderRadius: "default",
  })
);
