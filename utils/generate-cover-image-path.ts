import { resolve } from "path";

export const generateCoverImagePath = (
  image: string,
  uri: string,
  coversFolder: string
) => {
  const format = image.split(".").pop();
  const clearUri = uri.replace(/\//g, "");

  return resolve(coversFolder, `${clearUri}.${format}`);
};
