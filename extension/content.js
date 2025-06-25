function toggleElementsVisibility(isHovering) {
  const selectors = [
    ".player-controls", // top screen controls
    "#overlay", // bottom screen info
  ];

  selectors.forEach((selector) => {
    const el = document.querySelector(selector);
    if (el) {
      el.style.visibility = isHovering ? "visible" : "hidden";
    }
  });
}

function setupHoverListener() {
  const playerContainer = document.querySelector("#shorts-inner-container");
  if (
    !playerContainer ||
    playerContainer.dataset.ytShortsUiHiderListenerAttached === "true"
  )
    return;

  playerContainer.dataset.ytShortsUiHiderListenerAttached = "true";

  playerContainer.addEventListener("mouseenter", () => {
    toggleElementsVisibility(true);
  });

  playerContainer.addEventListener("mouseleave", () => {
    toggleElementsVisibility(false);
  });

  // Set initial state based on not hovering
  toggleElementsVisibility(false);
}

const isMobile =
  /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

// Only run script on desktop
if (!isMobile) {
  setupHoverListener();
  const observer = new MutationObserver(() => {
    setupHoverListener();
  });
  observer.observe(document.body, { childList: true, subtree: true });
}
