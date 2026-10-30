const funProjects = {
  pavilion: {
    title: 'Pavilion in the Park',
    description: 'A team project in Rhino, Grasshopper, and Twinmotion. My focus: modelling, mockups, and writing.',
    slides: [
      { type: 'video', src: 'assets/fun/pavilion-film.mp4', poster: 'assets/fun/pavilion.webp', alt: 'Pavilion in the Park — full architectural film' },
      { type: 'image', src: 'assets/fun/pavilion.webp', alt: 'Flower and Sculpture pavilion in a tree-filled park' }
    ],
    links: [
      { label: 'View project slides ↗', href: 'https://www.figma.com/proto/zqZNGatRru4iRuwupq5C7I/IAT336project2?page-id=129%3A6&node-id=129-7&scaling=contain&content-scaling=fixed' }
    ]
  },
  bathhouse: {
    title: 'Spirited Away Bathhouse',
    description: 'A handmade bathhouse and its miniature surroundings, inspired by the world of Spirited Away.',
    slides: [
      { type: 'image', src: 'assets/fun/bathhouse-front.webp', alt: 'Front view of the handmade bathhouse, with a green roof, red walls, and miniature trees' },
      { type: 'image', src: 'assets/fun/bathhouse-rear.webp', alt: 'Another view of the bathhouse model and its landscaped base' }
    ]
  },
  gallery: {
    title: 'Reimagined Gallery',
    description: 'A team exploration of a virtual gallery, moving between exhibited artwork and immersive 3D scenes.',
    slides: [
      { type: 'video', src: 'assets/fun/gallery-film.mp4', poster: 'assets/fun/gallery-poster.webp', alt: 'Reimagined Gallery — full virtual gallery walkthrough' }
    ]
  },
  graphics: {
    title: 'Graphic explorations',
    description: 'Six visual studies, playing with expressive type, layered imagery, and colour.',
    slides: [
      { type: 'image', src: 'assets/fun/graphic-01.webp', alt: 'Graphic study 1: a grainy coastline with layered typography' },
      { type: 'image', src: 'assets/fun/graphic-02.webp', alt: 'Graphic study 2: daisies, a blue sky, and expressive floral typography' },
      { type: 'image', src: 'assets/fun/graphic-03.webp', alt: 'Graphic study 3: a pink cloudscape and delicate typography on white' },
      { type: 'image', src: 'assets/fun/graphic-04.webp', alt: 'Graphic study 4: dark blue blossoms with elegant layered lettering' },
      { type: 'image', src: 'assets/fun/graphic-05.webp', alt: 'Graphic study 5: cyan typography and a photograph of umbrellas' },
      { type: 'image', src: 'assets/fun/graphic-06.webp', alt: 'Graphic study 6: warm light through a round window with layered text' }
    ]
  }
};

const viewer = document.querySelector('.fun-viewer');
const track = viewer.querySelector('.viewer-track');
const dots = viewer.querySelector('.viewer-dots');
const count = viewer.querySelector('.viewer-count');
const previous = viewer.querySelector('.viewer-prev');
const next = viewer.querySelector('.viewer-next');
const motion = matchMedia('(prefers-reduced-motion: reduce)');
let activeProject = null;
let activeSlide = 0;
let returnFocus = null;
let previousOverflow = '';

function updateSlideState(index) {
  activeSlide = index;
  previous.disabled = index === 0;
  next.disabled = index === activeProject.slides.length - 1;
  count.textContent = `${String(index + 1).padStart(2, '0')} / ${String(activeProject.slides.length).padStart(2, '0')}`;
  [...dots.children].forEach((dot, i) => {
    if (i === index) dot.setAttribute('aria-current', 'true');
    else dot.removeAttribute('aria-current');
  });
  track.querySelectorAll('video').forEach((video, i) => { if (i !== index) video.pause(); });
}

function goToSlide(index) {
  if (!activeProject || index < 0 || index >= activeProject.slides.length) return;
  track.scrollTo({ left: index * track.clientWidth, behavior: motion.matches ? 'instant' : 'smooth' });
}

function openProject(id, trigger) {
  const project = funProjects[id];
  if (!project || viewer.open) return;
  activeProject = project;
  returnFocus = trigger || document.querySelector(`[data-project="${id}"]`);
  viewer.querySelector('#viewer-title').textContent = project.title;
  viewer.querySelector('#viewer-description').textContent = project.description;
  track.replaceChildren();
  dots.replaceChildren();
  project.slides.forEach((slide, index) => {
    const figure = document.createElement('figure');
    figure.className = 'viewer-slide';
    figure.setAttribute('role', 'group');
    figure.setAttribute('aria-roledescription', 'slide');
    figure.setAttribute('aria-label', `${index + 1} of ${project.slides.length}`);
    const media = document.createElement(slide.type === 'video' ? 'video' : 'img');
    media.src = slide.src;
    if (slide.type === 'video') {
      media.controls = true;
      media.playsInline = true;
      media.preload = 'metadata';
      media.poster = slide.poster;
      media.setAttribute('aria-label', slide.alt);
    } else {
      media.alt = slide.alt;
      media.draggable = false;
    }
    figure.append(media);
    track.append(figure);
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
    dot.addEventListener('click', () => goToSlide(index));
    dots.append(dot);
  });
  const links = viewer.querySelector('.viewer-links');
  links.replaceChildren();
  (project.links || []).forEach(link => {
    const a = document.createElement('a');
    a.textContent = link.label;
    a.href = link.href;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    links.append(a);
  });
  viewer.querySelector('.viewer-navigation').hidden = project.slides.length < 2;
  previousOverflow = document.body.style.overflow;
  viewer.showModal();
  document.body.style.overflow = 'hidden';
  viewer.scrollTop = 0;
  track.scrollTo({ left: 0, behavior: 'instant' });
  updateSlideState(0);
  history.replaceState(null, '', `#${id}`);
  document.dispatchEvent(new Event('fun-viewer-change'));
  const video = track.querySelector('video');
  if (video && !motion.matches) video.play().catch(() => {});
}

document.querySelectorAll('[data-project]').forEach(button => {
  button.addEventListener('click', () => openProject(button.dataset.project, button));
});
previous.addEventListener('click', () => goToSlide(activeSlide - 1));
next.addEventListener('click', () => goToSlide(activeSlide + 1));
track.addEventListener('scroll', () => {
  if (!activeProject || !track.clientWidth) return;
  const index = Math.max(0, Math.min(activeProject.slides.length - 1, Math.round(track.scrollLeft / track.clientWidth)));
  if (index !== activeSlide) updateSlideState(index);
}, { passive: true });
new ResizeObserver(() => {
  if (viewer.open) track.scrollTo({ left: activeSlide * track.clientWidth, behavior: 'instant' });
}).observe(track);
viewer.querySelector('.viewer-close').addEventListener('click', () => viewer.close());
viewer.addEventListener('click', event => {
  const b = viewer.getBoundingClientRect();
  if (event.clientX < b.left || event.clientX > b.right || event.clientY < b.top || event.clientY > b.bottom) viewer.close();
});
viewer.addEventListener('keydown', event => {
  if (event.target.closest('video')) return;
  if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
    event.preventDefault();
    goToSlide(activeSlide + (event.key === 'ArrowRight' ? 1 : -1));
  }
});
viewer.addEventListener('close', () => {
  track.querySelectorAll('video').forEach(video => video.pause());
  document.body.style.overflow = previousOverflow;
  activeProject = null;
  history.replaceState(null, '', location.pathname + location.search);
  document.dispatchEvent(new Event('fun-viewer-change'));
  returnFocus?.focus({ preventScroll: true });
});

// Gallery motion follows visibility, the viewer, and the reader’s preference.
document.querySelectorAll('[data-fun-video]').forEach(video => {
  const toggle = video.closest('.fun-media-wrap').querySelector('.fun-preview-toggle');
  const previewName = video.dataset.previewName || 'Project';
  let userPaused = motion.matches;
  let visible = false;
  let playAttempt = 0;
  video.muted = true;
  const update = () => {
    toggle.textContent = video.paused ? 'Play preview' : 'Pause preview';
    toggle.setAttribute('aria-label', `${video.paused ? 'Play' : 'Pause'} ${previewName} preview`);
  };
  async function sync() {
    const attempt = ++playAttempt;
    if (userPaused || !visible || document.hidden || viewer.open) { video.pause(); return; }
    try {
      await video.play();
      if (attempt !== playAttempt && (userPaused || !visible || document.hidden || viewer.open)) video.pause();
    } catch { update(); }
  }
  toggle.hidden = false;
  toggle.addEventListener('click', () => { userPaused = !video.paused; sync(); });
  video.addEventListener('play', update);
  video.addEventListener('pause', update);
  video.addEventListener('error', () => { toggle.hidden = true; });
  new IntersectionObserver(entries => { visible = entries[0].isIntersecting; sync(); }, { threshold: 0.1 }).observe(video);
  motion.addEventListener('change', () => { userPaused = motion.matches; sync(); });
  document.addEventListener('visibilitychange', sync);
  document.addEventListener('fun-viewer-change', sync);
  update();
});
const requestedProject = location.hash.slice(1);
if (funProjects[requestedProject]) openProject(requestedProject);
