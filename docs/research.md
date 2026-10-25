# Research notes

> The rigorous, claim-by-claim version of this file is [`../PROOF.md`](../PROOF.md).
> Exact quotes and commit pins are in [`SOURCES.md`](SOURCES.md); formulas are in [`METHODOLOGY.md`](METHODOLOGY.md).

## Official sources

- <https://minepi.com/blog/pi-launchpad/> — "Pi Launchpad Released on Testnet", 2026-03-19 (retrieved 2026-10-25)
- <https://github.com/PiNetwork/PiRC> — PiRC1, pinned at `c50d516` (2026-02-20)
- <https://minepi.com/blog/pi-day-2026/> — Pi Day 2026 announcement
- <https://developers.minepi.com/> — developer entry point
- <https://x.com/PiCoreTeam> — official account

## Facts taken from the official blog

- Launchpad was released on **Testnet** on 2026-03-19 and implements **Design 1** from PiRC.
- It is Testnet-only for now; the Mainnet version is in development.
- Ecosystem tokens are for **user acquisition and product utility**, not primarily capital raising.
- Pi proceeds go to a **liquidity pool with the ecosystem token**, not to the issuing project.
- Projects are expected to be **product-first** (a working app at launch).
- The Launchpad supports the Pi DEX pipeline (tokens with utility + liquidity).
- The Testnet product may iterate and change quickly; the final design is subject to feedback.

## Facts derived from PiRC1 (Design 1)

- `p_list = C / T`, where `C` is total committed Pi and `T` is the purchase-bucket token amount.
- `t_base = c_i / p_list` for a participant committing `c_i`.
- `T_purchase = T_liquidity = T` and `T_engage = 5%T` ⇒ initial supply `2.05T`, LP share ≈ 48.7%.
- The Escrow Wallet seeding the LP is permanently locked.
- Theoretical LP spot-price lower bound `p_floor ≈ 0.238 × p_list` (fees ignored, everyone sells).

## Deliberately excluded

- No images: the official logo is an inline SVG `data:` URI on the blog; no reusable asset URL was found, so the
  site uses a CSS `π` mark instead of a fabricated image.
- No live price API, no wallet connection, no transaction code.
- No claim about any specific token's sellability.
