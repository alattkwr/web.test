const downloadUrl = "assets/Send-Notes-Extension.zip";
const manualLink = document.getElementById("manual-download-link");
const progressFill = document.getElementById("progress-fill");
const downloadMessage = document.getElementById("download-message");

const triggerDownload = () => {
  const tempLink = document.createElement("a");
  tempLink.href = downloadUrl;
  tempLink.download = "Send-Notes-Extension.zip";
  document.body.appendChild(tempLink);
  tempLink.click();
  tempLink.remove();
};

let progress = 0;
const interval = window.setInterval(() => {
  progress = Math.min(progress + 8, 100);
  progressFill.style.width = `${progress}%`;

  if (progress >= 100) {
    window.clearInterval(interval);
    downloadMessage.textContent = "Download triggered. If nothing happened, use the manual download link above.";
  }
}, 120);

manualLink.setAttribute("href", downloadUrl);
window.addEventListener("load", () => {
  window.setTimeout(triggerDownload, 500);
});
