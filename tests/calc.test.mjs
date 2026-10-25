import { test } from "node:test";
import assert from "node:assert/strict";
import { compute, scenarios } from "../calc.js";

test("compute basic", () => {
  const r = compute(100, 500, 0.2, 0.3, 1, 2);
  // cost = 101
  assert.equal(r.cost, 101);
  assert.equal(r.grossValue, 100);
  // effectiveSell = 0.3 * 0.98 = 0.294; revenue = 500*0.294 = 147; profit = 46
  assert.ok(Math.abs(r.profit - 46) < 1e-9);
  assert.ok(r.pct > 0);
  assert.ok(r.breakEven > 0);
});

test("compute zero tokens breakEven 0", () => {
  const r = compute(100, 0, 0.2, 0.3, 1, 2);
  assert.equal(r.breakEven, 0);
});

test("scenarios", () => {
  const sc = scenarios(500, 0.3, 2, 101);
  assert.ok(sc.optimistic > sc.base);
  assert.ok(sc.base > sc.pessimistic);
});
