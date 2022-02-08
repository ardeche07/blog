import { resolve } from "path";
import { copyFileSync, existsSync, mkdirSync } from "fs";

import { foundArticleImages } from "../.build/server/found-article-images.mjs";

const ARTCLE_COVERS_FOLDER = resolve("./public/covers/");

const covers = foundArticleImages();

if (!existsSync(ARTCLE_COVERS_FOLDER)) {
  mkdirSync(ARTCLE_COVERS_FOLDER);
}

covers.forEach((cover) => {
  const format = cover.image.split(".").pop();
  const targetName = resolve(ARTCLE_COVERS_FOLDER, `${cover.uri}.${format}`);
  const sourceName = resolve(`./pages/${cover.uri}/${cover.image}`);

  copyFileSync(sourceName, targetName);
});
