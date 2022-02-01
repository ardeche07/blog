import Box from "components/Box";
import Grid from "components/Grid";
import { GridTile } from "components/GridDisplay";
import { FeaturedArticleCardsProps } from "./types";

export default function FeaturedArticleCards({
  articles,
}: FeaturedArticleCardsProps) {
  const gradient =
    "linear-gradient(180deg, #FFFFFF 50%, #F6F8F9 50%, #F6F8F9 100%)";

  return (
    <Grid
      mt="5"
      gridTemplateColumns="repeat(auto-fill, minmax(220px, 1fr) )"
      gridGap={[3, 7]}
    >
      {articles.map(({ frontmatter, uri }) => (
        <GridTile
          width="auto"
          key={uri}
          title={frontmatter.articleTitle}
          cardBG="article"
          href={uri}
          bhColor="page-bg"
          resourcesCard
          backgroundImage={gradient}
        >
          <Box as="p">By {frontmatter.author}</Box>
        </GridTile>
      ))}
    </Grid>
  );
}
