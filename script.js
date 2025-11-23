// year
document.getElementById('year').textContent = new Date().getFullYear();

// gallery lightbox
const lb = document.getElementById('lightbox');
const lbImg = document.getElementById('lightboxImg');
const lbCap = document.getElementById('lightboxCap');
document.getElementById('gallery').addEventListener('click', e=>{
  const fig = e.target.closest('figure'); if(!fig) return;
  const img = fig.querySelector('img'); const cap = fig.querySelector('figcaption');
  lbImg.src = img.src; lbImg.alt = img.alt; lbCap.textContent = cap?.textContent||'';
  lb.setAttribute('aria-hidden','false');
});
/* Add to end of script.js */

/* --- Lightbox gallery behavior --- */
(function(){
  const galleryImgs = document.querySelectorAll('#gallery img');
  const lightbox = document.getElementById('lightbox');
  const lightboxBg = document.getElementById('lightboxBg');
  const imgEl = document.getElementById('lightboxImg');
  const capEl = document.getElementById('lightboxCap');
  const btnClose = document.getElementById('lightboxClose');
  const btnPrev = document.getElementById('lightboxPrev');
  const btnNext = document.getElementById('lightboxNext');

  if (!galleryImgs.length || !lightbox) return;

  let currentIndex = 0;
  let touchStartX = 0;

  galleryImgs.forEach((img, i) => {
    img.dataset.index = i;
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => openLightbox(i));
  });

  function openLightbox(i) {
    currentIndex = i;
    showImage();
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // prevent page scroll
    document.addEventListener('keydown', onKeyDown);
  }

  function closeLightbox() {
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    document.removeEventListener('keydown', onKeyDown);
  }

  function showImage() {
    const img = galleryImgs[currentIndex];
    imgEl.src = img.src;
    imgEl.alt = img.alt || '';
    capEl.textContent = (img.nextElementSibling && img.nextElementSibling.tagName.toLowerCase()==='figcaption') ?
                         img.nextElementSibling.textContent : img.alt || '';
  }

  function prev() {
    currentIndex = (currentIndex - 1 + galleryImgs.length) % galleryImgs.length;
    showImage();
  }
  function next() {
    currentIndex = (currentIndex + 1) % galleryImgs.length;
    showImage();
  }

  // events
  btnClose.addEventListener('click', closeLightbox);
  btnPrev.addEventListener('click', prev);
  btnNext.addEventListener('click', next);

  // click outside image closes lightbox
  lightboxBg.addEventListener('click', (e) => {
    // if user clicked background (not the frame or nav or close)
    const frame = document.querySelector('.lightbox__frame');
    if (!frame.contains(e.target) && !e.target.classList.contains('lightbox__nav') && e.target !== btnClose) {
      closeLightbox();
    }
  });

  // click image -> next
  imgEl.addEventListener('click', (e) => { e.stopPropagation(); next(); });

  // keyboard
  function onKeyDown(e){
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  }

  // touch swipe support
  lightboxBg.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
  }, {passive:true});
  lightboxBg.addEventListener('touchend', (e) => {
    const endX = e.changedTouches[0].clientX;
    const diff = endX - touchStartX;
    if (Math.abs(diff) > 40) {
      if (diff < 0) next(); else prev();
    } else {
      // if tap outside image, click handler above closes
    }
  });

  // optional: mouse wheel left/right navigation
  lightboxBg.addEventListener('wheel', (e) => {
    if (Math.abs(e.deltaY) < Math.abs(e.deltaX)) {
      e.preventDefault();
      if (e.deltaX > 0) next(); else prev();
    }
  }, {passive:false});
})();
