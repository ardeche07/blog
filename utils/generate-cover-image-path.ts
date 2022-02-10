export const generateCoverImagePath = (image: string, uri: string) => {
  const format = image.split(".").pop();
  const clearUri = uri.replace(/\//g, "");

  return `${clearUri}.${format}`;
};
