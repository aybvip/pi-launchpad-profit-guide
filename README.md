# Pi Launchpad Profit Guide

> A static, bilingual (AR/EN) guide + calculator for Pi Network's Launchpad — built around **labelled evidence**,
> reproducible formulas, and explicit limits.
>
> **Educational only. Not financial advice. Not affiliated with Pi Network.**

**Live site:** <https://aybvip.github.io/pi-launchpad-profit-guide/>

---

## Why this project exists

Most "Launchpad profit" pages present a number with no way to check it. This one does the opposite:

- every factual claim carries a **status badge** — ✅ officially documented, 🧮 derived from a published formula,
  or ⚠️ assumption/unverified;
- the **exact quote, URL, and commit pin** are shown next to the claim;
- both calculators display their **formulas** and a **hand-checkable test vector**;
- the site can export an **evidence report** (inputs + outputs + formulas + sources + date) so a result can be
  reproduced later;
- the same numbers are asserted in **automated tests** on every push.

What it deliberately does **not** do: predict prices, claim guaranteed profit, show live market data, connect a
wallet, or request a recovery phrase.

---

## Features

| | |
|---|---|
| **Evidence section** | Claim → source → status → date/pin table, plus a "verify it yourself" checklist and a scope box. |
| **Design 1 allocation verifier** | Reproduces PiRC1 §4.1 / §5: `p_list = C/T`, base tokens, effective price, LP share, `p_floor ≈ 0.238·p_list`. Shows the substitution line by line. |
| **Profit/loss calculator** | Pi amount, expected tokens, assumed price, sell price, fees, slippage → value, profit/loss, %, break-even. |
| **Three scenarios** | Optimistic / base / pessimistic with a canvas bar chart. |
| **Evidence report export** | Copies a Markdown report with inputs, outputs, formulas, source URLs, pins, and date. |
| **AR/EN + RTL** | Full translation with direction switching; numbers stay Latin for copy-paste. |
| **Responsive dark UI** | Purple / blue / gold crypto-dashboard palette, no external image assets. |

---

## Evidence chain (short version)

| Claim | Source | Status |
|---|---|---|
| Launchpad on Testnet 2026-03-19, implements Design 1 | [Official blog](https://minepi.com/blog/pi-launchpad/) | ✅ |
| Pi proceeds → liquidity pool, not the project | Official blog | ✅ |
| Tokens for user acquisition/utility, not capital raising | Official blog | ✅ |
| Product-first requirement | Official blog | ✅ |
| `p_list = C/T`, `t_base = c_i/p_list` | [PiRC1 §4.1 @ c50d516](https://github.com/PiNetwork/PiRC/blob/c50d516/PiRC1/4-allocation/4-allocation%20design%201.md) | 🧮 |
| Supply `2.05T`, LP share ≈ 48.7%, Escrow locked | [PiRC1 §5 @ c50d516](https://github.com/PiNetwork/PiRC/blob/c50d516/PiRC1/5-tge-state/5-tge-state%20design%201.md) | ✅ / 🧮 |
| `p_floor ≈ 0.238·p_list` (fees ignored, everyone sells) | PiRC1 §5 | 🧮 |
| Actual sell price / depth / sellability | — | ⚠️ unknown, entered manually |

Full table, verbatim quotes, and non-claims: **[`PROOF.md`](PROOF.md)**.

---

## Run locally

No build step.

```bash
# open index.html directly, or serve it
python -m http.server 8080
# then http://localhost:8080
```

`file://` works too: `script.js` is a classic script and inlines the calculator math (ES-module imports are
blocked under `file://` in some browsers). The pure module in `calc.js` is used by the tests.

## Tests

```bash
npm test      # 12 tests, no network (6 math + 6 DOM)
npm run lint  # node --check on script.js + calc.js
```

Requires Node ≥ 20. CI: [`.github/workflows/ci.yml`](.github/workflows/ci.yml).

## Deploy to GitHub Pages

1. Push to `main`.
2. Settings → Pages → Source: **Deploy from a branch** → `main` / `/ (root)`.
3. The site appears at `https://<user>.github.io/pi-launchpad-profit-guide/`.

Already configured for this repository.

---

## Project map

| Path | Purpose |
|---|---|
| `index.html` | Page structure: hero, about, benefits, evidence, allocation, profit calculator, scenarios, sources. |
| `style.css` | Dark responsive design, evidence tables, badges, formula cards, RTL-safe layout. |
| `script.js` | i18n dict (AR/EN), inlined calculators, chart, allocation verifier, report export. |
| `calc.js` | Pure ES-module math used by the test suite. |
| `tests/calc.test.mjs` | 6 deterministic math tests incl. the published test vectors. |
| `tests/dom.test.mjs` | 6 jsdom tests: i18n completeness, inputs survive language switch, rendered vectors, report export. |
| `PROOF.md` | Claim-by-claim evidence, verbatim quotes, derived math, non-claims. |
| `docs/SOURCES.md` | Source list with retrieval date and commit pins. |
| `docs/METHODOLOGY.md` | Every formula, assumption, worked example, and rounding policy. |
| `docs/VERIFICATION.md` | What was run, when, and what "verified" does not mean. |
| `docs/research.md` | Short research summary. |
| `ARCHITECTURE.md` | Static-site structure and data flow. |
| `THREAT_MODEL.md` | Misinformation/phishing risks and mitigations. |
| `CONTRIBUTING.md` · `SECURITY.md` · `CODE_OF_CONDUCT.md` | Project policies. |

---

## Safety and scope

- No 24-word recovery phrase or private keys are ever requested.
- No automatic transactions; no wallet connection; no backend.
- Every price is a manual input; no live market data is shown.
- Theoretical price ≠ sellability; `p_floor` is a model result, not an executable price.
- Testnet behaviour may differ from Mainnet.
- Testnet vs Mainnet is stated explicitly in the UI.
- Nothing here is financial advice.

## License

MIT — see [`LICENSE`](LICENSE).
