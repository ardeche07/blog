import React, { useEffect, useRef, createElement, Fragment } from "react";
import { autocomplete } from "@algolia/autocomplete-js";
import "@algolia/autocomplete-theme-classic";
import { render } from "react-dom";
import styled from "styled-components";
import css from "@styled-system/css";
import Box from "components/Box";
import { debounced } from "server/search-api-helpers";
import { SearchStyles } from "./SearchStyles";

export const getSearchResults = async (query: string) => {
  let href = "";
  if (typeof window !== "undefined") {
    href = window.location.href;
  }

  try {
    const rawResponse = await fetch(
      `/blog/api/search/?query=${query}&url=${encodeURIComponent(href)}`,
      {
        method: "GET",
      }
    );

    const response = await rawResponse.json();
    return response.map((res) => ({ ...res, label: res.title }));
  } catch (e) {
    throw e;
  }
};

function Autocomplete(props) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) {
      return undefined;
    }

    const search = autocomplete({
      container: containerRef.current,
      renderer: { createElement, Fragment },
      render({ children }, root) {
        render(children, root);
      },
      ...props,
    });

    return () => {
      search.destroy();
    };
  }, [props]);

  return <StyledWrapperAutocomplete ref={containerRef} />;
}

function ProductItem({ hit }) {
  const title = hit.title.includes("|") ? hit.title.split("|")[0] : hit.title;
  let foundHeader = "";
  let foundContent = "";

  if (hit._snippetResult.headers?.length) {
    foundHeader = hit._snippetResult.headers[0].value;
  } else if (hit._snippetResult.content) {
    foundContent = hit._snippetResult.content.value;
  }

  return (
    <a href={hit.url} className="aa-ItemLink">
      <div className="aa-ItemContent">
        <div className="aa-ItemTitle">
          <Box as="p" color="#b5bec7" fontSize={12}>
            {title}
          </Box>
          {foundHeader && (
            <Box
              as="h3"
              color="#512FC9"
              fontSize={16}
              dangerouslySetInnerHTML={{ __html: foundHeader }}
            />
          )}
          {foundContent && (
            <Box
              as="p"
              fontSize={14}
              dangerouslySetInnerHTML={{ __html: foundContent }}
            />
          )}
        </div>
      </div>
    </a>
  );
}

export default function SearchSite() {
  return (
    <>
      <SearchStyles />
      <Autocomplete
        openOnFocus={false}
        placeholder="Search Teleport"
        getSources={({ query }) => {
          return debounced([
            {
              sourceId: "site_search",
              async getItems() {
                const result = await getSearchResults(query);
                return result;
              },
              templates: {
                item({ item }) {
                  return <ProductItem hit={item} />;
                },
                noResults() {
                  return `No results were found for the search '${query}'`;
                },
              },
            },
          ]);
        }}
      />
    </>
  );
}

const StyledWrapperAutocomplete = styled(Box)(
  css({
    width: "400px",
    height: "40px",
    mt: 2,
    "& .aa-Form, .aa-DetachedSearchButton": {
      borderRadius: "24px",
      borderColor: "lighter-gray",
      height: "40px",
    },
    "& .aa-SubmitIcon": {
      color: "lighter-gray",
    },
    "& .aa-Input": {
      fontSize: "text-md",
    },

    "@media(max-width: 560px)": {
      width: "100%",
    },
  })
);
