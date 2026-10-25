# Verification — what was run, when, and what it does **not** prove

> **Read this first if you are evaluating the project.**
> It answers: *"Has anyone actually run the checks, and did they pass?"* — and it separates
> **automated test results** from an **independent audit** (this project has none).

---

## 1. What "verified" means here

| Term | Meaning in this repository |
|---|---|
| **Automated check** | A deterministic offline assertion. No network, so it cannot be flaky. |
| **Source verification** | The cited page/file was opened on the date shown and the quoted text was read there. |
| **Independent audit** | A third party reviewed the code and claims. ❌ **None.** |

> ⚠️ "Verified" on this page never means "audited". It means: the commands below were executed, on the date
> shown, and the recorded output was produced.

---

## 2. Last verified

| | |
|---|---|
| **Date** | **2026-10-25** |
| **Local environment** | Node **v24.13.0**, npm **11.6.2** (Windows) |
| **CI environment** | Node **20.x** and **22.x** on `ubuntu-latest` |
| **Command run** | `npm ci`, `npm test`, `npm run lint` |
| **Result** | ✅ **12 tests passed, 0 failed**; lint OK |
| **Scope** | Repository state of 2026-10-25 |
| **Sources pinned** | PiRC1 `c50d516` (2026-02-20); blog retrieved 2026-10-25 |

Every push to `main` re-runs the same checks:
[`.github/workflows/ci.yml`](https://github.com/aybvip/pi-launchpad-profit-guide/blob/main/.github/workflows/ci.yml).

---

## 3. Test results

```
$ npm test

✔ compute basic (hand-checkable test vector)
✔ compute zero tokens breakEven 0
✔ scenarios
✔ PiRC1 Design 1 allocation test vector
✔ PiRC1 engagement tiers change effective price only
✔ zero inputs never produce NaN
✔ page boots without destroying inputs (i18n regression)
✔ every data-i18n key exists in both dictionaries
✔ profit/loss calculator renders the documented test vector
✔ allocation verifier renders PiRC1 test vector and formula substitution
✔ language toggle keeps inputs alive and switches direction
✔ evidence report contains inputs, formulas, pins, and the non-advice line

ℹ tests 12
ℹ pass 12
ℹ fail 0
```

```
$ npm run lint
> node --check script.js && node --check calc.js
(no output = OK)
```

The assertions include the fully written test vectors from
[`docs/METHODOLOGY.md`](METHODOLOGY.md):

| Model | Inputs | Asserted outputs |
|---|---|---|
| Allocation | `C=100000, T=1000000, c_i=500, tier=none` | `p_list=0.1`, `t_base=5000`, `p_eff=0.1`, `lpShare=48.7804878…`, `floor=0.0237953…` |
| Profit/loss | `pi=100, fee=1, tokens=500, sell=0.3, slip=2%` | `cost=101`, `revenue=147`, `profit=46`, `pct=45.5445…`, `breakEven=0.202` |

---

## 4. Source verification log

| Source | Check performed | Result |
|---|---|---|
| `minepi.com/blog/pi-launchpad/` | Page opened; title, author, date, and the quoted passages read | ✅ 2026-10-25 |
| `PiNetwork/PiRC` → `PiRC1` | Commit list read; latest PiRC1-affecting commit is `c50d516` (2026-02-20) | ✅ 2026-10-25 |
| `PiRC1/4-allocation design 1.md` | §4.1 formulas and tier text read at `c50d516` | ✅ 2026-10-25 |
| `PiRC1/5-tge-state design 1.md` | §5 LP composition, Escrow lock, and `p_floor` read at `c50d516` | ✅ 2026-10-25 |

The repository head at the time of retrieval was `dc86dfd` (PiRC2, 2026-04-17); PiRC1 was unchanged after
`c50d516`.

---

## 5. What is **not** verified

- ❌ No Pi Mainnet or Testnet RPC call — this is a static site with no backend.
- ❌ No live Launchpad data; `C` and `T` are manual inputs.
- ❌ No token-specific liquidity or price data.
- ❌ No third-party audit.
- ❌ No browser-matrix test suite; the page is plain HTML/CSS/JS and was checked manually for layout.

---

## 6. How to reproduce

```bash
git clone https://github.com/aybvip/pi-launchpad-profit-guide
cd pi-launchpad-profit-guide
npm test
npm run lint
# expected: 12 passed, 0 failed; lint OK
```

Then open `index.html` and compare the on-page test vector with the table above.

---

## 7. Reporting a wrong claim

If a claim no longer matches the official source, open an issue with:

1. the claim number from [`PROOF.md`](../PROOF.md);
2. the URL and the date you checked it;
3. the exact conflicting text.

The project follows the blog for **product status** and the pinned PiRC1 for the **published mechanism**.
