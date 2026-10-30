const caseVideo = document.querySelector('[data-case-video]');
const videoToggle = document.querySelector('.case-video-toggle');
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
let userPaused = motionPreference.matches;
let heroVisible = false;
let videoAttempt = 0;
caseVideo.muted = true;
function updateToggle() { videoToggle.textContent = caseVideo.paused ? 'Play preview' : 'Pause preview'; }
async function syncCaseVideo() {
  const attempt = ++videoAttempt;
  if (userPaused || !heroVisible || document.hidden) { caseVideo.pause(); return; }
  try {
    await caseVideo.play();
    if (attempt !== videoAttempt && (userPaused || !heroVisible || document.hidden)) caseVideo.pause();
  } catch { updateToggle(); }
}
videoToggle.hidden = false;
videoToggle.addEventListener('click', () => { userPaused = !caseVideo.paused; syncCaseVideo(); });
caseVideo.addEventListener('play', updateToggle);
caseVideo.addEventListener('pause', updateToggle);
caseVideo.addEventListener('error', () => { videoToggle.hidden = true; });
new IntersectionObserver(entries => { heroVisible = entries[0].isIntersecting; syncCaseVideo(); }, {threshold:0.1}).observe(caseVideo);
document.addEventListener('visibilitychange', syncCaseVideo);
motionPreference.addEventListener('change', () => { userPaused = motionPreference.matches; syncCaseVideo(); });

const imageDialog = document.querySelector('.image-dialog');
const dialogImage = imageDialog.querySelector('img');
const dialogBody = imageDialog.querySelector('.image-dialog-body');
const scaleToggle = imageDialog.querySelector('.image-scale-toggle');
document.querySelectorAll('[data-zoom]').forEach(button => {
  button.addEventListener('click', () => {
    const thumbnail = button.querySelector('img');
    dialogImage.src = button.dataset.zoom;
    dialogImage.alt = thumbnail.alt;
    dialogBody.classList.remove('zoomed');
    scaleToggle.textContent = 'Zoom to full size';
    scaleToggle.setAttribute('aria-pressed','false');
    imageDialog.showModal();
    dialogBody.scrollTop = 0;
    dialogBody.scrollLeft = 0;
    document.body.style.overflow = 'hidden';
  });
});
imageDialog.querySelector('.image-dialog-close').addEventListener('click', () => imageDialog.close());
scaleToggle.addEventListener('click', () => {
  const zoomed = dialogBody.classList.toggle('zoomed');
  scaleToggle.textContent = zoomed ? 'Fit image' : 'Zoom to full size';
  scaleToggle.setAttribute('aria-pressed',String(zoomed));
});
imageDialog.addEventListener('click', event => {
  const b = imageDialog.getBoundingClientRect();
  if (event.clientX < b.left || event.clientX > b.right || event.clientY < b.top || event.clientY > b.bottom) imageDialog.close();
});
imageDialog.addEventListener('close', () => { document.body.style.overflow = ''; });
const sectionLinks = Array.from(document.querySelectorAll('.case-contents a'));
const sections = Array.from(document.querySelectorAll('.story-section'));
let scrollPending = false;
function updateSection() {
  scrollPending = false;
  let current = sections[0];
  const sectionTop = document.querySelector('.site-header').getBoundingClientRect().bottom + 25;
  for (const section of sections) { if (section.getBoundingClientRect().top <= sectionTop) current = section; }
  for (const link of sectionLinks) {
    if (link.hash === '#' + current.id) link.setAttribute('aria-current','location');
    else link.removeAttribute('aria-current');
  }
}
window.addEventListener('scroll', () => { if (!scrollPending) { scrollPending = true; requestAnimationFrame(updateSection); } }, {passive:true});
updateSection();
