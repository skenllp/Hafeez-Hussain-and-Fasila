// ============================================================
// COUNTDOWN — Nikah: Thursday, 20 August 2026, 11:30 AM IST
// ============================================================
const NIKAH_DATE = new Date('2026-08-20T11:30:00+05:30').getTime();

const cdDays = document.getElementById('cd-days');
const cdHours = document.getElementById('cd-hours');
const cdMins = document.getElementById('cd-mins');
const cdSecs = document.getElementById('cd-secs');

function pad(n) { return String(n).padStart(2, '0'); }

function updateCountdown() {
  const now = Date.now();
  let diff = NIKAH_DATE - now;

  if (diff <= 0) {
    cdDays.textContent = '00';
    cdHours.textContent = '00';
    cdMins.textContent = '00';
    cdSecs.textContent = '00';
    return;
  }

  const days = Math.floor(diff / 86400000);
  diff -= days * 86400000;
  const hours = Math.floor(diff / 3600000);
  diff -= hours * 3600000;
  const mins = Math.floor(diff / 60000);
  diff -= mins * 60000;
  const secs = Math.floor(diff / 1000);

  cdDays.textContent = pad(days);
  cdHours.textContent = pad(hours);
  cdMins.textContent = pad(mins);
  cdSecs.textContent = pad(secs);
}

updateCountdown();
setInterval(updateCountdown, 1000);

// ============================================================
// AUDIO TOGGLE & AUTOPLAY
// ============================================================
const audioToggle = document.getElementById('audioToggle');
const bgAudio = document.getElementById('bgAudio');

bgAudio.loop = true;

// Keep toggle button in sync with actual audio state
bgAudio.addEventListener('play', () => {
  audioToggle.classList.toggle('playing', !bgAudio.muted);
});
bgAudio.addEventListener('pause', () => {
  audioToggle.classList.remove('playing');
});
bgAudio.addEventListener('volumechange', () => {
  audioToggle.classList.toggle('playing', !bgAudio.muted && !bgAudio.paused);
});

// Core helper: ensure audio is playing with sound
function ensureAudioPlaying() {
  bgAudio.muted = false;
  if (bgAudio.paused) {
    bgAudio.play().catch(err => console.info('Audio play failed:', err));
  }
  // Remove interaction listeners once audio is going
  document.removeEventListener('click', onFirstInteraction);
  document.removeEventListener('touchstart', onFirstInteraction);
}

// Called on first user interaction anywhere on the page
// Ignore taps that originate from the toggle button — it manages its own play/pause state
function onFirstInteraction(e) {
  if (audioToggle.contains(e.target)) return;
  ensureAudioPlaying();
}

// Manual toggle button — also kicks off audio on first click
audioToggle.addEventListener('click', (e) => {
  e.stopPropagation(); // Prevent event from reaching document-level onFirstInteraction
  if (!bgAudio.paused && !bgAudio.muted) {
    // Already playing with sound — pause it
    bgAudio.pause();
  } else {
    // Paused or muted — unmute and play
    ensureAudioPlaying();
  }
});

// Attempt muted autoplay immediately on load (browsers allow this)
// Audio will silently run; sound kicks in on first interaction
bgAudio.muted = true;
bgAudio.play().catch(() => {
  // Muted autoplay also blocked — will start fresh on first interaction
});

// Listen for first click or touch to unmute
document.addEventListener('click', onFirstInteraction);
document.addEventListener('touchstart', onFirstInteraction, { passive: true });
// ============================================================
// REVEAL ON SCROLL
// ============================================================
const revealTargets = document.querySelectorAll(
  '.occasion-card, .countdown-grid, .venue-card, .section-title, .section-eyebrow, .invite-note p'
);
revealTargets.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealTargets.forEach(el => observer.observe(el));
