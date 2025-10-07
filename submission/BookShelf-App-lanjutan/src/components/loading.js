export function createLoading() {
  const el = document.createElement("div");
  el.id = "loadingIndicator";
  el.textContent = "Memuat...";
  Object.assign(el.style, {
    position: "fixed",
    top: "12px",
    right: "12px",
    background: "rgba(255,255,255,0.95)",
    padding: "8px 12px",
    borderRadius: "6px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.12)",
    display: "none",
  });
  return el;
}
