# Yixuan Liu — Portfolio

A responsive portfolio homepage based on Yixuan's original Figma cover concept. Built with HTML, CSS and JavaScript, ready for GitHub Pages.

Live website: https://yixuan021.github.io/Personal-portfolio/

The first project is First Nations Health Authority. Its 15.5-second muted video cover uses captured screens of the supplied FNHA demo: search, preferences, the directory, and provider details. It links to https://trestle-fnha-web.vercel.app/. A “See my project ↗” cursor follows the mouse over the cover; touch and keyboard users have a visible project link. The preview has a pause/play control, pauses off-screen, and starts paused when reduced motion is preferred.

The board's charm, note and photo open accessible dialogs. Work returns to the homepage; Play and About open their respective content. Escape or a click outside closes dialogs.

## Preview

Run `python3 -m http.server 8000` in this folder and open http://localhost:8000.

## GitHub Pages

In the repository's **Settings → Pages**, choose **Deploy from a branch**, then **main** and **/ (root)**. The expected URL is https://yixuan021.github.io/Personal-portfolio/ once GitHub confirms deployment.

## Editing

- `index.html`: biography and board contents
- `style.css`: layout, colors and responsive behavior
- `script.js`: board interactions
- `assets/`: original Figma images and vector assets
- `assets/fnha-preview.mp4` and `assets/fnha-poster.webp`: project cover video and static fallback

The font is Montserrat, loaded from Google Fonts with a local Arial fallback. Images use relative paths so the site works under the repository URL. Project case studies can be added when their contents are ready.
