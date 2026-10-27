document.querySelectorAll('[data-open]').forEach(button => {
  button.addEventListener('click', () => {
    const dialog = document.getElementById(button.dataset.open);
    if (dialog && !dialog.open) {
      dialog.showModal();
      document.body.style.overflow = 'hidden';
    }
  });
});
document.querySelectorAll('dialog').forEach(dialog => {
  dialog.querySelectorAll('.close-dialog, .close-action').forEach(button => {
    button.addEventListener('click', () => dialog.close());
  });
  dialog.addEventListener('click', event => {
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => { document.body.style.overflow = ''; });
});
