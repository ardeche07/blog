import { resolve } from "path";
import { copyFileSync, existsSync, mkdirSync } from "fs";
import { generateCoverImagePath } from "../.build/utils/generate-cover-image-path.mjs";
import { findArticleImages } from "../.build/server/find-article-images.mjs";

/*
 * Copying images for the main blog page and tag pages of the blog into the public folder.
 * Change the name of the image to the name of the article
 */

const ARTCLE_COVERS_FOLDER = resolve("./public/covers/");

const covers = findArticleImages();

if (!existsSync(ARTCLE_COVERS_FOLDER)) {
  mkdirSync(ARTCLE_COVERS_FOLDER);
}

covers.forEach((cover) => {
  const targetName = generateCoverImagePath(
    cover.image,
    cover.uri,
    ARTCLE_COVERS_FOLDER
  );
  const sourceName = resolve(`./pages/${cover.uri}/${cover.image}`);

  copyFileSync(sourceName, targetName);
});
