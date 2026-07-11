// ============================================================
// COUNTDOWN — Nikah: Thursday, 20 August 2026, 11:30 AM IST
// ============================================================
const NIKAH_DATE = new Date('2026-08-20T11:30:00+05:30').getTime();

const cdDays  = document.getElementById('cd-days');
const cdHours = document.getElementById('cd-hours');
const cdMins  = document.getElementById('cd-mins');
const cdSecs  = document.getElementById('cd-secs');

function pad(n){ return String(n).padStart(2, '0'); }

function updateCountdown(){
  const now = Date.now();
  let diff = NIKAH_DATE - now;

  if (diff <= 0){
    cdDays.textContent = '00';
    cdHours.textContent = '00';
    cdMins.textContent = '00';
    cdSecs.textContent = '00';
    return;
  }

  const days  = Math.floor(diff / 86400000);
  diff -= days * 86400000;
  const hours = Math.floor(diff / 3600000);
  diff -= hours * 3600000;
  const mins  = Math.floor(diff / 60000);
  diff -= mins * 60000;
  const secs  = Math.floor(diff / 1000);

  cdDays.textContent  = pad(days);
  cdHours.textContent = pad(hours);
  cdMins.textContent  = pad(mins);
  cdSecs.textContent  = pad(secs);
}

updateCountdown();
setInterval(updateCountdown, 1000);

// ============================================================
// MOON PHASE SCROLL PROGRESS (signature element)
// ============================================================
const moonFill = document.getElementById('moonFill');

function updateMoonPhase(){
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;

  // Moon fills from new moon (0 width) to full moon (84 width, full circle)
  const width = progress * 84;
  moonFill.setAttribute('width', width.toFixed(2));
  moonFill.setAttribute('x', (50 - width / 2).toFixed(2));
}

window.addEventListener('scroll', updateMoonPhase, { passive: true });
updateMoonPhase();

// ============================================================
// AUDIO TOGGLE
// ============================================================
const audioToggle = document.getElementById('audioToggle');
const bgAudio = document.getElementById('bgAudio');
let isPlaying = false;

audioToggle.addEventListener('click', () => {
  if (!isPlaying){
    bgAudio.play().then(() => {
      isPlaying = true;
      audioToggle.classList.add('playing');
    }).catch(() => {
      // No audio file added yet — silently ignore until assets/music.mp3 exists
      console.info('Add a track at assets/music.mp3 to enable music.');
    });
  } else {
    bgAudio.pause();
    isPlaying = false;
    audioToggle.classList.remove('playing');
  }
});

// ============================================================
// REVEAL ON SCROLL
// ============================================================
const revealTargets = document.querySelectorAll(
  '.occasion-card, .countdown-grid, .venue-card, .section-title, .section-eyebrow, .invite-note p'
);
revealTargets.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting){
      entry.target.classList.add('in');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealTargets.forEach(el => observer.observe(el));
