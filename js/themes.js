/* ==========================================================================
   COLOUR PALETTES
   Each palette has a "dark" and a "light" version.
   bg / bg2 = page and alternate-section backgrounds
   text / muted = main and secondary text
   a = main accent (links, small headings)   b, c = extra accents
   g1, g2, g3 = the three colours of the gradient (buttons, headings, rings)
   on = text colour placed on top of the gradient (buttons)

   To add your own: copy a block, give it a new name, change the colours,
   then set  theme.preset: "yourName"  in config.js.
   ========================================================================== */
window.THEMES = {

  goldSilver: {
    dark:  { bg: "#0c0d11", bg2: "#13151b", text: "#eef0f4", muted: "#a3a8b5", a: "#e6c46d", b: "#c9a24a", c: "#c3c8d2", g1: "#e9c96f", g2: "#f7ebc2", g3: "#b9bec9", on: "#17130a" },
    light: { bg: "#f8f6f1", bg2: "#ffffff", text: "#1a1b20", muted: "#5d606c", a: "#8a6a12", b: "#a47f1c", c: "#6c727f", g1: "#b88a22", g2: "#d9b648", g3: "#8a909c", on: "#17130a" },
  },

  ocean: {
    dark:  { bg: "#0b1020", bg2: "#111833", text: "#e8ecf8", muted: "#9aa5c4", a: "#6ee7f9", b: "#a78bfa", c: "#f472b6", g1: "#6ee7f9", g2: "#a78bfa", g3: "#f472b6", on: "#0b1020" },
    light: { bg: "#f6f7fb", bg2: "#ffffff", text: "#14183a", muted: "#5a6384", a: "#0e7490", b: "#6d28d9", c: "#be185d", g1: "#0891b2", g2: "#7c3aed", g3: "#db2777", on: "#ffffff" },
  },

  emerald: {
    dark:  { bg: "#07110d", bg2: "#0d1b15", text: "#e9f5ee", muted: "#9bb3a5", a: "#5eead4", b: "#34d399", c: "#bef264", g1: "#34d399", g2: "#5eead4", g3: "#bef264", on: "#04130c" },
    light: { bg: "#f3f9f5", bg2: "#ffffff", text: "#10241a", muted: "#506559", a: "#047857", b: "#0f766e", c: "#4d7c0f", g1: "#059669", g2: "#14b8a6", g3: "#65a30d", on: "#ffffff" },
  },

  rose: {
    dark:  { bg: "#140a10", bg2: "#1d1017", text: "#fbeef3", muted: "#b8a0aa", a: "#fda4af", b: "#f472b6", c: "#fcd34d", g1: "#fb7185", g2: "#f9a8d4", g3: "#fcd34d", on: "#2a0a14" },
    light: { bg: "#fdf5f7", bg2: "#ffffff", text: "#2a1018", muted: "#6b4b57", a: "#be123c", b: "#be185d", c: "#b45309", g1: "#e11d48", g2: "#ec4899", g3: "#d97706", on: "#ffffff" },
  },

  sunset: {
    dark:  { bg: "#120c08", bg2: "#1b130d", text: "#fdf1e6", muted: "#b9a592", a: "#fdba74", b: "#fb923c", c: "#fca5a5", g1: "#fb923c", g2: "#fcd34d", g3: "#f87171", on: "#1f0f03" },
    light: { bg: "#fff8f1", bg2: "#ffffff", text: "#2b1608", muted: "#6e5440", a: "#c2410c", b: "#b45309", c: "#b91c1c", g1: "#ea580c", g2: "#f59e0b", g3: "#dc2626", on: "#ffffff" },
  },

  graphite: {
    dark:  { bg: "#0e0e10", bg2: "#161618", text: "#f2f2f3", muted: "#a0a0a8", a: "#e5e5ea", b: "#c7c7cf", c: "#9a9aa5", g1: "#ffffff", g2: "#d4d4dc", g3: "#8e8e99", on: "#0e0e10" },
    light: { bg: "#f5f5f6", bg2: "#ffffff", text: "#151517", muted: "#5b5b64", a: "#26262b", b: "#3f3f46", c: "#71717a", g1: "#18181b", g2: "#52525b", g3: "#a1a1aa", on: "#ffffff" },
  },
};
