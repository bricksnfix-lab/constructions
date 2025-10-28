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
function closeLightbox(){ lb.setAttribute('aria-hidden','true'); }
window.addEventListener('keydown', e=>{ if(e.key==='Escape') closeLightbox(); });

// fake form submit (replace with real endpoint later)
function submitForm(e){
  e.preventDefault();
  const msg = document.getElementById('formMsg');
  msg.textContent = "Thank you! Expect our call in 24 hrs.";
  e.target.reset();
  return false;
}
