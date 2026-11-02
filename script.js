// A native link remains usable without JavaScript, by touch, and by keyboard.
const projectCovers = document.querySelectorAll('.project-cover');
const projectCursor = document.querySelector('.project-cursor');
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
const hideProjectCursor = () => {
  projectCursor.classList.remove('visible');
  projectCovers.forEach(cover => cover.classList.remove('has-project-cursor'));
};
projectCovers.forEach(projectCover => {
  projectCover.addEventListener('pointermove', event => {
    if (!finePointer.matches || event.pointerType === 'touch') return;
    const x = Math.max(8, Math.min(event.clientX + 16, window.innerWidth - projectCursor.offsetWidth - 8));
    const y = Math.max(8, Math.min(event.clientY + 16, window.innerHeight - projectCursor.offsetHeight - 8));
    projectCursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    projectCursor.classList.add('visible');
    projectCover.classList.add('has-project-cursor');
  });
  projectCover.addEventListener('pointerleave', hideProjectCursor);
  projectCover.addEventListener('pointercancel', hideProjectCursor);
  projectCover.addEventListener('click', hideProjectCursor);
});
window.addEventListener('scroll', hideProjectCursor, { passive: true });
window.addEventListener('blur', hideProjectCursor);
document.addEventListener('keydown', event => {
  if (event.key === 'Tab') hideProjectCursor();
});
finePointer.addEventListener('change', hideProjectCursor);

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
document.querySelectorAll('[data-project-video]').forEach(projectVideo => {
  const previewToggle = projectVideo.closest('.project-media').querySelector('.preview-toggle');
  let previewPaused = reducedMotion.matches;
  let previewVisible = false;
  let playAttempt = 0;
  projectVideo.muted = true;
  const updatePreviewButton = () => {
    const paused = projectVideo.paused;
    previewToggle.setAttribute('aria-label', paused ? 'Play project preview' : 'Pause project preview');
    previewToggle.querySelector('.preview-toggle-icon').textContent = paused ? '▶' : 'Ⅱ';
    previewToggle.querySelector('.preview-toggle-label').textContent = paused ? 'Play preview' : 'Pause preview';
  };
  const syncPreview = async () => {
    const attempt = ++playAttempt;
    if (previewPaused || !previewVisible || document.hidden) {
      projectVideo.pause();
      return;
    }
    try {
      await projectVideo.play();
      if (attempt !== playAttempt && (previewPaused || !previewVisible || document.hidden)) projectVideo.pause();
    } catch {
      updatePreviewButton();
    }
  };
  previewToggle.hidden = false;
  previewToggle.addEventListener('click', () => {
    previewPaused = !projectVideo.paused;
    syncPreview();
  });
  projectVideo.addEventListener('play', updatePreviewButton);
  projectVideo.addEventListener('pause', updatePreviewButton);
  projectVideo.addEventListener('error', () => { previewToggle.hidden = true; });
  new IntersectionObserver(entries => {
    previewVisible = entries[0].isIntersecting;
    syncPreview();
  }, { threshold: 0.1 }).observe(projectVideo);
  reducedMotion.addEventListener('change', () => {
    previewPaused = reducedMotion.matches;
    syncPreview();
  });
  document.addEventListener('visibilitychange', () => {
    hideProjectCursor();
    syncPreview();
  });
});

// Keep the portrait playful with a keyboard-accessible greeting.
const homePhoto = document.querySelector('.home-avatar');
homePhoto?.addEventListener('click', () => {
  const greeted = homePhoto.getAttribute('aria-pressed') === 'true';
  homePhoto.setAttribute('aria-pressed', String(!greeted));
});
