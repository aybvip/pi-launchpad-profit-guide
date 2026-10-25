# Threat model

The asset being protected is **the reader's trust and money**, not server credentials (there is no server).

| # | Risk | Why it matters | Mitigation in this repo |
|---|---|---|---|
| 1 | **Overclaiming profit** — a calculator that looks authoritative | Users may treat an estimate as a promise | Every result is labelled "estimate"; the scope box lists non-claims; no price prediction; `p_floor` is explicitly conditional; `PROOF.md` §6. |
| 2 | **Unverifiable citations** — "trust me" links | The page would be indistinguishable from hype | Claim → quote → URL → status badge → commit pin; `docs/SOURCES.md` records the retrieval date and `c50d516`. |
| 3 | **Source drift** — official pages change after publication | A once-true claim becomes false silently | GitHub/commit pin for PiRC1; "last verified" date on the page and in `docs/VERIFICATION.md`; change-control procedure. |
| 4 | **Fabricated media / phishing** | Fake logos and image URLs are a common scam vector | No external images at all; CSS `π` mark; only `https://` links to official domains. |
| 5 | **Wallet / phrase theft** | The most damaging possible outcome | The site never asks for a recovery phrase, private key, seed, or signature; no wallet SDK, no transaction code, no backend. |
| 6 | **Testnet/Mainnet confusion** | Users may believe a test token has value | Explicit disclaimers in the hero, about section, and evidence table; the blog's "Testnet first" quote is cited. |
| 7 | **Model misuse** — using `p_floor` as a sell target | The floor is conditional and ignores fees | The assumption is stated in the formula card, the note under the verifier, `docs/METHODOLOGY.md` §1.4, and `PROOF.md` §6. |
| 8 | **Tier bonus treated as entitlement** | 10%/5% are averages under a uniform-commitment assumption | Dropdown labelled "estimate"; note under the verifier; PiRC1's exact `C_top`/`C_mid` formula is cited. |
| 9 | **Clipboard report leaks secrets** | Users might paste a phrase into the inputs | Inputs are numeric only; the report contains only numbers, formulas, and public URLs. |
| 10 | **Third-party link rot / domain hijack** | A dead or hijacked link undermines evidence | Links point to `minepi.com`, `github.com/PiNetwork`, `developers.minepi.com`, `x.com/PiCoreTeam`; repository pin allows content recovery. |

## Out of scope

- Availability/DDoS of GitHub Pages (GitHub's responsibility).
- Correctness of Pi Network's own implementation (this repo verifies **published text and formulas**, not the app).
- Any token's smart-contract security (no token contracts are analysed here).
