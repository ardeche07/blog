const NINE_CODE = "9".charCodeAt(0);
const SMALL_A_CODE = "a".charCodeAt(0);

export function camelCaseToDash(str: string): string {
  let result = "";

  for (let i = 0; i < str.length; i++) {
    if (str[i] === " ") {
      continue;
    }

    if (
      str[i].charCodeAt(0) > NINE_CODE &&
      str[i].charCodeAt(0) < SMALL_A_CODE &&
      result.length > 0
    ) {
      result += "-";
    }
    result += str[i];
  }

  return result.toLowerCase().trim();
}

export const toSnakeCase = (str: string): string =>
  str.toLowerCase().replace(/\s/g, "_");

export const truncate = (text: string, length: number): string => {
  return typeof text === "string" && text.length >= length
    ? `${text.substr(0, length)}...`
    : text;
};
