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
// PiRC1 Design 1 allocation model (mirror of calc.js).
function computeAllocation(totalPi, purchaseTokens, myPi, tier) {
  const pList = purchaseTokens > 0 ? totalPi / purchaseTokens : 0;
  const bonus = tier === "top" ? 0.1 : tier === "mid" ? 0.05 : 0;
  const baseTokens = pList > 0 ? myPi / pList : 0;
  const engageTokens = baseTokens * bonus;
  const totalTokens = baseTokens + engageTokens;
  const effPrice = totalTokens > 0 ? myPi / totalTokens : 0;
  const lpShare = 100 / 2.05;
  const floor = pList / (2.05 * 2.05);
  return { pList, bonus, baseTokens, engageTokens, totalTokens, effPrice, lpShare, floor };
}

const dict = {
  ar: {
    nav_about: "عن Launchpad",
    nav_benefits: "طرق الاستفادة",
    nav_proof: "الإثبات",
    nav_alloc: "التخصيص",
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
    proof_title: "الإثبات: ما نعرفه، ومصدره، وكيف تتحقق منه",
    proof_intro: "كل ادعاء في هذه الصفحة مصنّف: موثّق رسميًا، أو مشتق رياضيًا من معادلة منشورة، أو افتراض تقديري. لا نطلب منك تصديقنا — يمكنك فتح المصادر وإعادة الحساب بنفسك.",
    badge_verified: "✅ موثّق رسميًا",
    badge_derived: "🧮 مشتق رياضيًا",
    badge_assumed: "⚠️ افتراض / غير متحقق",
    th_claim: "الادعاء",
    th_evidence: "الدليل / المعادلة",
    th_status: "الحالة",
    th_date: "التاريخ / التثبيت",
    p1_claim: "أُطلق Launchpad على Testnet في 19 مارس 2026، وينفّذ آلية Design 1 من PiRC.",
    p2_claim: "النسخة الحالية على Testnet فقط؛ نسخة Mainnet قيد التطوير، وقد «تتغير بسرعة» أثناء الاختبار.",
    p3_claim: "عائدات Pi من الإطلاق تذهب إلى مجمع سيولة مع التوكن، ولا يأخذها المشروع المُصدِر.",
    p4_claim: "التوكنات مخصّصة لاكتساب المستخدمين والمنفعة داخل المنتج، وليس لجمع رأس المال.",
    p5_claim: "المشاريع المشاركة يجب أن تكون \"product-first\": تطبيق يعمل يمنح التوكن فائدة فورية.",
    p6_claim: "سعر الإدراج = إجمالي Pi الملتزم ÷ توكنات bucket الشراء.",
    p7_claim: "حصة المشارك الأساسية تُحسب بسعر الإدراج نفسه.",
    p8_claim: "حجما الشراء والسيولة متساويان، ومكافأة التفاعل 5% من T؛ فالعرض الابتدائي 2.05T وحصة المجمع ≈48.7%.",
    p9_claim: "محفظة Escrow التي تُهيّئ المجمع تُقفل نهائيًا؛ لا يستطيع فريق المشروع سحب السيولة الابتدائية.",
    p10_claim: "الحد النظري الأدنى لسعر المجمع ≈ 0.238 × سعر الإدراج، بافتراض بيع كل التوكنات وبدون رسوم.",
    p11_claim: "سعر البيع الفعلي، وعمق السيولة، وإمكانية البيع بتوكن معيّن: غير معروفة مسبقًا، ولا ندّعي معرفتها.",
    p11_evidence: "لا يوجد في المصادر الرسمية سعر أو ضمان سيولة لتوكن بعينه؛ المتغيرات تُدخَل يدويًا في الحاسبة.",
    method_title: "المنهجية: المعادلات المستخدمة (بدون صندوق أسود)",
    fm_alloc_t: "تخصيص Design 1 — من PiRC1",
    fm_alloc_p: "C = إجمالي Pi الملتزم، T = توكنات bucket الشراء، c_i = التزامك. p_eff تنطبق فقط عند وجود مكافأة تفاعل.",
    fm_calc_t: "حاسبة الربح/الخسارة — هذه الصفحة",
    fm_calc_p: "المعادلات نفسها موجودة في calc.js، وتُختبر آليًا في CI عند كل push.",
    tv_title: "مثال اختبار قابل للتحقق يدويًا",
    tv_intro: "نفس الأرقام موجودة في tests/calc.test.mjs. أعد الحساب بآلة حاسبة عادية:",
    tv_case: "الحالة",
    tv_input: "المدخلات",
    tv_expected: "النتيجة المتوقعة",
    tv_alloc_case: "تخصيص Design 1",
    tv_profit_case: "ربح/خسارة",
    verify_title: "تحقّق بنفسك (٥ دقائق)",
    v1: "افتح المنشور الرسمي وتأكد من العنوان والتاريخ:",
    v2: "افتح PiRC1 عند التثبيت c50d516 واقرأ §4.1 و§5:",
    v3: "أعد الحساب: 100,000 ÷ 1,000,000 = 0.1، ثم 500 ÷ 0.1 = 5,000، ثم 0.1 ÷ (2.05)² = 0.023795.",
    v4: "شغّل الاختبارات محليًا لمطابقة الأرقام:",
    v5: "انسخ «تقرير الإثبات» من مدقّق التخصيص واحتفظ بالمدخلات والتاريخ والروابط.",
    scope_title: "ما لا تدّعيه هذه الصفحة",
    scope1: "لا تتنبأ بسعر أي توكن ولا تضمن ربحًا.",
    scope2: "ليست تدقيقًا مستقلًا لشبكة Pi أو لأي مشروع.",
    scope3: "لا تعرض بيانات حية؛ كل الأسعار في الحاسبة مدخلات يدوية.",
    scope4: "الحد النظري 0.238 يتجاهل الرسوم والإصدار الإضافي للمعروض ويصف فقط الحالة النظرية القصوى.",
    scope5: "ليست نصيحة مالية، ولا تطلب عبارة استرداد أو مفاتيح خاصة.",
    proof_log: "سجل التحقق: جُلب المنشور الرسمي وPiRC1 في 2026-10-25. PiRC1 مثبّت عند c50d516 (2026-02-20). أي تغيير لاحق في المصدر قد يغيّر النتائج.",
    alloc_title: "مدقّق تخصيص Design 1",
    alloc_intro: "أعِد إنتاج معادلات PiRC1 بنفسك. هذه ليست بيانات حية — إنها آلة حاسبة تعليمية للمعادلة المنشورة، مع إظهار التعويض خطوة بخطوة.",
    lbl_total_pi: "إجمالي Pi الملتزم C",
    lbl_purchase_tokens: "توكنات bucket الشراء T",
    lbl_my_pi: "التزامك الشخصي c_i",
    lbl_tier: "فئة التفاعل (اختياري)",
    tier_none: "بدون مكافأة (0%)",
    tier_mid: "متوسطة (≈5%)",
    tier_top: "عالية (≈10%)",
    btn_alloc: "احسب التخصيص",
    a_price: "سعر الإدراج p_list (Pi/توكن)",
    a_tokens: "توكناتك الأساسية t_base",
    a_eff: "سعرك الفعلي p_eff (Pi/توكن)",
    a_floor: "الحد النظري الأدنى p_floor",
    alloc_note: "مكافأة التفاعل المعروضة (0% / 5% / 10%) هي متوسط PiRC1 بافتراض توزيع الالتزامات بالتساوي بين الفئات — وهو افتراض موضّح، وليس وعدًا. راجع §4.1 للمعادلة الدقيقة.",
    btn_copy: "انسخ تقرير الإثبات",
    copy_ok: "تم النسخ إلى الحافظة ✓",
    copy_fail: "تعذّر النسخ — حدّد النص يدويًا.",
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
    src_note: "آخر تحديث للمعلومات: 19 مارس 2026 (Pi Launchpad Testnet). آخر تحقق من الروابط: 2026-10-25. Launchpad قد يتغير بسرعة أثناء الاختبار.",
    footer_p: "Pi Launchpad Profit Guide — أداة تعليمية. ليست نصيحة مالية. لا تطلب عبارة استرداد ٢٤ كلمة أو مفاتيح خاصة. لا معاملات تلقائية.",
  },
  en: {
    nav_about: "About Launchpad",
    nav_benefits: "How to benefit",
    nav_proof: "Evidence",
    nav_alloc: "Allocation",
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
    proof_title: "Evidence: what we know, where it comes from, and how to check it yourself",
    proof_intro: "Every claim on this page is labelled: officially documented, mathematically derived from a published formula, or an estimate/assumption. You do not have to trust us — open the sources and redo the math.",
    badge_verified: "✅ Officially documented",
    badge_derived: "🧮 Derived from formula",
    badge_assumed: "⚠️ Assumption / unverified",
    th_claim: "Claim",
    th_evidence: "Evidence / formula",
    th_status: "Status",
    th_date: "Date / pin",
    p1_claim: "Launchpad was released on Testnet on March 19, 2026, implementing Design 1 from PiRC.",
    p2_claim: "The current version is Testnet-only; the Mainnet version is in development and may \"iterate and change quickly\" during testing.",
    p3_claim: "Pi proceeds from a launch go to a liquidity pool with the token — the issuing project does not take them.",
    p4_claim: "Tokens are designed for user acquisition and in-product utility, not primarily to raise capital.",
    p5_claim: "Launching projects are expected to be product-first: a working app gives the token immediate utility.",
    p6_claim: "Listing price = total committed Pi ÷ purchase-bucket tokens.",
    p7_claim: "A participant's base token allocation is computed at that same listing price.",
    p8_claim: "Purchase and liquidity buckets are equal, engagement rewards are 5% of T, so initial supply is 2.05T and the LP holds ≈48.7%.",
    p9_claim: "The Escrow Wallet seeding the LP is permanently locked; no project team can drain the initial liquidity.",
    p10_claim: "The theoretical lower bound of the LP spot price is ≈0.238 × listing price, assuming every token is sold back and ignoring fees.",
    p11_claim: "The actual sell price, liquidity depth, and sellability of any specific token are unknown in advance — and we do not claim to know them.",
    p11_evidence: "No official source provides a price or a liquidity guarantee for a specific token; these variables are entered manually in the calculator.",
    method_title: "Methodology: the formulas (no black box)",
    fm_alloc_t: "Design 1 allocation — from PiRC1",
    fm_alloc_p: "C = total committed Pi, T = purchase-bucket tokens, c_i = your commitment. p_eff applies only when an engagement reward exists.",
    fm_calc_t: "Profit/loss calculator — this page",
    fm_calc_p: "The same formulas live in calc.js and are automatically tested in CI on every push.",
    tv_title: "Hand-checkable test vector",
    tv_intro: "The same numbers are used in tests/calc.test.mjs. Recompute them with an ordinary calculator:",
    tv_case: "Case",
    tv_input: "Inputs",
    tv_expected: "Expected result",
    tv_alloc_case: "Design 1 allocation",
    tv_profit_case: "Profit / loss",
    verify_title: "Verify it yourself (5 minutes)",
    v1: "Open the official post and check the title and date:",
    v2: "Open PiRC1 at pin c50d516 and read §4.1 and §5:",
    v3: "Recompute: 100,000 ÷ 1,000,000 = 0.1, then 500 ÷ 0.1 = 5,000, then 0.1 ÷ (2.05)² = 0.023795.",
    v4: "Run the tests locally to match the numbers:",
    v5: "Copy the \"evidence report\" from the allocation verifier and keep the inputs, date, and links.",
    scope_title: "What this page does NOT claim",
    scope1: "It does not predict any token price and does not guarantee profit.",
    scope2: "It is not an independent audit of Pi Network or of any project.",
    scope3: "It shows no live data; every price in the calculator is a manual input.",
    scope4: "The 0.238 floor ignores fees and further token issuance, and describes only the extreme theoretical case.",
    scope5: "It is not financial advice, and it never asks for a recovery phrase or private keys.",
    proof_log: "Verification log: the official post and PiRC1 were retrieved on 2026-10-25. PiRC1 is pinned at c50d516 (2026-02-20). Any later upstream change may change the results.",
    alloc_title: "Design 1 allocation verifier",
    alloc_intro: "Reproduce PiRC1's formulas yourself. This is not live data — it is an educational calculator for the published formula, showing the substitution step by step.",
    lbl_total_pi: "Total committed Pi C",
    lbl_purchase_tokens: "Purchase-bucket tokens T",
    lbl_my_pi: "Your commitment c_i",
    lbl_tier: "Engagement tier (optional)",
    tier_none: "No reward (0%)",
    tier_mid: "Middle (≈5%)",
    tier_top: "Top (≈10%)",
    btn_alloc: "Calculate allocation",
    a_price: "Listing price p_list (Pi/token)",
    a_tokens: "Your base tokens t_base",
    a_eff: "Your effective price p_eff (Pi/token)",
    a_floor: "Theoretical lower bound p_floor",
    alloc_note: "The engagement reward shown (0% / 5% / 10%) is PiRC1's average under the assumption that commitments are uniformly distributed across tiers — an explicit assumption, not a promise. See §4.1 for the exact formula.",
    btn_copy: "Copy evidence report",
    copy_ok: "Copied to clipboard ✓",
    copy_fail: "Copy failed — select the text manually.",
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
    src_note: "Last info update: March 19, 2026 (Pi Launchpad Testnet). Links last verified: 2026-10-25. Launchpad may change rapidly during testing.",
    footer_p: "Pi Launchpad Profit Guide — educational tool. Not financial advice. Never asks for 24-word phrase or private keys. No automatic transactions.",
  }
};

let currentLang = "ar";
let lastAlloc = null;
let lastProfit = null;

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
  document.title = lang === "ar"
    ? "Pi Launchpad Profit Guide — حاسبة وتوثيق"
    : "Pi Launchpad Profit Guide — calculator and evidence";
}

function num(id) {
  const v = parseFloat(document.getElementById(id).value);
  return isNaN(v) ? 0 : v;
}

function fmt(n) {
  if (!isFinite(n)) return "—";
  return n.toLocaleString("en-US", { maximumFractionDigits: 4 });
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
  lastProfit = { piAmount, tokens, tokenPrice, sellPrice, fee, slippage, r, sc };

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

function calculateAllocation() {
  const totalPi = num("totalPi");
  const purchaseTokens = num("purchaseTokens");
  const myPi = num("myPi");
  const tier = document.getElementById("tier").value;
  const a = computeAllocation(totalPi, purchaseTokens, myPi, tier);
  lastAlloc = { totalPi, purchaseTokens, myPi, tier, a };

  document.getElementById("aPrice").textContent = fmt(a.pList);
  document.getElementById("aTokens").textContent = fmt(a.baseTokens);
  document.getElementById("aEff").textContent = fmt(a.effPrice);
  document.getElementById("aFloor").textContent = fmt(a.floor);

  const tierLabel = dict[currentLang]["tier_" + tier] || tier;
  document.getElementById("allocFormula").textContent = [
    "p_list   = C / T                     = " + fmt(totalPi) + " / " + fmt(purchaseTokens) + " = " + fmt(a.pList),
    "t_base   = c_i / p_list              = " + fmt(myPi) + " / " + fmt(a.pList) + " = " + fmt(a.baseTokens),
    "t_engage = t_base × bonus (" + tierLabel + ") = " + fmt(a.baseTokens) + " × " + (a.bonus * 100).toFixed(0) + "% = " + fmt(a.engageTokens),
    "p_eff    = c_i / (t_base + t_engage) = " + fmt(myPi) + " / " + fmt(a.totalTokens) + " = " + fmt(a.effPrice),
    "LP share = T / (2.05 × T)            ≈ " + a.lpShare.toFixed(2) + "%",
    "p_floor  = p_list / (2.05)^2         = " + fmt(a.pList) + " / 4.2025 = " + fmt(a.floor)
  ].join("\n");
}

function buildReport() {
  const now = new Date().toISOString().slice(0, 10);
  const lines = [];
  lines.push("Pi Launchpad Profit Guide — evidence report");
  lines.push("Generated: " + now);
  lines.push("Page: https://aybvip.github.io/pi-launchpad-profit-guide/");
  lines.push("Method: https://github.com/aybvip/pi-launchpad-profit-guide/blob/main/docs/METHODOLOGY.md");
  lines.push("");
  lines.push("[PiRC1 Design 1 allocation]");
  if (lastAlloc) {
    const { totalPi, purchaseTokens, myPi, tier, a } = lastAlloc;
    lines.push("C (total committed Pi) = " + fmt(totalPi));
    lines.push("T (purchase-bucket tokens) = " + fmt(purchaseTokens));
    lines.push("c_i (my commitment) = " + fmt(myPi));
    lines.push("tier = " + tier + " (bonus " + (a.bonus * 100).toFixed(0) + "%)");
    lines.push("p_list = C / T = " + fmt(a.pList) + " Pi/token");
    lines.push("t_base = c_i / p_list = " + fmt(a.baseTokens) + " tokens");
    lines.push("t_engage = " + fmt(a.engageTokens) + " tokens");
    lines.push("p_eff = c_i / (t_base + t_engage) = " + fmt(a.effPrice) + " Pi/token");
    lines.push("LP share = T / (2.05*T) = " + a.lpShare.toFixed(2) + "%");
    lines.push("p_floor = p_list / (2.05)^2 = " + fmt(a.floor) + " Pi/token");
  } else {
    lines.push("(not calculated)");
  }
  lines.push("");
  lines.push("[Profit / loss calculator]");
  if (lastProfit) {
    const { piAmount, tokens, tokenPrice, sellPrice, fee, slippage, r } = lastProfit;
    lines.push("pi = " + fmt(piAmount) + " | fee = " + fmt(fee) + " | tokens = " + fmt(tokens));
    lines.push("token price = " + fmt(tokenPrice) + " | sell price = " + fmt(sellPrice) + " | slippage = " + fmt(slippage) + "%");
    lines.push("cost = pi + fee = " + fmt(r.cost));
    lines.push("effective_sell = sell * (1 - slippage/100) = " + fmt(r.effectiveSell));
    lines.push("revenue = tokens * effective_sell = " + fmt(r.revenue));
    lines.push("profit = revenue - cost = " + fmt(r.profit));
    lines.push("pct = profit / cost * 100 = " + fmt(r.pct) + "%");
    lines.push("break_even = cost / tokens = " + fmt(r.breakEven));
  } else {
    lines.push("(not calculated)");
  }
  lines.push("");
  lines.push("[Sources]");
  lines.push("- https://minepi.com/blog/pi-launchpad/ (2026-03-19)");
  lines.push("- https://github.com/PiNetwork/PiRC/blob/c50d516/PiRC1/4-allocation/4-allocation%20design%201.md");
  lines.push("- https://github.com/PiNetwork/PiRC/blob/c50d516/PiRC1/5-tge-state/5-tge-state%20design%201.md");
  lines.push("Pinned revision: c50d516 (2026-02-20). Retrieved: 2026-10-25.");
  lines.push("");
  lines.push("Estimates only. Not financial advice. Theoretical price does not imply sellability.");
  return lines.join("\n");
}

async function copyReport() {
  const status = document.getElementById("copyStatus");
  const text = buildReport();
  try {
    await navigator.clipboard.writeText(text);
    status.textContent = dict[currentLang].copy_ok;
    status.classList.remove("error");
  } catch (err) {
    try {
      const area = document.createElement("textarea");
      area.value = text;
      area.setAttribute("readonly", "");
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.select();
      document.execCommand("copy");
      document.body.removeChild(area);
      status.textContent = dict[currentLang].copy_ok;
      status.classList.remove("error");
    } catch (err2) {
      status.textContent = dict[currentLang].copy_fail;
      status.classList.add("error");
    }
  }
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
document.getElementById("allocBtn").addEventListener("click", calculateAllocation);
document.getElementById("copyReport").addEventListener("click", copyReport);
document.getElementById("langToggle").addEventListener("click", () => {
  applyLang(currentLang === "ar" ? "en" : "ar");
  calculate();
  calculateAllocation();
});
document.querySelectorAll("input").forEach((inp) => inp.addEventListener("input", () => {
  calculate();
  calculateAllocation();
}));
document.getElementById("tier").addEventListener("change", calculateAllocation);

applyLang("ar");
calculate();
calculateAllocation();
