import type { NextApiRequest, NextApiResponse } from "next";
import algoliasearch from "algoliasearch";
import { getSearchQueries } from "server/search-api-helpers";

const APP_ID = process.env.ALGOLIA_APP_ID;
const API_KEY = process.env.ALGOLIA_API_KEY;

const client = algoliasearch(APP_ID, API_KEY);

const BLOG_URL = /(\/blog\/)/;
const RESOURCES_URL = /(\/resources\/)/;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let rawResults = [];
  // In this case we get search results depending on the page from which we do search request.
  // Because we have the task to show search results in a certain order:
  // if the start page blog we should show search results in a order `blog -> resources -> rest site`;
  // if the start page resources we should show search results in a order `resources -> blog -> rest site`;
  // if the start page something different we should show search results in a order `rest site -> blog -> resources`;
  try {
    if (BLOG_URL.test(req.query.url as string)) {
      const { results } = await client.multipleQueries(
        getSearchQueries("blog", req.query.query as string),
        {
          strategy: "stopIfEnoughMatches",
        }
      );
      rawResults = results;
    } else if (RESOURCES_URL.test(req.query.url as string)) {
      const { results } = await client.multipleQueries(
        getSearchQueries("resources", req.query.query as string),
        {
          strategy: "stopIfEnoughMatches",
        }
      );
      rawResults = results;
    } else {
      const { results } = await client.multipleQueries(
        getSearchQueries("site", req.query.query as string),
        {
          strategy: "stopIfEnoughMatches",
        }
      );
      rawResults = results;
    }

    const finishResult = rawResults.reduce((total, res) => {
      total.push(...res.hits);
      return total;
    }, []);
    res.status(200).json(finishResult);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
