const revealElements = document.querySelectorAll(".reveal");
const heroSequence = document.querySelector("[data-hero-sequence]");
const popupTrack = document.querySelector("[data-popup-track]");
const popupShell = document.querySelector(".popup-scroll-shell");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.18,
  }
);

revealElements.forEach((element) => observer.observe(element));

const updateHeroPreviewScroll = () => {
  if (!heroSequence || !popupTrack || !popupShell || window.innerWidth <= 960) {
    if (popupTrack) {
      popupTrack.style.transform = "";
    }
    return;
  }

  const sequenceRect = heroSequence.getBoundingClientRect();
  const sequenceHeight = heroSequence.offsetHeight;
  const viewportHeight = window.innerHeight;
  const maxSequenceTravel = Math.max(sequenceHeight - viewportHeight, 1);
  const rawProgress = (-sequenceRect.top) / maxSequenceTravel;
  const progress = Math.min(Math.max(rawProgress, 0), 1);
  const maxTrackShift = Math.max(popupTrack.scrollHeight - popupShell.clientHeight, 0);

  popupTrack.style.transform = `translateY(${-maxTrackShift * progress}px)`;
};

updateHeroPreviewScroll();
window.addEventListener("scroll", updateHeroPreviewScroll, { passive: true });
window.addEventListener("resize", updateHeroPreviewScroll);
