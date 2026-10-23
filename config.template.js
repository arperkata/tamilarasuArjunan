/* ==========================================================================
   BLANK STARTER — copy everything in this file into config.js
   (replace the old content), then fill in your own details.
   Full explanations of every option are in config.js — keep it open for help.
   Tip: "**word**" = bold, "*word*" = coloured highlight.  Photo is optional.
   ========================================================================== */
window.PORTFOLIO = {

  site: {
    title: "Your Name — Your Job Title",
    description: "One sentence about what you do.",
    defaultTheme: "dark",          // "dark" | "light" | "auto"
    showThemeToggle: true,
    showBackgroundNetwork: true,
  },

  // presets: goldSilver | ocean | emerald | rose | sunset | graphite
  theme: { preset: "ocean", overrides: {} },

  person: {
    name: "Your Name",
    rolePrefix: "Senior Engineer &",
    roles: ["Your first role", "Your second role", "Your third role"],
    location: "City, Country",
    availability: "Open to opportunities",
    summary: "Two sentences about you: years of experience, what you build, what you care about.",
    email: "you@example.com",
    social: { linkedin: "https://www.linkedin.com/in/your-handle", github: "https://github.com/your-handle", x: "", website: "" },
    // Photo is optional: set src to "" for no photo.
    // style: "rounded" (normal photo) | "circle" | "cutout" (transparent PNG/WebP)
    photo: { src: "", alt: "Your Name", style: "rounded", caption: "Your title · Company" },
  },

  sections: {
    about:      { enabled: true, nav: "About",      eyebrow: "About",   title: "A short *headline* about you", subtitle: "One line that sums up how you work." },
    skills:     { enabled: true, nav: "Skills",     eyebrow: "Toolbox", title: "Technical *skills*",            subtitle: "Search or filter by category." },
    experience: { enabled: true, nav: "Experience", eyebrow: "Career",  title: "Professional *experience*",     subtitle: "Where I have worked." },
    pipeline:   { enabled: false, nav: "Demo",      eyebrow: "Interactive demo", title: "My *workflow*",         subtitle: "Optional animated demo — delete or keep disabled." },
    impact:     { enabled: true, nav: "Impact",     eyebrow: "Results", title: "Key *achievements*",            subtitle: "Numbers that show your impact." },
    highlights: { enabled: false, nav: "Highlights", eyebrow: "More",    title: "Other *highlights*",            subtitle: "Awards, open source, talks, anything else." },
    contact:    { enabled: true, nav: "Contact",    eyebrow: "Contact", title: "Let's *connect*",               subtitle: "I'd love to hear from you." },
  },

  stats: [
    { value: 5,  suffix: "+", label: "Years of experience" },
    { value: 20, suffix: "+", label: "Projects delivered" },
    { value: 3,  suffix: "",  label: "Certifications" },
  ],

  marquee: { enabled: true, label: "Tools I work with", items: ["Tool one", "Tool two", "Tool three", "Tool four"] },

  about: {
    paragraphs: ["Paragraph one about you. Use **bold** for key words.", "Paragraph two."],
    codeCard: { enabled: false, fileName: "profile.ts", variable: "me", lines: [{ key: "name", value: "Your Name" }, { key: "skills", value: ["One", "Two"] }] },
    panels: [
      { icon: "🏦", title: "Domains", chips: ["Domain one", "Domain two"] },
      { icon: "🎓", title: "Education", text: "Degree — University" },
    ],
  },

  skills: [
    { category: "Languages", groups: [{ title: "Core", items: ["Skill one", "Skill two"] }] },
    { category: "Tools",     groups: [{ title: "Daily tools", items: ["Tool one", "Tool two"] }] },
  ],

  experience: [
    { role: "Your current role", company: "Company", period: "Jan 2022 — Present", current: true,
      blocks: [{ heading: "", bullets: ["Achievement with a **number** if possible.", "Another achievement."] }] },
    { role: "Previous role", company: "Previous company", period: "2019 — 2021",
      blocks: [{ bullets: ["What you did."] }] },
  ],

  pipeline: { stages: [{ name: "Step 1", detail: "Detail" }, { name: "Step 2", detail: "Detail" }], failAtStage: 2, passText: "✓ Done", failText: "✗ Failed" },

  impact: {
    rings: [{ value: 90, label: "What this percentage means" }],
    bars: null,
    cards: [{ big: "10x", text: "What improved and how." }, { big: "50%", text: "Another result." }],
  },

  highlights: [{ icon: "⭐", title: "Highlight", text: "Short description." }],

  footer: { text: "Your Name" },
};
