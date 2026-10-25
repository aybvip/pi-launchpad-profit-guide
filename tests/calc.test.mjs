import { test } from "node:test";
import assert from "node:assert/strict";
import { compute, scenarios, computeAllocation } from "../calc.js";

const close = (a, b, eps = 1e-9) => Math.abs(a - b) < eps;

test("compute basic (hand-checkable test vector)", () => {
  const r = compute(100, 500, 0.2, 0.3, 1, 2);
  // cost = 100 + 1 = 101
  assert.equal(r.cost, 101);
  assert.equal(r.grossValue, 100);
  // effectiveSell = 0.3 * 0.98 = 0.294; revenue = 500*0.294 = 147; profit = 46
  assert.ok(close(r.profit, 46));
  // pct = 46 / 101 * 100 = 45.5445...
  assert.ok(close(r.pct, 45.54455445544554, 1e-9));
  // break_even = 101 / 500 = 0.202
  assert.ok(close(r.breakEven, 0.202));
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

test("PiRC1 Design 1 allocation test vector", () => {
  // C=100,000 Pi, T=1,000,000 tokens, c_i=500 Pi, no engagement bonus
  const a = computeAllocation(100000, 1000000, 500, "none");
  // p_list = C / T = 0.1
  assert.ok(close(a.pList, 0.1));
  // t_base = c_i / p_list = 5,000
  assert.ok(close(a.baseTokens, 5000));
  // no bonus => effective price equals listing price
  assert.ok(close(a.effPrice, 0.1));
  // LP share = 1 / 2.05 = 48.7804878%
  assert.ok(close(a.lpShare, 48.78048780487805, 1e-12));
  // p_floor = 0.1 / (2.05)^2 = 0.02379536...
  assert.ok(close(a.floor, 0.1 / 4.2025, 1e-12));
});

test("PiRC1 engagement tiers change effective price only", () => {
  const base = computeAllocation(100000, 1000000, 500, "none");
  const mid = computeAllocation(100000, 1000000, 500, "mid");
  const top = computeAllocation(100000, 1000000, 500, "top");
  assert.equal(mid.bonus, 0.05);
  assert.equal(top.bonus, 0.1);
  assert.ok(close(mid.baseTokens, base.baseTokens));
  assert.ok(close(top.baseTokens, base.baseTokens));
  assert.ok(mid.effPrice < base.effPrice);
  assert.ok(top.effPrice < mid.effPrice);
  // p_eff = p_list / (1 + bonus)
  assert.ok(close(top.effPrice, base.pList / 1.1));
});

test("zero inputs never produce NaN", () => {
  const a = computeAllocation(0, 0, 0, "top");
  assert.equal(a.pList, 0);
  assert.equal(a.baseTokens, 0);
  assert.equal(a.effPrice, 0);
  assert.ok(Number.isFinite(a.floor));
  assert.ok(Number.isFinite(a.lpShare));
});
