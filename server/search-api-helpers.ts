const BLOG_INDEX = process.env.ALGOLIA_BLOG_INDEX_NAME;

// Algolia API Parametres list: https://www.algolia.com/doc/api-reference/api-parameters/
export const getSearchQuery = (indexName: string, query: string) => {
  return {
    indexName: indexName,
    query: query,
    params: {
      hitsPerPage: 50,
    },
    restrictHighlightAndSnippetArrays: true,
    attributesToHighlight: ["content", "headers"],
    attributesToSnippet: ["content:30", "headers"],
    snippetEllipsisText: "…",
    highlightPreTag: "<b class='found-part'>",
    highlightPostTag: "</b>",
  };
};

export const getSearchQueries = (query: string) => {
  return [getSearchQuery(BLOG_INDEX, query)];
};

function debouncePromise(fn, time: number) {
  let timerId = undefined;

  return function debounced(...args) {
    if (timerId) {
      clearTimeout(timerId);
    }

    return new Promise((resolve) => {
      timerId = setTimeout(() => resolve(fn(...args)), time);
    });
  };
}

export const debounced = debouncePromise(
  (items) => Promise.resolve(items),
  500
);
