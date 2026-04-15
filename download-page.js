const downloadUrl = "assets/Send-Notes-Extension.zip";
const manualLink = document.getElementById("manual-download-link");
const progressFill = document.getElementById("progress-fill");
const downloadMessage = document.getElementById("download-message");
const cinematic = document.getElementById("download-cinematic");
const mainContent = document.getElementById("download-main");
const downloadAudio = document.getElementById("download-audio");

const revealDelayMs = 5225;
const downloadKickoffDelayMs = 120;
const audioStartOffsetSeconds = 1.48;

const triggerDownload = () => {
  const tempLink = document.createElement("a");
  tempLink.href = downloadUrl;
  tempLink.download = "Send-Notes-Extension.zip";
  document.body.appendChild(tempLink);
  tempLink.click();
  tempLink.remove();
};

const startProgress = () => {
  let progress = 0;
  const interval = window.setInterval(() => {
    progress = Math.min(progress + 8, 100);
    progressFill.style.width = `${progress}%`;
    if (progress >= 100) {
      window.clearInterval(interval);
    }
  }, 120);
};

const revealDownloadPage = () => {
  document.body.classList.add("download-live");
  if (cinematic) {
    cinematic.setAttribute("hidden", "hidden");
  }
  if (mainContent) {
    mainContent.removeAttribute("aria-hidden");
  }

  window.setTimeout(() => {
    triggerDownload();
    startProgress();
  }, downloadKickoffDelayMs);
};

const beginExperience = () => {
  manualLink.setAttribute("href", downloadUrl);
  if (mainContent) {
    mainContent.setAttribute("aria-hidden", "true");
  }

  if (downloadAudio) {
    downloadAudio.volume = 1;
    const startPlayback = () => {
      try {
        downloadAudio.currentTime = audioStartOffsetSeconds;
      } catch (error) {
        // Ignore seek timing issues and fall back to normal playback.
      }
      downloadAudio.play().catch(() => {});
    };

    if (downloadAudio.readyState >= 1) {
      startPlayback();
    } else {
      downloadAudio.addEventListener("loadedmetadata", startPlayback, { once: true });
    }
  }

  window.setTimeout(revealDownloadPage, revealDelayMs);
};

window.addEventListener("load", () => {
  beginExperience();
});
