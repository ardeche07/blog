import { suite } from "uvu";
import * as assert from "uvu/assert";

import { basicSorter, sorter } from "./sorter";

const BasicSuite = suite("utils/sorter:basicSorter");

BasicSuite("Sort two strings in ASC order", () => {
  const result = basicSorter("abc", "cde");

  assert.equal(result, -1);
});

BasicSuite("Sort two strings in DESC order", () => {
  const result = basicSorter("abc", "cde", "DESC");

  assert.equal(result, 1);
});

BasicSuite("Shows equality for strings correrctly", () => {
  const result = basicSorter("abc", "abc");

  assert.equal(result, 0);
});

BasicSuite("Sort two numbers in ASC order", () => {
  const result = basicSorter(1, 2);

  assert.equal(result, -1);
});

BasicSuite("Sort two numbers in DESC order", () => {
  const result = basicSorter(1, 2, "DESC");

  assert.equal(result, 1);
});

BasicSuite("Shows equality for numers correrctly", () => {
  const result = basicSorter(1, 1);

  assert.equal(result, 0);
});

BasicSuite.run();

const SorterSuite = suite("utils/sorter:sorter");

SorterSuite("Sort two date strings in ASC order", () => {
  const result = sorter("2020-01-01", "2021-01-01");

  assert.equal(result, -1);
});

SorterSuite("Sort two date strings in DESC order", () => {
  const result = sorter("2020-01-01", "2021-01-01", "DESC");

  assert.equal(result, 1);
});

SorterSuite("Shows equality for date strings correrctly", () => {
  const result = sorter("2020-01-01", "2020-01-01");

  assert.equal(result, 0);
});

SorterSuite("Sort two dates in ASC order", () => {
  const result = sorter(new Date("2020-01-01"), new Date("2021-01-01"));

  assert.equal(result, -1);
});

SorterSuite("Sort two dates in DESC order", () => {
  const result = sorter(new Date("2020-01-01"), new Date("2021-01-01"), "DESC");

  assert.equal(result, 1);
});

SorterSuite("Shows equality for dates correrctly", () => {
  const result = sorter(new Date("2020-01-01"), new Date("2020-01-01"));

  assert.equal(result, 0);
});

SorterSuite.run();
