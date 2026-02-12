document.addEventListener('DOMContentLoaded', ()=>{
  const no = document.getElementById('no');
  const yes = document.getElementById('yes');
  const body = document.body;

  // Déplacer le bouton Non quand on approche
  function moveAway() {
    const x = Math.random()*80; // %
    const y = Math.random()*60 + 10; // %
    no.style.transform = `translate(${x}%, ${y}%)`;
  }

  no.addEventListener('mouseenter', moveAway);
  no.addEventListener('focus', moveAway);

  yes.addEventListener('click', ()=>{
    window.location = '/gallery';
  });
});