const HOVER_TOGGLE_SELECTORS = [".player-controls", ".metadata-container"];

function isMobileDevice() {
  return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

function hasAllTargetElements(parent) {
  return HOVER_TOGGLE_SELECTORS.every((selector) =>
    parent.querySelector(selector)
  );
}

function setElementsVisibility(centeredReel, isHovering) {
  HOVER_TOGGLE_SELECTORS.forEach((selector) => {
    const el = centeredReel.querySelector(selector);
    if (el) {
      el.style.visibility = isHovering ? "visible" : "hidden";
    }
  });
}

function addHoverToggle(targetElement) {
  targetElement.addEventListener("mouseenter", () => {
    setElementsVisibility(targetElement, true);
  });
  targetElement.addEventListener("mouseleave", () => {
    setElementsVisibility(targetElement, false);
  });
  setElementsVisibility(targetElement, false);
}

function getCenterReel() {
  const centerY = window.innerHeight / 2;
  const reels = document.querySelectorAll(
    `#shorts-inner-container .reel-video-in-sequence-new`
  );

  return Array.from(reels).find((reel) => {
    const rect = reel.getBoundingClientRect();
    return rect.top <= centerY && rect.bottom >= centerY;
  });
}

function setupHoverListener() {
  const centerReel = getCenterReel();
  if (!centerReel) return;

  const reelHasTargetElements = hasAllTargetElements(centerReel);
  if (!reelHasTargetElements) return;

  if (centerReel.dataset.ytShortsUiHiderListenerAttached === "true") return;
  centerReel.dataset.ytShortsUiHiderListenerAttached = "true";

  addHoverToggle(centerReel);
}

if (!isMobileDevice()) {
  setupHoverListener();
  const observer = new MutationObserver(() => {
    setupHoverListener();
  });
  observer.observe(document.body, { childList: true, subtree: true });
}
