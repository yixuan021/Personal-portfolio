# Yixuan Liu — Portfolio

A responsive portfolio homepage based on Yixuan's original Figma cover concept. Built with HTML, CSS and JavaScript, ready for GitHub Pages.

Live website: https://yixuan021.github.io/Personal-portfolio/

The first project is First Nations Health Authority. Its 10-second muted loop demonstrates the supplied FNHA demo: typing Vancouver, selecting the city and a preference, searching, scrolling the directory, opening and closing provider details, scrolling back, and returning home. Actual browser captures are edited with a visible pointer and click indicators; matching opening and ending frames make the loop continuous. The cover opens `fnha.html`, an independent project case study. The case study links to the public prototype and the separate admin sign-in. A “See my project ↗” cursor follows the mouse over the cover; touch and keyboard users have a visible project link. The preview has a pause/play control, pauses off-screen, and starts paused when reduced motion is preferred.

The shared pink capsule navigation contains Works, Fun, About and Resume. The Yixuan Liu wordmark returns to the homepage. Works opens a project dropdown with direct case-study links and a link to all work. Hover uses pale pink; the current page stays selected in rose pink. The menu supports touch, keyboard, Escape and outside-click dismissal. Fun and About have separate pages. Resume opens the linked Google Drive PDF in a new tab. The board's charm, note and photo still open accessible dialogs. Escape or a click outside closes dialogs.

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

## ELEVARE Connect case study

The second homepage card links to `elevare.html`, covering Project 1C in November–December 2025. The case study shares FNHA’s nine-section structure, typography, dimensions, responsive rules, image viewer, section navigation, and video controls. `elevare.css` supplies a blue palette without changing the shared geometry.

The case study highlights Yixuan’s documented onboarding, learning progress, feedback UI, personas, UI breakdowns, user flows, technical research, and AI Bot interview contributions. Only the High Fidelity Onboarding and Playtest pages are displayed from Figma. Team implementation and individual contributions are distinguished. Fictional scenario percentages are not reported as measured product outcomes.

`assets/elevare-preview.mp4` is a silent 10-second looping montage made from original high-fidelity Onboarding exports and the Playtest summary. Its opening and closing compositions match. It is an interface presentation, not a recording of a live AI conversation. `assets/elevare-poster.webp` is the static fallback; `assets/elevare-case/` contains optimised interface and process images. Both homepage previews have independent controls, pause off-screen, and respect reduced motion.

Sources are limited to Google Docs tabs marked [EXPORT], the supplied presentation, Figma design pages, and the four supplied process photos. Private source documents and raw interview records are not included in the public assets.

The four process photographs use compact, cropped previews (600px maximum width on desktop). Clicking opens the full uncropped image in the shared image viewer.

The AI Bot TDD confirms a developed Unity 2023.2.20 Windows desktop prototype at 1280×720, with free-text input, Google Apps Script/JSON communication with Gemini 2.0 Flash, live replies, and end-of-conversation feedback. The case study prominently connects this implementation to the High Fidelity Playtest interaction flow, while identifying the Figma screens as mobile-format interface designs. The separate narrative browser prototype uses authored dialogue and Firebase two-player synchronisation; it does not generate dialogue live. The source TDDs remain outside the public repository.

The Team field identifies Project 1C as a CDM project. The personal narrative foregrounds Yixuan’s documented UI contributions, personas and flows, and AI Bot interviews. The reflection section connects these artifacts with transferable product design strengths and grounded lessons, without attributing the Unity engineering or shared design system to Yixuan.


## GroundLink — local addition

The third homepage card opens `groundlink.html`. The case study shares the existing nine-section layout, navigation, image viewer, responsive rules and video controls. `legacy-cases.css` supplies restrained green accents. Every Works dropdown links to GroundLink.

GroundLink plays its complete original project video on the homepage and in the case-study hero: `assets/groundlink-original-video.mp4` (4:56.92), with its extracted poster. The hero has no phone overlay. The original source is YouTube video `Mtt5_goxfVw`. Playback is muted, loops, pauses off-screen, respects reduced motion and has independent pause controls.

The final interactive Figma mockup is linked near the top of the case study, both in the project header and directly below the introduction. It opens the original final-prototype starting frame in a new tab. The delivery section also retains the prototype and original video links.

Content is adapted from Yixuan’s original Framer case study. It highlights persona writing, grey-box wireframes, copy, Figma styles, video editing and communication, while distinguishing individual contributions from team outputs. The original account reports three prototype test participants.

The selected portfolio contains FNHA, ELEVARE Connect and GroundLink. Removed project files are retained only in the ignored local work folder. Updates are published from the `main` branch through GitHub Pages.


## Fun — creative gallery

`fun.html`, `fun.css`, and `fun.js` replace the temporary introduction with a four-project creative gallery inspired by the referenced Rebecca Yang Playground layout, while keeping the portfolio’s typography, pink palette, navigation, and footer. The introduction retains only “A little room to play.” and its subtitle. The pink dog, long introductory copy, and back-to-home action are removed from this page.

Original assets come from Yixuan’s Framer Playground. Pavilion in the Park has a muted inline preview and a full 31-second project film with audio controls in the viewer, plus the original Figma slide-deck link. Spirited Away Bathhouse opens a two-photo carousel. Reimagined Gallery replaces the kitchen render with a 22-second silent source-footage preview and the complete original virtual-gallery film (`O92a-MQosUc`) in the viewer. Its subtitle is “Step inside the artwork, beyond the frame.” The six graphic designs are grouped as one “Graphic explorations” entry, with one cover on the gallery and all six available in a swipeable viewer. The old font/album category labels are omitted. Each entry has a title and a short description; the pavilion viewer also preserves Yixuan’s modelling, mockup, and writing contribution.

The native dialog supports Escape, backdrop dismissal, focus restoration, previous/next controls, slide dots, arrow keys and horizontal scrolling with scroll snap. Inline video pauses when off-screen, when the tab is hidden, or while the viewer is open. Closing the viewer stops its film; reduced motion starts previews paused. Desktop and narrow-screen layouts, all six graphic slides, navigation, media loading, and playback controls have been checked locally. The gallery and shared page fade-in are published with the portfolio through GitHub Pages.
