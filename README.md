# Yixuan Liu — Portfolio

A responsive portfolio homepage based on Yixuan's original Figma cover concept. Built with HTML, CSS and JavaScript, ready for GitHub Pages.

Live website: https://yixuan021.github.io/Personal-portfolio/

The first project is First Nations Health Authority. Its 10-second muted loop demonstrates the supplied FNHA demo: typing Vancouver, selecting the city and a preference, searching, scrolling the directory, opening and closing provider details, scrolling back, and returning home. Actual browser captures are edited with a visible pointer and click indicators; matching opening and ending frames make the loop continuous. The cover opens `fnha.html`, an independent project case study. The case study links to the public prototype and the separate admin sign-in. A “See my project ↗” cursor follows the mouse over the cover; touch and keyboard users have a visible project link. The preview has a pause/play control, pauses off-screen, and starts paused when reduced motion is preferred.

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

## FNHA case study

`fnha.html`, `case-study.css` and `case-study.js` present the May–August 2026 project. Yixuan’s confirmed responsibilities are early UX research, mobile interface design and user test planning. The story distinguishes internal test findings from external feedback, and explored offline/SMS ideas from the final online platform and extra admin website. External participation is reported as 35+ people, including 3 First Nations participants, as confirmed by Yixuan.

Process images are in `assets/fnha-case/`. Editing links to source decks and internal boards are not included on the public page.

### Additional research evidence

The case study now includes the July 7 mobile task scenario (Prince George, Indigenous provider, current availability or a wait under one month, then save), co-planning responsibilities with Bam, and the expandable-map testing hypothesis. Overall participation (35+) is distinguished from the 33 complete questionnaires in the results analysis. Survey results are self-reported within a guided test, not a post-redesign or production comparison. The art/design research supports the new wireframe and design-foundations content; artwork is credited to the team with Andrea as art lead. Source PDFs and raw participant-level observations remain outside the public repository.
