(() => {
  const stack = document.querySelector('.photo-stack');
  if (!stack) return;
  const cards = [...stack.querySelectorAll('.snapshot')];
  if (cards.length < 2) return;
  const trigger = stack.querySelector('.photo-flip');
  const count = document.querySelector('.photo-count');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let current = 0;
  let busy = false;
  let start = null;
  let suppressClick = false;
  function render() {
    cards.forEach((card, index) => {
      const position = (index - current + cards.length) % cards.length;
      card.dataset.position = position;
      card.setAttribute('aria-hidden', String(position !== 0));
      card.style.transform = '';
    });
    count.textContent = `${current + 1} / ${cards.length}`;
    trigger.setAttribute('aria-label', `${cards[current].querySelector('figcaption').textContent}. Show next photo`);
  }
  async function flip(direction = 1) {
    if (busy) return;
    busy = true;
    const card = cards[current];
    if (!reducedMotion.matches) {
      const animation = card.animate([
        { transform: 'rotate(-4deg)' },
        { transform: `translate(${direction * 145}px, -24px) rotate(${direction * 19}deg) rotateY(${direction * -32}deg)`, offset: .55 },
        { transform: 'translate(-7px, 9px) rotate(-9deg)' }
      ], { duration: 520, easing: 'cubic-bezier(.22,.65,.3,1)' });
      // Change the stacking order once the outgoing card clears the pile.
      await new Promise(resolve => setTimeout(resolve, 285));
      current = (current + 1) % cards.length;
      render();
      await animation.finished;
    } else {
      current = (current + 1) % cards.length;
      render();
    }
    busy = false;
  }
  trigger.addEventListener('click', () => {
    if (suppressClick) { suppressClick = false; return; }
    flip();
  });
  trigger.addEventListener('keydown', event => {
    if (['ArrowRight', 'ArrowLeft'].includes(event.key)) {
      event.preventDefault();
      flip(event.key === 'ArrowLeft' ? -1 : 1);
    }
  });
  trigger.addEventListener('pointerdown', event => {
    if (busy || !event.isPrimary || event.button !== 0) return;
    suppressClick = false;
    start = { x: event.clientX, y: event.clientY, id: event.pointerId };
    trigger.setPointerCapture(event.pointerId);
  });
  trigger.addEventListener('pointermove', event => {
    if (!start || event.pointerId !== start.id) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (Math.abs(dx) > 8 && Math.abs(dx) > Math.abs(dy)) {
      if (!reducedMotion.matches) cards[current].style.transform = `translate(${Math.max(-100, Math.min(100, dx))}px, -8px) rotate(${dx / 14 - 4}deg)`;
    }
  });
  trigger.addEventListener('pointerup', event => {
    if (!start || event.pointerId !== start.id) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    start = null;
    cards[current].style.transform = '';
    if (Math.abs(dx) > 35 && Math.abs(dx) > Math.abs(dy)) {
      suppressClick = true;
      flip(dx < 0 ? -1 : 1);
    } else if (Math.abs(dy) > 20) suppressClick = true;
  });
  function cancelDrag() {
    start = null;
    cards[current].style.transform = '';
  }
  trigger.addEventListener('pointercancel', cancelDrag);
  trigger.addEventListener('lostpointercapture', cancelDrag);
  render();
})();
