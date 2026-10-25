import { test } from "node:test";
import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { JSDOM } from "jsdom";

const here = path.dirname(fileURLToPath(import.meta.url));
const indexPath = path.join(here, "..", "index.html");

function stubCanvas(window) {
  const noop = () => {};
  const ctx = new Proxy({}, {
    get: () => noop,
    set: () => true,
  });
  window.HTMLCanvasElement.prototype.getContext = () => ctx;
}

async function loadPage() {
  const dom = await JSDOM.fromFile(indexPath, {
    runScripts: "dangerously",
    resources: "usable",
    pretendToBeVisual: true,
    beforeParse(window) {
      stubCanvas(window);
      Object.defineProperty(window.navigator, "clipboard", {
        configurable: true,
        value: { writeText: async (text) => { window.__copiedReport = text; } },
      });
    },
  });
  if (dom.window.document.readyState !== "complete") {
    await new Promise((resolve) => dom.window.addEventListener("load", resolve));
  }
  await new Promise((resolve) => setTimeout(resolve, 0));
  return dom;
}

test("page boots without destroying inputs (i18n regression)", async () => {
  const dom = await loadPage();
  const { document } = dom.window;

  for (const id of ["piAmount", "tokens", "tokenPrice", "sellPrice", "fee", "slippage", "totalPi", "purchaseTokens", "myPi", "tier"]) {
    assert.ok(document.getElementById(id), `missing control #${id} after boot`);
  }
  // 6 profit inputs + 3 allocation inputs + 1 select
  assert.equal(document.querySelectorAll(".calc-inputs input").length, 9);
  assert.equal(document.querySelectorAll(".calc-inputs select").length, 1);

  // The label text survived while the child input was not removed.
  assert.ok(document.getElementById("piAmount").closest("label").textContent.includes("مقدار Pi"));
  dom.window.close();
});

test("every data-i18n key exists in both dictionaries", async () => {
  const dom = await loadPage();
  const { document } = dom.window;
  const keys = [...new Set([...document.querySelectorAll("[data-i18n]")].map((el) => el.getAttribute("data-i18n")))];
  const ar = dom.window.eval("dict.ar");
  const en = dom.window.eval("dict.en");
  const missingAr = keys.filter((k) => !(k in ar));
  const missingEn = keys.filter((k) => !(k in en));
  assert.deepEqual(missingAr, [], "missing Arabic keys");
  assert.deepEqual(missingEn, [], "missing English keys");
  dom.window.close();
});

test("profit/loss calculator renders the documented test vector", async () => {
  const dom = await loadPage();
  const { document } = dom.window;
  assert.equal(document.getElementById("rValue").textContent, "100 π");
  assert.equal(document.getElementById("rProfit").textContent, "+46 π");
  assert.equal(document.getElementById("rPct").textContent, "45.5446 %");
  assert.equal(document.getElementById("rBE").textContent, "0.202");
  assert.equal(document.getElementById("sOpt").textContent, "+119.5 π");
  assert.equal(document.getElementById("sPes").textContent, "-27.5 π");
  dom.window.close();
});

test("allocation verifier renders PiRC1 test vector and formula substitution", async () => {
  const dom = await loadPage();
  const { document } = dom.window;
  assert.equal(document.getElementById("aPrice").textContent, "0.1");
  assert.equal(document.getElementById("aTokens").textContent, "5,000");
  assert.equal(document.getElementById("aEff").textContent, "0.1");
  assert.equal(document.getElementById("aFloor").textContent, "0.0238");
  const formula = document.getElementById("allocFormula").textContent;
  assert.match(formula, /p_list\s+=\s+C \/ T\s+= 100,000 \/ 1,000,000 = 0\.1/);
  assert.match(formula, /LP share/);
  dom.window.close();
});

test("language toggle keeps inputs alive and switches direction", async () => {
  const dom = await loadPage();
  const { document } = dom.window;
  dom.window.eval("applyLang('en')");
  dom.window.eval("calculate(); calculateAllocation();");

  assert.equal(document.documentElement.lang, "en");
  assert.equal(document.documentElement.dir, "ltr");
  assert.equal(document.getElementById("langToggle").textContent, "AR");
  assert.equal(document.querySelector("#calculator .calc-inputs label span").textContent, "Pi amount to participate");
  assert.equal(document.querySelectorAll(".calc-inputs input").length, 9);
  assert.equal(document.getElementById("rProfit").textContent, "+46 π");
  assert.equal(document.getElementById("aFloor").textContent, "0.0238");

  dom.window.eval("applyLang('ar')");
  assert.equal(document.documentElement.dir, "rtl");
  assert.equal(document.querySelectorAll(".calc-inputs input").length, 9);
  dom.window.close();
});

test("evidence report contains inputs, formulas, pins, and the non-advice line", async () => {
  const dom = await loadPage();
  await dom.window.copyReport();
  const report = dom.window.__copiedReport;
  assert.ok(report, "report was not produced");
  assert.match(report, /\[PiRC1 Design 1 allocation\]/);
  assert.match(report, /p_list = C \/ T = 0\.1 Pi\/token/);
  assert.match(report, /p_floor = p_list \/ \(2\.05\)\^2 = 0\.0238 Pi\/token/);
  assert.match(report, /\[Profit \/ loss calculator\]/);
  assert.match(report, /profit = revenue - cost = 46/);
  assert.match(report, /c50d516/);
  assert.match(report, /Not financial advice/);
  assert.equal(dom.window.document.getElementById("copyStatus").textContent, "تم النسخ إلى الحافظة ✓");
  dom.window.close();
});
