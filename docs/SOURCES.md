# Sources — retrieved, pinned, and quoted

> All quotes in this file are transcribed from the official sources below. Retrieval date: **2026-10-25**.
> Where a source is a Git repository, the commit that the claims rely on is recorded. Where it is a living
> web page, there is no revision pin available — so the retrieval date is the pin.

---

## 0. Version pinning

| Source | Pin | Date | Used for |
|---|---|---|---|
| `minepi.com/blog/pi-launchpad/` — "Pi Launchpad Released on Testnet" | living page, no revision available | published 2026-03-19 · retrieved 2026-10-25 | Release date, Testnet-only status, purpose of tokens, Pi proceeds → LP, product-first rule, volatility of Testnet |
| `PiNetwork/PiRC` — `PiRC1/4-allocation/4-allocation design 1.md` | commit `c50d516` | 2026-02-20 | `p_list = C/T`, base allocation, buckets, engagement tiers |
| `PiNetwork/PiRC` — `PiRC1/5-tge-state/5-tge-state design 1.md` | commit `c50d516` | 2026-02-20 | LP composition, locked Escrow, `p_floor` derivation |
| `PiNetwork/PiRC` — repository head | commit `dc86dfd` (PiRC2) | 2026-04-17 | Checked only to confirm PiRC1 has no later change. **Not** used for any claim. |

Verify the pin yourself:

```bash
git clone --filter=blob:none https://github.com/PiNetwork/PiRC
git -C PiRC log -1 --format='%h %cs' -- PiRC1
# expected: c50d516 2026-02-20
```

The GitHub web view of the pinned file:

- <https://github.com/PiNetwork/PiRC/blob/c50d516/PiRC1/4-allocation/4-allocation%20design%201.md>
- <https://github.com/PiNetwork/PiRC/blob/c50d516/PiRC1/5-tge-state/5-tge-state%20design%201.md>

---

## 1. Official blog (primary source for product facts)

**URL:** <https://minepi.com/blog/pi-launchpad/>
**Title:** "Pi Launchpad Released on Testnet"
**Author:** Pi Network
**Date:** March 19, 2026
**Category:** Announcement, Pi Day

Quotes used on the site:

1. > "the initial version of the Pi Launchpad that implements the mechanism in Design 1 in the PiRC has been
   > released as a Pi App on the Testnet with a test token."

2. > "it is being introduced on Testnet first so the community can become familiar with how the process works
   > before the Mainnet launch."

3. > "ecosystem tokens launched by the Pi Launchpad are designed for user acquisition and product utility,
   > rather than serving primarily to raise capital."

4. > "The proceeds of Pi from the launch of their tokens, instead of being taken by the issuing project, will go
   > to a liquidity pool with the ecosystem token which bootstraps a healthy liquidity foundation from the start."

5. > "Projects launching through the Pi Launchpad are expected to be product-first."

6. > "the Launchpad product may iterate and change quickly in the testing phase, e.g. timeframes of different
   > phases of a launch, availability of different steps, the information available, or calculations."

7. > "the overall design of ecosystem tokens and the Pi Launchpad product are subject to change based on
   > community feedback on the design, data gathered during the Testnet period, and feedback from projects that
   > intend to issue such a utility token."

These quotes support claims 1–5 in [`PROOF.md`](../PROOF.md).

---

## 2. PiRC1 — Design 1 (primary source for the allocation math)

**Repository:** <https://github.com/PiNetwork/PiRC>
**Directory:** `PiRC1/`
**Pinned commit:** `c50d516` — "Update ReadMe.md", 2026-02-20T21:05:04Z

### §4.1 — LP formation and allocation

Quotes:

> "all committed Pi goes into the LP, and each participant receives their token allocation once at a single
> clearing price."

> "T = T_purchase = T_liquidity"

> "T_engage = 5%T"

> "T_purchase + T_liquidity + T_engage = 2.05T"

> "p = C / T"

> "p_list = C / T = p"

> "t_i^base = c_i / p_list"

> "t_i^engage = 2/3 · T_engage · c_i / C_top" for the top third,
> "1/3 · T_engage · c_i / C_mid" for the middle third,
> "0" for the bottom third.

> "If commitments are uniformly distributed across all engagement tiers, then on average: Top tier receives
> about 10% more tokens than base ... Middle tier receives about 5% more ... Bottom tier receives 0% more."

**Important:** the 10% / 5% / 0% figures are an **average under a uniform-commitment assumption**. The exact
bonus depends on the aggregate commitment of each tier (`C_top`, `C_mid`). The site labels the dropdown values
as an assumption accordingly.

### §5 — TGE / market opening

Quotes:

> "the LP contains over 48% of the project's current circulating supply (T / (2T + T_engage) ≈ 48.7%)."

> "The depositor of these tokens to the pool is the Escrow Wallet, which subsequently gets permanently locked
> so that it cannot withdraw the initial liquidity."

> "No project team can drain liquidity; every project launched on Pi Launchpad is supported by an immutable
> initial liquidity."

> "with the rewards parameter from Section 4 (T_engage = 5%T), the lower bound on the LP's spot price (Pi per
> token) is p_floor ≈ 0.238 p_list. There is no higher bound."

> The derivation assumes the constant-product AMM invariant `x · y = k`, ignores fees, and assumes the extreme
> case in which every participant sells every token back into the pool.

These quotes support claims 6–10 in [`PROOF.md`](../PROOF.md).

---

## 3. Supporting official links (not used for numerical claims)

| Link | Why it is listed |
|---|---|
| <https://minepi.com/blog/pi-day-2026/> | The Launchpad was originally part of the Pi Day 2026 announcement. |
| <https://developers.minepi.com/> | Entry point for official Pi developer documentation. |
| <https://minepi.com/pi-blockchain/> | Pi blockchain overview. |
| <https://x.com/PiCoreTeam> | Official Pi Core Team account (announcements). |

These are provided so a reader can continue verifying; no claim on the site depends solely on them.

---

## 4. Source hierarchy used by this project

1. **Official Pi Network blog** — product facts (what exists, on which network, for what purpose).
2. **PiRC1 at a pinned commit** — mechanism and formulas.
3. **Official developer docs** — technical context only.
4. **Anything else** — not used. No social-media screenshots, no third-party price sites, no scraped images.

If the blog and PiRC1 ever disagree, the site follows the blog for **product status** and PiRC1 for the
**published mechanism**, and says so rather than silently resolving the conflict.

---

## 5. What is deliberately **not** cited

- No price feed, exchange listing, or token-specific market data (none is claimed).
- No images or logos. The official logo is served as an inline `data:` SVG placeholder on the blog; rather than
  hot-link it or fabricate an asset, the site uses a CSS `π` mark.
- No "expected return" figures presented as facts.

See [`PROOF.md`](../PROOF.md) §6 for the explicit non-claims.
