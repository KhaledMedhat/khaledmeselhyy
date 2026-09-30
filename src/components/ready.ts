/** The intro sets data-ready on <html> when it hands over to the page; lines and reveals wait for it. */
export const isReady = () => typeof document !== "undefined" && document.documentElement.dataset.ready === "1";

export const onReady = (fn: () => void) => {
  if (isReady()) {
    fn();
    return () => {};
  }
  window.addEventListener("intro:done", fn, { once: true });
  return () => window.removeEventListener("intro:done", fn);
};

export const markReady = () => {
  if (isReady()) return;
  document.documentElement.dataset.ready = "1";
  window.dispatchEvent(new Event("intro:done"));
};
