// Pure calculator logic (ES module) — testable, no DOM.
export function compute(piAmount, tokens, tokenPrice, sellPrice, fee, slippage) {
  const cost = piAmount + fee;
  const grossValue = tokens * tokenPrice;
  const effectiveSell = sellPrice * (1 - slippage / 100);
  const revenue = tokens * effectiveSell;
  const profit = revenue - cost;
  const pct = cost > 0 ? (profit / cost) * 100 : 0;
  const breakEven = tokens > 0 ? cost / tokens : 0;
  return { cost, grossValue, revenue, profit, pct, breakEven, effectiveSell };
}

export function scenarioProfit(tokens, sellPrice, slippage, cost, mult) {
  const sp = sellPrice * mult * (1 - slippage / 100);
  return tokens * sp - cost;
}

export function scenarios(tokens, sellPrice, slippage, cost) {
  return {
    optimistic: scenarioProfit(tokens, sellPrice, slippage, cost, 1.5),
    base: scenarioProfit(tokens, sellPrice, slippage, cost, 1),
    pessimistic: scenarioProfit(tokens, sellPrice, slippage, cost, 0.5),
  };
}
