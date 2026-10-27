document.addEventListener('DOMContentLoaded', () => {
  const image = document.getElementById('carousel');
  const count = document.getElementById('photoCount');
  const dots = document.getElementById('photoDots');
  const previousButton = document.getElementById('previousPhoto');
  const nextButton = document.getElementById('nextPhoto');
  const backButton = document.getElementById('backButton');
  const relationshipTimer = document.getElementById('relationshipTimer');
  const totalPhotos = 8;
  const photos = Array.from({ length: totalPhotos }, (_, index) => `/images/${index + 1}.jpeg`);
  let currentPhoto = 0;
  let transitionTimeout;

  function displayPhoto(index) {
    currentPhoto = (index + totalPhotos) % totalPhotos;
    image.classList.add('is-changing');
    window.clearTimeout(transitionTimeout);

    transitionTimeout = window.setTimeout(() => {
      image.src = photos[currentPhoto];
      image.alt = `Souvenir ${currentPhoto + 1} sur ${totalPhotos}`;
      count.textContent = `${String(currentPhoto + 1).padStart(2, '0')} / ${String(totalPhotos).padStart(2, '0')}`;
      dots.querySelectorAll('button').forEach((dot, dotIndex) => {
        dot.classList.toggle('is-active', dotIndex === currentPhoto);
        dot.setAttribute('aria-current', dotIndex === currentPhoto ? 'true' : 'false');
      });
      image.classList.remove('is-changing');
    }, 220);
  }

  photos.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'photo-dot';
    dot.setAttribute('aria-label', `Afficher la photo ${index + 1}`);
    dot.addEventListener('click', () => displayPhoto(index));
    dots.appendChild(dot);
  });
  displayPhoto(currentPhoto);

  previousButton.addEventListener('click', () => displayPhoto(currentPhoto - 1));
  nextButton.addEventListener('click', () => displayPhoto(currentPhoto + 1));
  window.setInterval(() => displayPhoto(currentPhoto + 1), 5000);

  backButton.addEventListener('click', () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.assign('/');
    }
  });

  const relationshipStart = new Date(2025, 1, 24);
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  function updateRelationshipTimer() {
    const elapsed = Math.max(0, Date.now() - relationshipStart.getTime());
    const days = Math.floor(elapsed / day);
    const hours = Math.floor((elapsed % day) / hour);
    const minutes = Math.floor((elapsed % hour) / minute);
    const seconds = Math.floor((elapsed % minute) / second);
    relationshipTimer.textContent = `${days} jours, ${hours} h, ${minutes} min et ${seconds} s`;
  }

  updateRelationshipTimer();
  window.setInterval(updateRelationshipTimer, second);
});
