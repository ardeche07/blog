import { suite } from "uvu";
import * as assert from "uvu/assert";

import { camelCaseToDash, toSnakeCase } from "./string";

const Suite = suite("utils/string");

Suite("camelCaseToDash should conver camel case to dash case", () => {
  assert.equal(camelCaseToDash("   HeyIWorkAtHome"), "hey-i-work-at-home");
  assert.equal(camelCaseToDash("   heyIWorkAtHo42me"), "hey-i-work-at-ho42me");
  assert.equal(camelCaseToDash("42"), "42");
  assert.equal(camelCaseToDash("42hey"), "42hey");
  assert.equal(camelCaseToDash("Hey42"), "hey42");
  assert.equal(camelCaseToDash("Hey42Hey"), "hey42-hey");
});

Suite("toSnakeCase should convert to snake case", () => {
  assert.equal(toSnakeCase("Hey I Robot"), "hey_i_robot");
});

Suite("toSnakeCase should not replace extra spaces", () => {
  assert.equal(toSnakeCase("   Hey I Robot"), "___hey_i_robot");
});

Suite.run();
