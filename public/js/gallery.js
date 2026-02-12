document.addEventListener('DOMContentLoaded', ()=>{
  const img = document.getElementById('carousel');
  const frame = document.querySelector('.photo-frame');
  const total = 8; // images 1..8
  let i = 1;
  const effects = ['fade','zoom','slide-left','slide-right'];

  // initial reflection
  frame.style.setProperty('--reflection', `url(${img.src})`);

  function removeEffectClasses(){
    effects.forEach(e => {
      img.classList.remove(`${e}-out`);
      img.classList.remove(`${e}-in`);
      frame.classList.remove(`${e}-out`);
      frame.classList.remove(`${e}-in`);
    });
  }

  function show(n){
    const effect = effects[Math.floor(Math.random()*effects.length)];
    removeEffectClasses();
    // out
    img.classList.add(`${effect}-out`);
    frame.classList.add(`${effect}-out`);

    setTimeout(()=>{
      // change source
      img.src = `/images/${n}.jpeg`;
      // update reflection to the new image
      frame.style.setProperty('--reflection', `url('/images/${n}.jpeg')`);
      // force reflow
      void img.offsetWidth;
      // in
      img.classList.remove(`${effect}-out`);
      img.classList.add(`${effect}-in`);
      frame.classList.remove(`${effect}-out`);
      frame.classList.add(`${effect}-in`);
    }, 600);

    // cleanup after transition
    setTimeout(()=>{
      removeEffectClasses();
    }, 1400);
  }

  // start cycle
  setInterval(()=>{
    i = i % total + 1;
    show(i);
  }, 4000);
});