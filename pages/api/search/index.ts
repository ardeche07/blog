import type { NextApiRequest, NextApiResponse } from "next";
import algoliasearch from "algoliasearch";
import { getSearchQueries } from "server/search-api-helpers";

const APP_ID = process.env.ALGOLIA_APP_ID;
const API_KEY = process.env.ALGOLIA_API_KEY;

const client = algoliasearch(APP_ID, API_KEY);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let rawResults = [];

  try {
    const { results } = await client.multipleQueries(
      getSearchQueries(req.query.query as string),
      {
        strategy: "stopIfEnoughMatches",
      }
    );
    rawResults = results;

    const finishResult = rawResults.reduce((total, res) => {
      total.push(...res.hits);
      return total;
    }, []);
    res.status(200).json(finishResult);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
