# Config-driven Portfolio Website

A fast, responsive, single-page portfolio (dark/light, animated, mobile friendly).
**You edit one file — `config.js` — and the whole page updates. No AI, no build tools, no coding needed.**

Live example: https://arperkata.github.io/tamilarasuArjunan/

---

## 1. Make it yours in 5 minutes

1. **Get the code**
   - On GitHub click **Fork** (top right) — or click **Code → Download ZIP** and unzip it.
2. **Open `config.js`** in any text editor (Notepad, VS Code…).
3. **Replace my details with yours.** Start from the blank starter if you prefer:
   open `config.template.js`, copy everything, paste it over `config.js`, then fill it in.
4. **Preview it:** double‑click `index.html` — it opens in your browser. Edit → save → refresh.
5. **Publish it for free** (see section 4).

### The editing rules (that's all you need to know)
| You see | Meaning |
|---|---|
| `"text in quotes"` | Text you can change. Keep the quotes. |
| `[ "a", "b", "c" ]` | A list. Add / remove items, separated by commas. |
| `{ ... }` | A group of settings. Keep the braces. |
| `enabled: false` | Hides that whole section. |
| `**word**` | **bold** inside any sentence. |
| `*word*` | coloured gradient highlight (used in headings). |
| `""` (empty quotes) | Turns that item off (e.g. an empty LinkedIn link is hidden). |

If the page turns blank or shows "could not load", you probably deleted a comma or quote.
Press **F12 → Console** — it tells you the line number in `config.js`.

---

## 2. What each part of `config.js` controls

| Block | What it changes |
|---|---|
| `site` | Browser-tab title, description, default dark/light mode, theme button, animated hero background |
| `theme` | **Colour palette** — choose a preset, or override single colours |
| `person` | Name, typing roles, location, summary, email, social links, **photo** |
| `sections` | Menu names, headings and sub‑headings; turn any section on/off |
| `stats` | The 3–4 big animated numbers under the hero |
| `marquee` | Scrolling strip of tools/technologies |
| `about` | Paragraphs, optional code card, side boxes (domains, education…) |
| `skills` | Filterable skill cards |
| `experience` | Job timeline (newest first) |
| `pipeline` | Optional interactive demo (set `enabled: false` to hide) |
| `impact` | Progress rings, comparison bars and big-number cards |
| `highlights` | Free cards for anything else (awards, open source, talks, AI work…) |
| `footer` | Footer text |

Don't have something? Delete that item — or set the section's `enabled: false`.
The page adapts: empty sections never show.

---

## 3. Colours

In `config.js`:

```js
theme: { preset: "goldSilver", overrides: {} },
```

Presets: **goldSilver · ocean · emerald · rose · sunset · graphite**

Tweak one colour without making a new palette:

```js
theme: {
  preset: "ocean",
  overrides: {
    dark:  { a: "#ff8a00" },   // main accent in dark mode
    light: { a: "#b45309" }    // main accent in light mode
  }
}
```

Want a brand‑new palette? Open `js/themes.js`, copy one block, rename it and change the
hex colours (`#rrggbb`). Then use its name in `preset`. Each palette has a `dark` and a `light` version.

---

## 4. Photo (optional)

```js
photo: { src: "assets/photo.jpg", alt: "Your Name", style: "rounded", caption: "Your title" },
```

1. Put your picture in the `assets` folder (e.g. `assets/photo.jpg`).
2. Set `src` to that path. **No photo? Set `src: ""`** — the page re‑lays itself out without one.
3. `style` options:
   - `"rounded"` — any normal photo, rounded with a gradient frame *(default, safest)*
   - `"circle"` — any normal photo, round
   - `"cutout"` — a **transparent PNG/WebP** (person only) standing on a coloured arch

Tip: use a portrait roughly 800 px wide, under 300 KB.

---

## 5. Publish it free with GitHub Pages

1. Create a GitHub account → **Fork** this repo (or create a new repo and upload all files).
2. In your repo: **Settings → Pages**.
3. **Source:** *Deploy from a branch* → **Branch:** `main` → **Folder:** `/ (root)` → **Save**.
4. After ~1–2 minutes your site is live at  
   `https://<your-github-username>.github.io/<repo-name>/`

To update later: edit `config.js` on GitHub (pencil icon) → **Commit changes** → refresh in a minute.

Other free hosts work too — Netlify, Vercel, Cloudflare Pages: just drag the folder in.

---

## 6. Project layout

```
index.html          page shell (you rarely need to touch this)
config.js           ★ YOUR CONTENT & SETTINGS — edit this
config.template.js  blank starter to copy into config.js
js/themes.js        colour palettes
js/app.js           builds the page from config.js
css/styles.css      look & feel (spacing, fonts, animations)
assets/             your photo and any images
```

## 7. Common questions

**Can I change the font?** Yes — in `css/styles.css` change the `font-family` on `body`.
**Can I add a section?** Use `highlights` for free‑form cards; most things fit there.
**Does it work offline / without internet?** Yes. It has no external libraries or fonts.
**Is my data sent anywhere?** No. It is a static page; everything stays in your files.
**Phone number?** Left out on purpose (public pages attract spam). Put it in `about.paragraphs` if you want it.
