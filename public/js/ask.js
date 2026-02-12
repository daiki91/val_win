document.addEventListener('DOMContentLoaded', ()=>{
  const no = document.getElementById('no');
  const yes = document.getElementById('yes');

  // Place initialement le bouton Non dans une position sûre (en bas à droite)
  function placeInitial() {
    const rect = no.getBoundingClientRect();
    const left = Math.min(window.innerWidth - rect.width - 12, window.innerWidth * 0.75);
    const top = Math.min(window.innerHeight - rect.height - 12, window.innerHeight * 0.75);
    no.style.left = `${left}px`;
    no.style.top = `${top}px`;
  }

  // Place le bouton aléatoirement mais en s'assurant qu'il reste à une distance minimale du pointeur
  function placeAwayFrom(px, py) {
    const rect = no.getBoundingClientRect();
    const btnW = rect.width;
    const btnH = rect.height;
    const padding = 8;
    const maxLeft = Math.max(0, window.innerWidth - btnW - padding);
    const maxTop = Math.max(0, window.innerHeight - btnH - padding);

    const minDistance = 150; // px — distance minimale à conserver du pointeur
    let tries = 0;
    let left, top;

    do {
      left = Math.floor(Math.random() * (maxLeft + 1));
      top = Math.floor(Math.random() * (maxTop + 1));
      tries++;
      const cx = px ?? (window.innerWidth / 2);
      const cy = py ?? (window.innerHeight / 2);
      const dx = (left + btnW/2) - cx;
      const dy = (top + btnH/2) - cy;
      const dist = Math.hypot(dx, dy);
      if (dist >= minDistance) break;
    } while (tries < 30);

    // Si on a essayé trop longtemps, forcer dans le coin opposé
    if (tries >= 30) {
      left = px != null && px < window.innerWidth/2 ? maxLeft : 0;
      top = py != null && py < window.innerHeight/2 ? maxTop : 0;
    }

    no.style.left = `${left}px`;
    no.style.top = `${top}px`;
    no.style.transform = 'none';
  }

  // Déplacement continu : à chaque mouvement, le bouton saute ailleurs dans la fenêtre
  function onPointerMove(clientX, clientY) {
    placeAwayFrom(clientX, clientY);
  }

  // Events
  document.addEventListener('mousemove', (e) => onPointerMove(e.clientX, e.clientY));
  document.addEventListener('touchmove', (e) => {
    if (e.touches && e.touches[0]) onPointerMove(e.touches[0].clientX, e.touches[0].clientY);
  }, {passive: true});

  // Empêcher le clic/focus sur le bouton 'Non' et le forcer à se déplacer si l'utilisateur y arrive par clavier
  no.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); placeAwayFrom(); });
  no.addEventListener('focus', () => placeAwayFrom());

  // Recentrer / recadrer en cas de redimensionnement de la fenêtre
  window.addEventListener('resize', () => {
    const rect = no.getBoundingClientRect();
    const maxLeft = Math.max(0, window.innerWidth - rect.width - 8);
    const maxTop = Math.max(0, window.innerHeight - rect.height - 8);
    const left = Math.min(parseFloat(no.style.left || 0), maxLeft);
    const top = Math.min(parseFloat(no.style.top || 0), maxTop);
    no.style.left = `${left}px`;
    no.style.top = `${top}px`;
  });

  yes.addEventListener('click', ()=>{
    window.location = '/gallery';
  });

  // Initial placement
  placeInitial();
});