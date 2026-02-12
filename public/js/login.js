document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('pwForm');
  const input = document.getElementById('password');
  const msg = document.getElementById('msg');

  function getAttempts(){
    return parseInt(sessionStorage.getItem('pwAttempts') || '0', 10);
  }
  function setAttempts(n){
    sessionStorage.setItem('pwAttempts', String(n));
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const v = input.value.trim();
    if (v === 'princess') {
      sessionStorage.removeItem('pwAttempts');
      window.location = '/ask';
      return;
    }

    // incorrect
    let attempts = getAttempts() + 1;
    setAttempts(attempts);

    if (attempts === 1) {
      msg.textContent = 'comment ça tu ne trouves pas ?';
    } else if (attempts === 2) {
      msg.textContent = 'Rappelle-toi bien du surnom que je te répète à chaque fois.';
    } else {
      // After 2 attempts continue to show the hint
      msg.textContent = 'Rappelle-toi bien du surnom que je te répète à chaque fois.';
    }

    input.value = '';
    input.focus();
  });
});