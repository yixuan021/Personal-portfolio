const worksMenu = document.querySelector('.works-menu');
const worksTrigger = worksMenu.querySelector('.works-trigger');
const worksList = worksMenu.querySelector('.works-list');
function setWorksOpen(open) {
  worksTrigger.setAttribute('aria-expanded', String(open));
  worksList.hidden = !open;
}
worksTrigger.addEventListener('click', () => {
  setWorksOpen(worksTrigger.getAttribute('aria-expanded') !== 'true');
});
worksMenu.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    setWorksOpen(false);
    worksTrigger.focus();
  }
  if (event.target === worksTrigger && event.key === 'ArrowDown') {
    event.preventDefault();
    setWorksOpen(true);
    worksList.querySelector('a').focus();
  }
});
worksMenu.addEventListener('focusout', event => {
  if (!worksMenu.contains(event.relatedTarget)) setWorksOpen(false);
});
document.addEventListener('click', event => {
  if (!worksMenu.contains(event.target)) setWorksOpen(false);
});
worksList.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setWorksOpen(false)));

// Keep section links and the case-study contents clear of the sticky header.
if (document.body.classList.contains('case-page')) {
  const header = document.querySelector('.site-header');
  const updateHeaderHeight = () => {
    document.body.style.setProperty('--portfolio-header-height', `${header.getBoundingClientRect().height}px`);
  };
  updateHeaderHeight();
  new ResizeObserver(updateHeaderHeight).observe(header);
}
