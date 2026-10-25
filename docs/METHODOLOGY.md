# Methodology — every number on the site, and the assumptions behind it

> This document is the written form of the two calculators. It exists so that a reader can reproduce every
> output by hand, and so that a reviewer can see exactly where a model assumption enters.

There are **two independent models** on the site. Do not mix them:

| Model | Question it answers | Source |
|---|---|---|
| **A. Design 1 allocation** | Given total committed Pi `C`, purchase tokens `T`, and my commitment `c_i`, how many tokens do I get at listing, and what is the LP floor? | PiRC1 §4.1 / §5 (pinned `c50d516`) |
| **B. Profit / loss scenario** | If I hold `N` tokens and sell at price `S` with slippage and fees, what is my profit or loss? | This site's own transparent formula |

Model A is **not** a price prediction. Model B is **not** the Launchpad allocation mechanism.

---

## 1. Model A — PiRC1 Design 1 allocation

### 1.1 Inputs

| Symbol | Meaning | Where it comes from |
|---|---|---|
| `C` | Total Pi committed by all participants | A live Launchpad launch (not available to this static site) |
| `T` | Tokens in the **purchase bucket** (`T_purchase`) | Project launch parameters |
| `c_i` | Your own Pi commitment | You |
| tier | Engagement tier: none / middle / top | PiRC1 §4.1 engagement score |

### 1.2 Formulas

```
p_list   = C / T
t_base   = c_i / p_list
t_engage = t_base × b
p_eff    = c_i / (t_base + t_engage) = p_list / (1 + b)
supply   = 2.05 × T
LP_share = T / (2.05 × T) = 48.7805…%
p_floor  = p_list / (2 + 0.05)² = p_list / 4.2025 = 0.237953… × p_list
```

with:

| Tier | `b` | Basis |
|---|---|---|
| none / bottom | 0 | PiRC1: bottom third receives 0 from `T_engage` |
| middle | 0.05 | PiRC1: ≈5% average **if commitments are uniform** |
| top | 0.10 | PiRC1: ≈10% average **if commitments are uniform** |

### 1.3 Worked example

`C = 100,000`, `T = 1,000,000`, `c_i = 500`, tier = none:

```
p_list = 100,000 / 1,000,000 = 0.1
t_base = 500 / 0.1            = 5,000
p_eff  = 500 / 5,000          = 0.1
supply = 2.05 × 1,000,000     = 2,050,000
LP     = 1,000,000 / 2,050,000 = 48.7805%
floor  = 0.1 / 4.2025         = 0.0237953…
```

Same example with tier = top: `t_engage = 500`, `total = 5,500`, `p_eff = 500 / 5,500 = 0.090909…`.

### 1.4 Assumptions — stated, not hidden

1. **Uniform commitments for tier bonuses.** The 5% / 10% figures only hold when commitments are evenly
   distributed across the three engagement tiers. Otherwise use PiRC1's exact formula with `C_top` / `C_mid`.
   The site's dropdown is therefore an **estimate label**, not an entitlement.
2. **The floor ignores fees and further issuance.** PiRC1 derives `p_floor` under `x·y=k`, zero fees, and no
   post-TGE issuance. Realised prices can differ.
3. **The floor assumes everyone sells.** It is the extreme case in which all participant tokens are swapped
   back into the LP. It is a mathematical lower bound of the model, not a trading promise.
4. **`C` and `T` are inputs, not live values.** This site has no backend and does not query Launchpad.
5. **No lockups / vesting are modelled.** If a specific launch adds them, sellability changes; the site says so.

---

## 2. Model B — profit / loss calculator

### 2.1 Inputs

| Input | Meaning |
|---|---|
| `pi` | Pi committed to participate |
| `fee` | Fees in Pi |
| `tokens` | Tokens expected / received |
| `token_price` | Assumed token price (display only) |
| `sell` | Assumed sell price (Pi per token) |
| `slippage` | Slippage in percent |

### 2.2 Formulas

```
cost           = pi + fee
effective_sell = sell × (1 − slippage / 100)
revenue        = tokens × effective_sell
profit         = revenue − cost
pct            = (cost > 0) ? (profit / cost) × 100 : 0
break_even     = (tokens > 0) ? cost / tokens : 0
```

Scenarios reuse the same formula with `sell` multiplied by `1.5`, `1.0`, and `0.5`:

```
profit(m) = tokens × (sell × m × (1 − slippage/100)) − cost
```

### 2.3 Worked example

`pi=100, fee=1, tokens=500, sell=0.3, slippage=2%`:

```
cost           = 101
effective_sell = 0.294
revenue        = 147
profit         = +46
pct            = +45.5446%
break_even     = 0.202
```

### 2.4 What the profit calculator does **not** model

- Order-book depth / price impact beyond a flat slippage percentage.
- Taxes, withdrawal fees, or network fees other than the single `fee` field.
- Lockups, vesting, or the possibility that the token cannot be sold at all.
- Any relationship between `token_price` and `sell`; they are independent user inputs.

---

## 3. Reproducibility

### 3.1 Automated checks

```bash
npm test      # 12 tests, no network
npm run lint  # node --check on script.js and calc.js
```

The tests cover both models, including the worked examples above and the zero-input edge cases.

### 3.2 Manual checks

```bash
node --input-type=module -e "import {computeAllocation,compute} from './calc.js'; console.log(computeAllocation(100000,1000000,500,'none')); console.log(compute(100,500,0.2,0.3,1,2))"
```

### 3.3 Where the code lives

| File | Role |
|---|---|
| [`calc.js`](calc.js) | Pure functions; imported by tests. |
| [`script.js`](script.js) | Same formulas inlined for `file://` support + DOM rendering. |
| [`tests/calc.test.mjs`](tests/calc.test.mjs) | Test vectors and edge cases. |
| [`.github/workflows/ci.yml`](.github/workflows/ci.yml) | Runs both commands on every push / PR. |

> The duplication between `calc.js` and `script.js` is intentional (ES-module imports fail under `file://` in
> some browsers). The test vector is the contract that keeps them equal; if you change one, change the other
> and the test will confirm the numbers.

---

## 4. Rounding policy

- The UI rounds for display to at most 4 decimal places (`toLocaleString` with `en-US` digits so that formulas
  stay copy-pasteable).
- Tests assert against full-precision values with a `1e-9` tolerance (or `1e-12` for `lpShare`).
- No intermediate rounding is applied before the final division; displayed values may therefore differ from a
  hand calculation in the last digit.

---

## 5. Change control

If a formula changes:

1. update `calc.js`;
2. update the inlined copy in `script.js`;
3. update the test vector in `tests/calc.test.mjs`;
4. update the formula shown in `index.html` and in this file;
5. run `npm test` + `npm run lint`;
6. update the "last verified" date in `PROOF.md`, `docs/VERIFICATION.md`, and the site footer note.
