import Box from "components/Box";
import Grid from "components/Grid";
import GridTile from "components/GridTile";
import { FeaturedArticleCardsProps } from "./types";

export default function FeaturedArticleCards({
  articles,
}: FeaturedArticleCardsProps) {
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
          href={uri}
          bhColor="page-bg"
          cover={frontmatter.logo.image}
        >
          <Box as="p">By {frontmatter.author}</Box>
        </GridTile>
      ))}
    </Grid>
  );
}
