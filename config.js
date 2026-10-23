/* ==========================================================================
   PORTFOLIO CONFIG  —  this is the ONLY file you need to edit.

   How to edit (no coding needed):
   • Change the text between the quotes  "like this".
   • Keep the commas, brackets [ ] and braces { } exactly where they are.
   • Lists look like  [ "one", "two", "three" ]  — add or remove items freely.
   • To hide a whole section set   enabled: false
   • In any text:  **word** = bold,   *word* = coloured (gradient) highlight.
   • Save the file and refresh index.html in your browser to see changes.

   If the page goes blank after an edit, you probably removed a comma or a
   quote. Press F12 → Console to see which line has the problem.
   ========================================================================== */

window.PORTFOLIO = {

  /* ---------- 1. SITE & COLOURS ---------- */
  site: {
    title: "Tamilarasu Arjunan — Test Automation Architect",   // browser tab title
    description: "Senior SDET & Test Automation Architect with 11+ years building API, UI and performance automation for enterprise payments platforms.",
    defaultTheme: "dark",        // "dark", "light" or "auto" (follow the visitor's device)
    showThemeToggle: true,       // show the sun/moon button
    showBackgroundNetwork: true, // animated dots-and-lines in the hero
  },

  theme: {
    // Pick a ready-made palette:
    //   "goldSilver" | "ocean" | "emerald" | "rose" | "sunset" | "graphite"
    // (see js/themes.js to see or add palettes)
    preset: "goldSilver",

    // Optional: override single colours of the preset. Leave {} to keep the preset.
    // Colours you can change: bg, bg2, text, muted, a, b, c, g1, g2, g3, on
    //   a = main accent   g1/g2/g3 = the 3 colours of the gradient   on = text colour on buttons
    // Example:  overrides: { dark: { a: "#ff8a00" }, light: { a: "#b45309" } }
    overrides: {},
  },

  /* ---------- 2. YOU ---------- */
  person: {
    name: "Tamilarasu Arjunan",
    rolePrefix: "Senior SDET &",           // fixed text before the typing animation
    roles: [                                // these are typed one after another
      "Test Automation Architect",
      "Performance Test Engineer",
      "CI/CD Quality Gatekeeper",
      "Gen AI-powered QE Engineer",
    ],
    location: "Chennai, India",
    availability: "Open to opportunities",  // "" hides the green badge text
    summary: "11+ years designing API, UI and performance automation frameworks and CI/CD quality gates for enterprise payments platforms — now accelerating it all with Gen AI.",

    email: "arperkata.arasu@gmail.com",
    // Leave a link as "" to hide it. Add as many as you like from:
    // linkedin, github, x, website
    social: {
      linkedin: "https://www.linkedin.com/in/arperkata",
      github: "https://github.com/arperkata",
      x: "",
      website: "",
    },

    // PHOTO IS OPTIONAL. Leave src as "" and the page simply has no picture.
    //  style: "cutout"  → transparent PNG/WebP (person only), shown on a coloured arch
    //         "rounded" → any normal photo, rounded corners with a gradient frame
    //         "circle"  → any normal photo, round
    photo: {
      src: "assets/photo.webp",
      alt: "Portrait of Tamilarasu Arjunan",
      style: "cutout",
      caption: "Senior Staff Engineer · QE",   // small label under the photo ("" to hide)
    },
  },

  /* ---------- 3. SECTIONS ----------
     Each section: enabled, nav (menu label), eyebrow (small text), title, subtitle.
     In titles, *word* gets the gradient colour.                                  */
  sections: {
    about:      { enabled: true, nav: "About",      eyebrow: "About",   title: "Building quality into *every release*", subtitle: "Hands-on architect who writes the framework, wires it into the pipeline and mentors the team that uses it." },
    skills:     { enabled: true, nav: "Skills",     eyebrow: "Toolbox", title: "Technical *skills*",                    subtitle: "Search or filter by category to explore the stack." },
    experience: { enabled: true, nav: "Experience", eyebrow: "Career",  title: "Professional *experience*",             subtitle: "From manual testing to architecting automation for global payments platforms." },
    pipeline:   { enabled: true, nav: "Demo",       eyebrow: "Interactive demo", title: "Quality gate *pipeline*",      subtitle: "A simplified view of the CI/CD flow I build: parallel API and UI suites, then a MAT go/rollback signal. Hit run to watch it." },
    impact:     { enabled: true, nav: "Impact",     eyebrow: "Results", title: "Key *achievements*",                    subtitle: "Measurable outcomes from automation and quality gates." },
    highlights: { enabled: true, nav: "AI & QE",    eyebrow: "Future of testing", title: "AI & Gen AI in *Quality Engineering*", subtitle: "AI accelerates the work; human review against API behaviour, business rules and schemas keeps it trustworthy." },
    contact:    { enabled: true, nav: "Contact",    eyebrow: "Contact", title: "Let's build *quality* together",        subtitle: "Looking for a test automation architect or a hands-on SDET lead? I'd love to hear from you." },
  },

  /* ---------- 4. BIG NUMBERS (under the hero) ---------- */
  stats: [
    { value: 1600, suffix: "+", label: "API endpoints automated" },
    { value: 700,  suffix: "+", label: "Playwright E2E use cases" },
    { value: 85,   suffix: "%", label: "UI automation coverage" },
    { value: 11,   suffix: "+", label: "Years of experience" },
  ],

  /* ---------- 5. SCROLLING TOOL STRIP ---------- */
  marquee: {
    enabled: true,
    label: "Tools I work with",
    items: ["Karate", "Playwright", "Selenium", "Cypress", "WebDriverIO", "Gatling", "JMeter", "Postman", "GitLab CI/CD", "Argo CD", "Docker", "Kubernetes", "Jenkins", "GitHub Actions", "Java", "TypeScript", "WireMock", "Mockoon", "Jira / Xray", "GitHub Copilot", "Playwright MCP", "GCP"],
  },

  /* ---------- 6. ABOUT ---------- */
  about: {
    paragraphs: [
      "I'm a **Senior Staff Engineer – Quality Engineering at Altimetrik**, working on Ingenico's **I360** payments platform across EMEA, APAC and NAR.",
      "I design **Karate API** and **Playwright** frameworks, performance suites with **Gatling & JMeter**, and **GitLab CI/CD + Argo CD** quality gates that give fast, evidence-backed go/rollback signals.",
      "I apply **Gen AI** (GitHub Copilot, Playwright MCP, Claude) to speed up test generation — always with human review — and I contribute actively to every Agile/Scrum ceremony.",
    ],
    // Small "code card" under the paragraphs. Set enabled:false to remove it.
    codeCard: {
      enabled: true,
      fileName: "quality.config.ts",
      variable: "engineer",
      lines: [
        { key: "name",       value: "Tamilarasu Arjunan" },
        { key: "role",       value: "Test Automation Architect" },
        { key: "experience", value: "11+ years" },
        { key: "api",        value: ["Karate", "Postman"] },
        { key: "ui",         value: ["Playwright", "Selenium"] },
        { key: "perf",       value: ["Gatling", "JMeter"] },
        { key: "ci",         value: ["GitLab", "Argo CD"] },
        { key: "ai",         value: true },
      ],
    },
    // Side boxes. Use "chips" for a list of small tags, or "text" for a sentence.
    panels: [
      { icon: "🏦", title: "Domain expertise", chips: ["Digital Payments", "FinTech", "Banking", "Settlement & Batch", "HRMS / HCM", "CRM", "Automotive", "Healthcare", "E-Governance", "Casino & Gaming"] },
      { icon: "🎓", title: "Education",        text: "Bachelor of Technology — Information Technology" },
    ],
  },

  /* ---------- 7. SKILLS ----------
     category = a filter tab.  groups = cards inside it.  items = the tags. */
  skills: [
    { category: "AI-Assisted", groups: [
      { title: "GenAI tooling", items: ["GitHub Copilot", "ChatGPT", "Claude", "Prompt engineering"] },
      { title: "MCP",           items: ["Playwright MCP", "MCP tool-call validation"] },
    ]},
    { category: "Automation", groups: [
      { title: "API",        items: ["Karate", "Postman", "Newman", "REST"] },
      { title: "UI & E2E",   items: ["Playwright", "Selenium", "Cypress", "WebDriverIO", "Cucumber BDD"] },
      { title: "Frameworks", items: ["TestNG", "JUnit", "Mocha", "Framework design"] },
    ]},
    { category: "Languages", groups: [
      { title: "Core",              items: ["Java", "TypeScript", "JavaScript", "SQL", "Shell", "JSON", "XML"] },
      { title: "Working knowledge", items: ["Python"] },
    ]},
    { category: "Performance", groups: [
      { title: "Tools", items: ["Gatling", "JMeter", "Load & stress", "CPU/memory analysis"] },
    ]},
    { category: "DevOps & Cloud", groups: [
      { title: "CI/CD",              items: ["GitLab CI/CD", "Jenkins", "GitHub Actions", "Argo CD", "Maven"] },
      { title: "Containers & Cloud", items: ["Docker", "Kubernetes", "GCP VMs"] },
    ]},
    { category: "QE Practice", groups: [
      { title: "Strategy", items: ["Shift-left", "Test strategy", "MAT / release gates", "Root-cause analysis", "Test data mgmt"] },
      { title: "Tooling",  items: ["Jira", "Xray", "Rally", "TestLens", "WireMock", "Mockoon"] },
      { title: "Process",  items: ["Agile", "Scrum", "SDLC", "STLC"] },
    ]},
  ],

  /* ---------- 8. EXPERIENCE (newest first) ----------
     current: true  → highlights the dot.
     blocks: each has an optional heading and a list of bullet points.
     collapseAfter: 1 → only the first block is shown, the rest sit behind a "Show more" button.
     (set to 0 or remove it to show everything)                                                   */
  experience: [
    {
      role: "Senior Staff Engineer — Quality Engineering",
      company: "Altimetrik",
      period: "Jul 2021 — Present",
      current: true,
      collapseAfter: 1,
      moreLabel: "Show PayPal & more",
      blocks: [
        { heading: "Client · Ingenico — I360, Digital Receipt, Device Management, HMS", bullets: [
          "Architected a reusable **Karate API framework (1,600+ endpoints)** across four I360 products with shared auth/token management, environment config, tagging and centralized test data.",
          "Integrated API & UI automation into **GitLab CI/CD and Argo CD (Kubernetes)** with Docker test images, tag-based and parallel execution, scheduled suites and JUnit XML publishing to Jira/Xray.",
          "Designed **Minimal Acceptance Tests (MAT)** for post-deployment production validation — fast go/rollback signals separating app failures from framework, data and infra issues.",
          "Delivered performance testing with **Gatling, JMeter and Karate**: POS terminal emulator on GCP VMs, API performance validation, CPU/memory bottleneck monitoring.",
          "Validated OAuth/token lifecycle, tenant isolation, permissions and negative scenarios, including **Salesforce integration** for HMS.",
          "Built **700+ E2E use cases (~85% UI coverage)** in Playwright + TypeScript; 100 Karate scenarios in ~5 min and 100 Playwright scenarios in ~15 min via parallel runs on Argo CD.",
          "Co-created **TestLens**, a browser extension bridging the browser and Jira workflows.",
          "Virtualized unstable dependencies with **WireMock and Mockoon**.",
        ]},
        { heading: "Client · PayPal — Japan, Singapore & Hong Kong", bullets: [
          "Automated **e-KYC** (Selenium + Bluefin-TestNG) and **e-KYB** (WebDriverIO + Mocha) for PayPal Japan.",
          "Automated Apple Pay and Google Pay enablement validation for unbranded flows across JP, SG and HK.",
        ]},
        { heading: "Across both engagements", bullets: [
          "Active in all Agile/Scrum ceremonies; mentored QA engineers; troubleshot complex CI/CD, container, JVM and environment failures; supported emergency production releases.",
        ]},
      ],
    },
    { role: "Professional 1 — Application Delivery", company: "DXC Technology · Client: Ford Motors", period: "Aug 2019 — Jul 2021",
      blocks: [{ bullets: ["Built and maintained a **Selenium WebDriver + BDD-Cucumber** framework for the CAF Report application (MEA & EU), running regression and smoke suites in Agile teams."] }] },
    { role: "QA Engineer", company: "ADP India", period: "Apr 2019 — Aug 2019",
      blocks: [{ bullets: ["Functional and regression testing and defect management for ADP's in-house HRM product."] }] },
    { role: "Test Engineer", company: "Sify Technologies", period: "Aug 2017 — Mar 2019",
      blocks: [{ bullets: ["Built a **Selenium hybrid framework** for FORUM NXT (GSK, Everyday) and tested government online-exam registration portals."] }] },
    { role: "Software Test Engineer", company: "ReDim Information Systems", period: "Apr 2015 — Aug 2017",
      blocks: [{ bullets: ["Automated the Bounce Forms (healthcare) Windows app with Selenium + Winium; tested online casino games (Roulette, Blackjack, slots) on Android and iOS."] }] },
  ],

  /* ---------- 9. INTERACTIVE PIPELINE DEMO (optional, fun) ---------- */
  pipeline: {
    stages: [
      { name: "Build",          detail: "Docker test image" },
      { name: "Karate API",     detail: "100 scenarios · ~5 min" },
      { name: "Playwright E2E", detail: "100 scenarios · ~15 min" },
      { name: "Report",         detail: "JUnit XML → Jira/Xray" },
      { name: "MAT",            detail: "Post-deploy check" },
    ],
    failAtStage: 3,                              // which stage fails in "Simulate a failure" (1 = first)
    passText: "✓ All gates passed — GO",
    failText: "✗ E2E failed — rollback signal raised",
  },

  /* ---------- 10. IMPACT / RESULTS ---------- */
  impact: {
    rings: [                                     // animated circles, value = 0-100
      { value: 95, label: "public API endpoints covered in end-to-end use cases" },
      { value: 85, label: "UI automation coverage of critical workflows" },
    ],
    bars: {                                      // comparison bars, percent = 0-100 (relative length)
      title: "⚡ Parallel runs on Argo CD",
      rows: [
        { label: "100 Karate API scenarios",    display: "~5 min",  percent: 33 },
        { label: "100 Playwright E2E scenarios", display: "~15 min", percent: 100 },
      ],
      note: "Bars are scaled relative to the longer run.",
    },
    cards: [                                     // big-number cards
      { big: "1,600+",  text: "Karate API endpoints, with ~95% of public endpoints covered in end-to-end use cases across services, environments and auth flows." },
      { big: "700+",    text: "Playwright + TypeScript business use cases, achieving ~85% UI coverage of critical workflows." },
      { big: "5 min",   text: "100 Karate scenarios in ~5 min and 100 Playwright E2E in ~15 min through parallel execution on Argo CD." },
      { big: "MAT",     text: "Automated Minimal Acceptance Tests and production smoke tests as a rapid go/rollback gate." },
      { big: "100→500", text: "~100 concurrent POS terminals simulated on GCP VMs, with scalability analysis toward 500." },
    ],
  },

  /* ---------- 11. HIGHLIGHT CARDS (free-form: AI, open source, awards, anything) ---------- */
  highlights: [
    { icon: "🤖", title: "Gen AI-assisted automation", text: "Copilot, ChatGPT and Claude generate API/UI scenarios, improve coverage and analyse failures from structured prompts and specs." },
    { icon: "🎭", title: "Playwright + MCP",           text: "AI-assisted browser exploration to understand flows, find locators and troubleshoot tests faster." },
    { icon: "🥋", title: "Context-driven Karate",      text: "Feeding Copilot framework context — auth features, env config, tagging — for framework-consistent scenarios." },
    { icon: "🔌", title: "MCP testing",                text: "Validating MCP tool integrations: invocation, input parameters, response schema and expected behaviour." },
  ],

  /* ---------- 12. FOOTER ---------- */
  footer: { text: "Tamilarasu Arjunan · Chennai, India" },
};
