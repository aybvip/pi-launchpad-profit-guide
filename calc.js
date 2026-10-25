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

// PiRC1 Design 1 allocation model (see docs/METHODOLOGY.md).
// C = total committed Pi, T = purchase-bucket tokens, c_i = participant commitment.
// T_purchase = T_liquidity = T, T_engage = 0.05T, so supply = 2.05T and LP share = 1/2.05.
export function computeAllocation(totalPi, purchaseTokens, myPi, tier = "none") {
  const pList = purchaseTokens > 0 ? totalPi / purchaseTokens : 0;
  const bonus = tier === "top" ? 0.1 : tier === "mid" ? 0.05 : 0;
  const baseTokens = pList > 0 ? myPi / pList : 0;
  const engageTokens = baseTokens * bonus;
  const totalTokens = baseTokens + engageTokens;
  const effPrice = totalTokens > 0 ? myPi / totalTokens : 0;
  const lpShare = 100 / 2.05;
  const floor = pList / (2.05 * 2.05);
  return { pList, bonus, baseTokens, engageTokens, totalTokens, effPrice, lpShare, floor };
}

