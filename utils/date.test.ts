import { suite } from "uvu";
import * as assert from "uvu/assert";

import { CURRENT_YEAR } from "./date";

const Suite = suite("utils/date");

Suite("CURRENT_YEAR should be dynamically current year", () => {
  const year = new Date().getFullYear();

  assert.equal(CURRENT_YEAR, year);
});

Suite.run();
