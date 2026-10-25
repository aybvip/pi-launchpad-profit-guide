// Pure calculator logic (inlined for file:// compatibility; mirror of calc.js).
function compute(piAmount, tokens, tokenPrice, sellPrice, fee, slippage) {
  const cost = piAmount + fee;
  const grossValue = tokens * tokenPrice;
  const effectiveSell = sellPrice * (1 - slippage / 100);
  const revenue = tokens * effectiveSell;
  const profit = revenue - cost;
  const pct = cost > 0 ? (profit / cost) * 100 : 0;
  const breakEven = tokens > 0 ? cost / tokens : 0;
  return { cost, grossValue, revenue, profit, pct, breakEven, effectiveSell };
}
function scenarioProfit(tokens, sellPrice, slippage, cost, mult) {
  const sp = sellPrice * mult * (1 - slippage / 100);
  return tokens * sp - cost;
}
function scenarios(tokens, sellPrice, slippage, cost) {
  return {
    optimistic: scenarioProfit(tokens, sellPrice, slippage, cost, 1.5),
    base: scenarioProfit(tokens, sellPrice, slippage, cost, 1),
    pessimistic: scenarioProfit(tokens, sellPrice, slippage, cost, 0.5),
  };
}

const dict = {
  ar: {
    nav_about: "عن Launchpad",
    nav_benefits: "طرق الاستفادة",
    nav_calc: "الحاسبة",
    nav_scenarios: "السيناريوهات",
    nav_sources: "المصادر",
    hero_title: "Pi Launchpad Profit Guide",
    hero_sub: "فهم كيفية الاستفادة من Launchpad وتحليل فرص الربح المحتملة — بناءً على معلومات موثوقة.",
    hero_disclaimer: "⚠️ النتائج تقديرية وليست ضمانًا للربح. Launchpad على Testnet حالياً؛ Mainnet قيد التطوير.",
    cta_calc: "جرب الحاسبة",
    cta_sources: "المصادر الرسمية",
    about_title: "ما هو Pi Launchpad؟",
    about_p1: "Pi Launchpad هو تطبيق Pi (Pi App) أُطلق على Testnet (19 مارس 2026) لتنفيذ آلية Design 1 من PiRC. يتيح إطلاق توكنات ecosystem بهدف اكتساب المستخدمين وتفعيل المنتج، وليس لجمع رأس المال.",
    about_p2: "العائدات (Pi) من إطلاق التوكن تذهب إلى liquidity pool (مجمع سيولة) مع التوكن. المشاريع يجب أن تكون \"product-first\" (تطبيق يعمل) ليكون للتوكن فائدة فورية.",
    about_p3: "Launchpad يدعم نشاط DEX: التوكنات التي تُطلق (مع فائدة وسيولة) تدخل pipeline لـ Pi DEX، لمنع الفيضان بتوكنات عديمة القيمة.",
    about_source: "المصدر: Pi Network Blog — \"Pi Launchpad Released on Testnet\" (19 مارس 2026).",
    benefits_title: "طرق الاستفادة المحتملة",
    b1_t: "المشاركة في إطلاق توكن",
    b1_p: "المشاركة (commitment) في مشاريع product-first. الوصول للتوكنات عبر آليات Launchpad.",
    b2_t: "فهم آلية التخصيص",
    b2_p: "دراسة قواعد Launchpad (PiRC) لفهم كيف يُقسّم التوزيع.",
    b3_t: "دراسة السعر والسيولة",
    b3_p: "تقييم التوكن (utility + liquidity pool) قبل المشاركة.",
    b4_t: "حساب التكاليف والتعادل",
    b4_p: "استخدام الحاسبة أدناه لحساب break-even وprofit/loss.",
    b5_t: "شروط الحجز وفترات الانتظار",
    b5_p: "فهم lockups/vesting (إن وُجدت) وإمكانية البيع. Testnet ≠ Mainnet.",
    b6_t: "Testnet vs Mainnet",
    b6_p: "التوكنات على Testnet تجريبية (للتعلم). Mainnet قيد التطوير. لا تخلط بينهما.",
    calc_title: "حاسبة الربح / الخسارة",
    lbl_pi: "مقدار Pi للمشاركة",
    lbl_tokens: "عدد التوكنات المتوقعة",
    lbl_price: "سعر التوكن المفترض (Pi/توكن)",
    lbl_sell: "سعر البيع المحتمل (Pi/توكن)",
    lbl_fee: "الرسوم (Pi)",
    lbl_slip: "الانزلاق السعري (%)",
    btn_calc: "احسب",
    res_value: "قيمة التوكنات",
    res_profit: "الربح/الخسارة",
    res_pct: "النسبة",
    res_be: "سعر التعادل (Pi/توكن)",
    calc_note: "النتائج تقديرية. السعر النظري لا يعني إمكانية بيع التوكنات فعليًا بذلك السعر. لا توجد ضمانات ربح.",
    scen_title: "ثلاثة سيناريوهات",
    scen_opt: "متفائل",
    scen_opt_p: "سعر بيع ×1.5",
    scen_base: "متوسط",
    scen_base_p: "سعر بيع كما أدخلته",
    scen_pes: "متشائم",
    scen_pes_p: "سعر بيع ×0.5",
    src_title: "المصادر الرسمية",
    src_note: "آخر تحديث للمعلومات: 19 مارس 2026 (Pi Launchpad Testnet). Launchpad قد يتغير بسرعة أثناء الاختبار.",
    footer_p: "Pi Launchpad Profit Guide — أداة تعليمية. ليست نصيحة مالية. لا تطلب عبارة استرداد ٢٤ كلمة أو مفاتيح خاصة. لا معاملات تلقائية.",
  },
  en: {
    nav_about: "About Launchpad",
    nav_benefits: "How to benefit",
    nav_calc: "Calculator",
    nav_scenarios: "Scenarios",
    nav_sources: "Sources",
    hero_title: "Pi Launchpad Profit Guide",
    hero_sub: "Understand how to benefit from Launchpad and analyze potential profit/loss — based on reliable info.",
    hero_disclaimer: "⚠️ Estimates only, not guaranteed profit. Launchpad is on Testnet; Mainnet in development.",
    cta_calc: "Try the calculator",
    cta_sources: "Official sources",
    about_title: "What is Pi Launchpad?",
    about_p1: "Pi Launchpad is a Pi App released on Testnet (March 19, 2026) implementing Design 1 from PiRC. It enables launching ecosystem tokens for user acquisition and product utility, not capital raising.",
    about_p2: "Pi proceeds from token launches go to a liquidity pool with the token, bootstrapping healthy liquidity. Projects must be product-first (working app) for immediate token utility.",
    about_p3: "Launchpad supports DEX activity: launched tokens (with utility + liquidity) enter the Pi DEX pipeline, preventing flooding by meaningless speculative tokens.",
    about_source: "Source: Pi Network Blog — \"Pi Launchpad Released on Testnet\" (Mar 19, 2026).",
    benefits_title: "Potential ways to benefit",
    b1_t: "Participate in a token launch",
    b1_p: "Commit to product-first projects. Access tokens via Launchpad mechanisms.",
    b2_t: "Understand allocation mechanics",
    b2_p: "Study Launchpad rules (PiRC) to understand how distribution is split.",
    b3_t: "Study price & liquidity",
    b3_p: "Evaluate token utility + liquidity pool before participating.",
    b4_t: "Calculate costs & break-even",
    b4_p: "Use the calculator below for break-even and profit/loss.",
    b5_t: "Lockups & waiting periods",
    b5_p: "Understand lockups/vesting (if any) and sellability. Testnet ≠ Mainnet.",
    b6_t: "Testnet vs Mainnet",
    b6_p: "Testnet tokens are experimental (for learning). Mainnet in development. Do not confuse them.",
    calc_title: "Profit / Loss Calculator",
    lbl_pi: "Pi amount to participate",
    lbl_tokens: "Expected tokens received",
    lbl_price: "Assumed token price (Pi/token)",
    lbl_sell: "Potential sell price (Pi/token)",
    lbl_fee: "Fees (Pi)",
    lbl_slip: "Slippage (%)",
    btn_calc: "Calculate",
    res_value: "Token value",
    res_profit: "Profit / Loss",
    res_pct: "Percentage",
    res_be: "Break-even price (Pi/token)",
    calc_note: "Estimates only. Theoretical price does not mean tokens can actually be sold at that price. No guaranteed profit.",
    scen_title: "Three scenarios",
    scen_opt: "Optimistic",
    scen_opt_p: "Sell price ×1.5",
    scen_base: "Base",
    scen_base_p: "Sell price as entered",
    scen_pes: "Pessimistic",
    scen_pes_p: "Sell price ×0.5",
    src_title: "Official sources",
    src_note: "Last info update: March 19, 2026 (Pi Launchpad Testnet). Launchpad may change rapidly during testing.",
    footer_p: "Pi Launchpad Profit Guide — educational tool. Not financial advice. Never asks for 24-word phrase or private keys. No automatic transactions.",
  }
};

let currentLang = "ar";

function applyLang(lang) {
  currentLang = lang;
  const d = dict[lang];
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (d[key] !== undefined) el.textContent = d[key];
  });
  document.getElementById("langToggle").textContent = lang === "ar" ? "EN" : "AR";
}

function num(id) {
  const v = parseFloat(document.getElementById(id).value);
  return isNaN(v) ? 0 : v;
}

function fmt(n) {
  if (!isFinite(n)) return "—";
  return n.toLocaleString(undefined, { maximumFractionDigits: 4 });
}

function calculate() {
  const piAmount = num("piAmount");
  const tokens = num("tokens");
  const tokenPrice = num("tokenPrice");
  const sellPrice = num("sellPrice");
  const fee = num("fee");
  const slippage = num("slippage");

  const r = compute(piAmount, tokens, tokenPrice, sellPrice, fee, slippage);
  const sc = scenarios(tokens, sellPrice, slippage, r.cost);

  document.getElementById("rValue").textContent = fmt(r.grossValue) + " π";
  document.getElementById("rProfit").textContent = (r.profit >= 0 ? "+" : "") + fmt(r.profit) + " π";
  document.getElementById("rProfit").style.color = r.profit >= 0 ? "var(--good)" : "var(--bad)";
  document.getElementById("rPct").textContent = fmt(r.pct) + " %";
  document.getElementById("rPct").style.color = r.pct >= 0 ? "var(--good)" : "var(--bad)";
  document.getElementById("rBE").textContent = fmt(r.breakEven);

  const opt = sc.optimistic, base = sc.base, pes = sc.pessimistic;
  document.getElementById("sOpt").textContent = (opt >= 0 ? "+" : "") + fmt(opt) + " π";
  document.getElementById("sBase").textContent = (base >= 0 ? "+" : "") + fmt(base) + " π";
  document.getElementById("sPes").textContent = (pes >= 0 ? "+" : "") + fmt(pes) + " π";
  document.getElementById("sOpt").style.color = opt >= 0 ? "var(--good)" : "var(--bad)";
  document.getElementById("sBase").style.color = base >= 0 ? "var(--good)" : "var(--bad)";
  document.getElementById("sPes").style.color = pes >= 0 ? "var(--good)" : "var(--bad)";

  drawChart([pes, base, opt]);
}

function drawChart(vals) {
  const canvas = document.getElementById("chart");
  const ctx = canvas.getContext("2d");
  const w = canvas.width, h = canvas.height;
  ctx.clearRect(0, 0, w, h);
  const labels = currentLang === "ar" ? ["متشائم", "متوسط", "متفائل"] : ["Pessimistic", "Base", "Optimistic"];
  const maxAbs = Math.max(...vals.map((v) => Math.abs(v)), 1);
  const barW = 120;
  const gap = 60;
  const startX = (w - (barW * 3 + gap * 2)) / 2;
  const baseY = h / 2;
  ctx.strokeStyle = "#2a3350";
  ctx.beginPath();
  ctx.moveTo(0, baseY);
  ctx.lineTo(w, baseY);
  ctx.stroke();
  vals.forEach((v, i) => {
    const x = startX + i * (barW + gap);
    const height = (Math.abs(v) / maxAbs) * (h / 2 - 20);
    const y = v >= 0 ? baseY - height : baseY;
    ctx.fillStyle = v >= 0 ? "#2ecc71" : "#ff5c5c";
    ctx.fillRect(x, y, barW, height || 1);
    ctx.fillStyle = "#e8ecf4";
    ctx.font = "13px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(labels[i], x + barW / 2, h - 8);
    ctx.fillText((v >= 0 ? "+" : "") + v.toFixed(2), x + barW / 2, v >= 0 ? y - 6 : y + height + 14);
  });
}

document.getElementById("calcBtn").addEventListener("click", calculate);
document.getElementById("langToggle").addEventListener("click", () => {
  applyLang(currentLang === "ar" ? "en" : "ar");
  calculate();
});
document.querySelectorAll("input").forEach((inp) => inp.addEventListener("input", calculate));

applyLang("ar");
calculate();
