document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('pwForm');
  const input = document.getElementById('password');
  const msg = document.getElementById('msg');

  let attempts = 0;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const v = input.value.trim();
    if (v === 'princess') {
      window.location.assign('/gallery');
      return;
    }

    attempts += 1;

    if (attempts === 1) {
      msg.textContent = 'Ce n’est pas encore le bon mot… essaie encore ♡';
    } else {
      msg.textContent = 'Pense au surnom que je te répète souvent ♡';
    }

    input.value = '';
    input.focus();
  });
});