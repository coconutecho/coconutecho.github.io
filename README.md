# Wenyi Xu — Portfolio

Live site: [coconutecho.github.io](https://coconutecho.github.io)

Personal portfolio of **Wenyi Xu**, a Psychology Ph.D. student at USC (quantitative methods and computational psychology) working on machine learning. Static site on GitHub Pages with a light/dark theme. The design follows [wyc79.github.io](https://wyc79.github.io).

## What's here

| Area | Description |
|------|-------------|
| **Landing** (`index.html`) | P3-style menu into About, Experience, Research, Skills, Education and LinkedIn, with a small real-time stone that follows the selection |
| **About** | Headshot, short bio, quick facts and contact |
| **Experience** | Epsilon (ML engineering), USC graduate research, USC Career Center (data science) |
| **Research** | Project cards; each links to a detail page (currently the partial-Bayesian chest X-ray study) |
| **Skills / Education** | From the résumé |

## Stack

- Static **HTML / CSS / vanilla JS**, no build step
- `scripts/page-header.js` — shared masthead (brand, section index, contact links, theme toggle); edit `SECTIONS` there to add a page
- `scripts/p3-menu.js` — landing menu; edit `ITEMS` there (and the matching pose in `scripts/p3-object.js` `STATES`)
- `scripts/stone-renderer.js`, `scripts/p3-object.js` — the WebGL stone on the landing page
- `scripts/project-hero.js` — back link and sticky bar on project detail pages
- `scripts/theme.js` — light/dark toggle
- The accent colour is one token, `--accent` in `styles.css`; the stone's orbit reads it too. The landing-menu wedge colours (`.p3-hero-*`, `.p3-label`) are set separately near the end of `styles.css`.

## Preview locally

```bash
python -m http.server 8000
```

Open `http://localhost:8000`.

## Adding a research project

1. Copy `pages/bayesian-chest-xray.html` as a template for the detail page.
2. Add a `project-card` to `pages/research.html` (`project-card--2x2` for a large entry).
3. Put images in `images/`, with a `_thumbnail` version for the card.

## Not wired yet

- **Ask AI chat.** The landing stone is kept as the future launcher. To add the chat later, bring over `scripts/chat-widget.js` and the `chat/` backend from wyc79.github.io, give the stone back its `ASK AI` label and `data-ycchat-launcher` attribute in `index.html`, and load `stone-renderer.js` + `chat-widget.js` on the inner pages.
- **Chinese.** The site is English only. The reference site's `scripts/i18n.js` handles EN/中文 if it is needed later.

## License

Code: [MIT](LICENSE). Inter font: [SIL OFL](fonts/Inter-OFL.txt). Text and images © Wenyi Xu, except the chest X-ray image, which is from Kermany (2018), *Labeled Optical Coherence Tomography (OCT) and Chest X-Ray Images for Classification*, Mendeley Data.
