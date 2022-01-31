import { isDate, compareAsc, compareDesc } from "date-fns";

export const basicSorter = (
  valueA: unknown,
  valueB: unknown,
  order: "ASC" | "DESC" = "ASC"
) => {
  if (valueA > valueB) {
    return order === "ASC" ? 1 : -1;
  } else if (valueA < valueB) {
    return order === "ASC" ? -1 : 1;
  } else {
    return 0;
  }
};

/* Should sort strings, numbers and dates (including string and number formats) correctly */

export const sorter = (
  valueA: unknown,
  valueB: unknown,
  order: "ASC" | "DESC" = "ASC"
) => {
  const dateA = new Date(valueA as string);
  const dateB = new Date(valueB as string);

  if (isDate(dateA) && isDate(new Date(dateB))) {
    return order === "ASC"
      ? compareAsc(dateA, dateB)
      : compareDesc(dateA, dateB);
  }

  return basicSorter(valueA, valueB, order);
};
