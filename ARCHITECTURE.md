# Architecture

Static site — no build step, no backend, no network calls at runtime.

## Files

```
index.html            # markup: hero, about, benefits, evidence, allocation, P/L, scenarios, sources
style.css             # dark responsive design; evidence tables, badges, formula cards, RTL-safe
script.js             # classic script: i18n (AR/EN), DOM rendering, chart, both calculators, report export
calc.js               # pure ES module: same math, imported by tests only
tests/calc.test.mjs   # 6 deterministic math tests (node:test)
tests/dom.test.mjs    # 6 jsdom tests (boot, i18n keys, rendered vectors, report)
.github/workflows/ci.yml
```

## Runtime flow

```
index.html
  └─ <script src="script.js">            (classic script → works over file:// and https://)
       ├─ compute() / scenarios()        (inlined copies of calc.js)
       ├─ computeAllocation()            (PiRC1 Design 1 model)
       ├─ applyLang(lang)                (data-i18n text pass + dir/lang/title)
       ├─ calculate()                    (profit/loss DOM + canvas chart)
       ├─ calculateAllocation()          (allocation DOM + formula substitution line)
       └─ copyReport()                   (Markdown evidence report → clipboard)

tests/calc.test.mjs
  └─ import ../calc.js                   (Node only; never loaded by the page)
```

**Why the math is duplicated.** ES-module imports are blocked under `file://` in some browsers. Keeping
`script.js` classic makes the page usable by double-clicking `index.html`. `calc.js` stays the single source of
truth for the tests; the test vector is the contract that keeps both copies equal. Any formula change must touch
both files plus the test (see `docs/METHODOLOGY.md` §5).

## i18n

- `script.js` holds `dict = { ar: {...}, en: {...} }`.
- Elements marked `data-i18n="key"` receive `textContent = dict[lang][key]`.
- **Rule:** never put `data-i18n` on an element that contains child elements (inputs, links, `<code>`). Wrap the
  translatable text in a `<span>` instead — otherwise the text pass would delete the children. This is why the
  calculator labels are `<label><span data-i18n=…>…</span><input …></label>`.
- Language switch sets `document.documentElement.dir` to `rtl`/`ltr` and re-renders both calculators.

## Evidence layer

The proof section is static HTML (claims table, formula cards, test vector, verification checklist, scope box).
It contains **no derived runtime state**, so it cannot drift from the code: the allocation test vector shown on
the page is asserted in `tests/calc.test.mjs`, and CI fails if the code changes without the vector.

## Deployment

GitHub Pages, branch `main`, root `/`. No Jekyll build required. All asset paths are relative, so the site works
from a project subpath.

## Data flow (privacy)

There is none: inputs stay in the DOM; nothing is sent anywhere. The only outbound actions are user-clicked
links to official sources and a clipboard copy initiated by the user.
