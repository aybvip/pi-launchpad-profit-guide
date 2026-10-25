# PROOF — what this site asserts, and the evidence behind each assertion

> **Scope:** this file documents the factual claims made by the Pi Launchpad Profit Guide website and the
> educational calculator shipped with it. It is **not** an audit of Pi Network, of Pi Launchpad, or of any
> ecosystem token. It does not predict prices and does not promise profit.

**Last verified:** 2026-10-25 · **Pinned sources:** PiRC1 at commit `c50d516` (2026-02-20) · **Live page:** <https://aybvip.github.io/pi-launchpad-profit-guide/>

Status legend:

| Badge | Meaning |
|---|---|
| ✅ **Officially documented** | Stated verbatim by an official Pi Network page or by the published PiRC1 design. |
| 🧮 **Derived** | Comes directly from a formula published in PiRC1; reproduced and tested in [`calc.js`](calc.js). |
| ⚠️ **Assumption / unverified** | A modelling assumption or a value that is unknowable in advance. Clearly labelled on the site. |

---

## 1. Claims and evidence

| # | Claim (as shown on the site) | Evidence | Status | Date / pin |
|---|---|---|---|---|
| 1 | Launchpad was released on Testnet on 2026-03-19, implementing Design 1 of PiRC. | [Pi Network blog, "Pi Launchpad Released on Testnet"](https://minepi.com/blog/pi-launchpad/) | ✅ | 2026-03-19 |
| 2 | It is Testnet-only for now; the Mainnet version is in development and may change quickly. | Same blog: "may iterate and change quickly in the testing phase" | ✅ | 2026-03-19 |
| 3 | Pi proceeds go to a liquidity pool with the token; the issuing project does not take them. | Same blog: "instead of being taken by the issuing project, will go to a liquidity pool with the ecosystem token" | ✅ | 2026-03-19 |
| 4 | Tokens are for user acquisition and product utility, not primarily capital raising. | Same blog: "rather than serving primarily to raise capital" | ✅ | 2026-03-19 |
| 5 | Launching projects are expected to be product-first. | Same blog: "Projects launching through the Pi Launchpad are expected to be product-first" | ✅ | 2026-03-19 |
| 6 | Listing price `p_list = C / T`. | [PiRC1 §4.1](https://github.com/PiNetwork/PiRC/blob/c50d516/PiRC1/4-allocation/4-allocation%20design%201.md) | 🧮 | `c50d516` · 2026-02-20 |
| 7 | Base allocation `t_i(base) = c_i / p_list`. | PiRC1 §4.1 | 🧮 | `c50d516` · 2026-02-20 |
| 8 | `T_purchase = T_liquidity = T`, `T_engage = 0.05T`, initial supply `2.05T`, LP share ≈ 48.7%. | PiRC1 §4 and §5 | 🧮 | `c50d516` · 2026-02-20 |
| 9 | The Escrow Wallet seeding the LP is permanently locked; no project team can drain liquidity. | [PiRC1 §5](https://github.com/PiNetwork/PiRC/blob/c50d516/PiRC1/5-tge-state/5-tge-state%20design%201.md) | ✅ | `c50d516` · 2026-02-20 |
| 10 | Theoretical lower bound `p_floor = p_list / (2 + 0.05)² ≈ 0.238 · p_list`. | PiRC1 §5 derivation | 🧮 | `c50d516` · 2026-02-20 |
| 11 | Actual sell price, liquidity depth, and sellability of any specific token are unknown in advance. | No official price/liquidity guarantee exists for a specific token; the site takes these as manual inputs. | ⚠️ | — |
| 12 | Engagement bonus of ≈10% / ≈5% / 0% per tier. | PiRC1 §4.1 — PiRC1 itself states this is the average **if commitments are uniformly distributed across tiers**. The site labels it as an assumption. | ⚠️ | `c50d516` · 2026-02-20 |

---

## 2. Verbatim evidence (the parts the claims rest on)

### 2.1 Official blog — "Pi Launchpad Released on Testnet" (2026-03-19)

> "Now, the initial version of the Pi Launchpad that implements the mechanism in Design 1 in the PiRC has been
> released as a Pi App on the Testnet with a test token."

> "ecosystem tokens launched by the Pi Launchpad are designed for user acquisition and product utility, rather
> than serving primarily to raise capital."

> "The proceeds of Pi from the launch of their tokens, instead of being taken by the issuing project, will go to
> a liquidity pool with the ecosystem token which bootstraps a healthy liquidity foundation from the start."

> "Projects launching through the Pi Launchpad are expected to be product-first."

> "Note that the Launchpad product may iterate and change quickly in the testing phase, e.g. timeframes of
> different phases of a launch, availability of different steps, the information available, or calculations."

Source: <https://minepi.com/blog/pi-launchpad/>

### 2.2 PiRC1 — Design 1 (§4, §5), pinned at `c50d516`

> "T = T_purchase = T_liquidity" and "T_engage = 5%T"

> "T_purchase + T_liquidity + T_engage = 2.05T"

> "p_list = C / T = p"

> "t_i^base = c_i / p_list"

> "The depositor of these tokens to the pool is the Escrow Wallet, which subsequently gets permanently locked
> so that it cannot withdraw the initial liquidity."

> "No project team can drain liquidity; every project launched on Pi Launchpad is supported by an immutable
> initial liquidity."

> "with the rewards parameter from Section 4 (T_engage = 5%T), the lower bound on the LP's spot price (Pi per
> token) is p_floor ≈ 0.238 p_list. There is no higher bound."

Sources:

- <https://github.com/PiNetwork/PiRC/blob/c50d516/PiRC1/4-allocation/4-allocation%20design%201.md>
- <https://github.com/PiNetwork/PiRC/blob/c50d516/PiRC1/5-tge-state/5-tge-state%20design%201.md>

> Why pin a commit? `PiNetwork/PiRC` has later commits (e.g. `dc86dfd`, PiRC2). The formulas above are taken
> from `PiRC1` at `c50d516`; if upstream edits PiRC1 later, this repository records exactly which revision the
> numbers came from.

---

## 3. The derived numbers, written out

Given `C` (total committed Pi), `T` (purchase-bucket tokens), and a participant commitment `c_i`:

```
p_list      = C / T
t_base      = c_i / p_list = c_i · T / C
t_engage    = t_base · b            (b = 0.10 top / 0.05 middle / 0 bottom, average case)
p_eff       = c_i / (t_base + t_engage) = p_list / (1 + b)
supply      = 2.05 · T
LP share    = T / (2.05 · T) = 1 / 2.05 ≈ 48.78%
p_floor     = p_list / (2 + 0.05)² = p_list / 4.2025 ≈ 0.23795 · p_list
```

Worked example (also a test vector in [`tests/calc.test.mjs`](tests/calc.test.mjs)):

| Input | Value |
|---|---|
| `C` | 100,000 Pi |
| `T` | 1,000,000 tokens |
| `c_i` | 500 Pi |
| tier | none |

| Output | Value |
|---|---|
| `p_list` | 0.1 Pi/token |
| `t_base` | 5,000 tokens |
| `p_eff` | 0.1 Pi/token (no bonus) |
| LP share | 48.7805% |
| `p_floor` | 0.02379536… Pi/token |

Hand check: `100,000 / 1,000,000 = 0.1` → `500 / 0.1 = 5,000` → `0.1 / (2.05 × 2.05) = 0.0237953…`.

---

## 4. Profit/loss calculator — formulas (site-specific, not PiRC1)

The profit/loss calculator is an educational scenario tool. It is **not** the Launchpad allocation formula.

```
cost           = pi + fee
effective_sell = sell × (1 − slippage / 100)
revenue        = tokens × effective_sell
profit         = revenue − cost
pct            = profit / cost × 100          (0 if cost = 0)
break_even     = cost / tokens                (0 if tokens = 0)
```

Test vector: `pi=100, fee=1, tokens=500, sell=0.3, slippage=2%` →
`cost=101`, `revenue=147`, `profit=+46`, `pct=+45.5446%`, `break_even=0.202`.

The same formulas exist twice, deliberately:

- [`calc.js`](calc.js) — pure ES module, imported by the tests;
- the top of [`script.js`](script.js) — inlined so the page also works from `file://` (a module import would be blocked by CORS there).

Both copies are checked by `npm test` and `npm run lint` in CI (`.github/workflows/ci.yml`).

---

## 5. Verify it yourself

```bash
# 1) Clone the pinned PiRC1 revision and read §4.1 + §5
git clone https://github.com/PiNetwork/PiRC
git -C PiRC checkout c50d516
# open PiRC1/4-allocation/4-allocation design 1.md and PiRC1/5-tge-state/5-tge-state design 1.md

# 2) Open the official announcement and check title + date
#    https://minepi.com/blog/pi-launchpad/

# 3) Run the same arithmetic used on the site
node --input-type=module -e "import {computeAllocation} from './calc.js'; console.log(computeAllocation(100000,1000000,500,'none'))"

# 4) Run the test suite (12 tests, no network)
npm test
```

Expected: `pList = 0.1`, `baseTokens = 5000`, `floor = 0.02379536…`, `lpShare = 48.7804…`, and all tests pass.

---

## 6. What this proof does **not** establish

- ❌ **No price prediction.** The site never claims a future token price. Every price is a manual input.
- ❌ **No live data.** There is no price API, no wallet connection, no on-chain read.
- ❌ **No audit.** Neither this repository nor the site has been audited by a third party.
- ❌ **No guarantee of sellability.** `p_floor` is a model result, not an executable price; slippage, fees, and
  depth can make realised proceeds lower.
- ❌ **No guarantee that Testnet behaviour equals Mainnet.** Pi explicitly says the Testnet version may change
  and that the final design is subject to feedback.
- ❌ **The 0.238 floor is conditional.** It assumes only launch participants sell, no further issuance, no
  fees, and the constant-product AMM invariant `x·y=k`. PiRC1 states this explicitly.

If any of those assumptions is violated, the derived numbers change. The site labels them accordingly rather
than presenting them as facts.

---

## 7. Change control

| Item | Value |
|---|---|
| Source retrieval date | 2026-10-25 |
| PiRC1 pin | `c50d516` (2026-02-20) |
| Profit/loss formula change requires | update `calc.js` **and** `script.js` **and** the test vector |
| CI | `.github/workflows/ci.yml` — `npm test`, `npm run lint` on Node 20 |
| This file | [`PROOF.md`](PROOF.md) · sources: [`docs/SOURCES.md`](docs/SOURCES.md) · method: [`docs/METHODOLOGY.md`](docs/METHODOLOGY.md) |
