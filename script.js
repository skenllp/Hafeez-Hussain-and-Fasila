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
// AUDIO TOGGLE & AUTOPLAY
// ============================================================
const audioToggle = document.getElementById('audioToggle');
const bgAudio = document.getElementById('bgAudio');
let isPlaying = false;

// Sync UI state with audio element events
bgAudio.addEventListener('play', () => {
  isPlaying = true;
  audioToggle.classList.add('playing');
});

bgAudio.addEventListener('pause', () => {
  isPlaying = false;
  audioToggle.classList.remove('playing');
});

// Click handler toggles play/pause state
audioToggle.addEventListener('click', (e) => {
  e.stopPropagation(); // Avoid triggering document interaction fallback
  if (bgAudio.paused) {
    bgAudio.play().catch((err) => {
      console.info('Playback failed or blocked:', err);
    });
  } else {
    bgAudio.pause();
  }
});

// Attempt to start playback
function attemptPlay() {
  bgAudio.play().then(() => {
    // If successfully playing, clean up interaction event listeners
    cleanupListeners();
  }).catch(() => {
    // Autoplay blocked by browser policy; wait for user interaction
  });
}

const startPlayOnInteraction = () => {
  attemptPlay();
};

function cleanupListeners() {
  document.removeEventListener('click', startPlayOnInteraction);
  document.removeEventListener('scroll', startPlayOnInteraction);
  document.removeEventListener('touchstart', startPlayOnInteraction);
}

// Initial trigger
attemptPlay();

// Fallbacks for browser autoplay restrictions
document.addEventListener('click', startPlayOnInteraction);
document.addEventListener('scroll', startPlayOnInteraction, { passive: true });
document.addEventListener('touchstart', startPlayOnInteraction, { passive: true });

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
