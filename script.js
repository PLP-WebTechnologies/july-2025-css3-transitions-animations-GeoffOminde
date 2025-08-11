/* ===========================================
   Global state (Part 2: scope demonstration)
   =========================================== */
let currentVEI = 0;            // 1–8 VEI; 0 until analyzed
let isLoading = false;
const DEFAULT_PULSE_MS = 600;

/* ===========================================
   Part 2: Functions with parameters & returns
   =========================================== */

/** Clamp a number between min and max (pure function) */
function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

/** Return VEI (1–8) from a name using a simple hash for determinism */
function veiFromName(name) {
  if (!name) return 1;
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) | 0;
  }
  const positive = Math.abs(hash);
  return clamp((positive % 8) + 1, 1, 8);
}

/** Convert VEI to a percent of max VEI (8) for the meter fill */
function veiToPercent(vei) {
  return clamp(Math.round((vei / 8) * 100), 0, 100);
}

/** Scale a duration by a speed factor with sane bounds; returns ms */
function scaledDuration(baseMs, factor = 1) {
  const safe = clamp(factor, 0.25, 4);
  return Math.round(baseMs * safe);
}

/** Demonstrate local vs global scope in console */
function scopeDemo() {
  const currentVEI = 999; // local shadows global
  console.log("[Scope] Local VEI:", currentVEI);
  console.log("[Scope] Global VEI:", window.currentVEI);
  return "Local variable only";
}

/* ===========================================
   Part 3: Animation triggers via JS
   =========================================== */

/** Pulse the magma box using inline animation with parameterized duration */
function pulseMagma(durationMs = DEFAULT_PULSE_MS) {
  const box = document.getElementById("magmaBox");
  if (!box) return;
  box.style.animation = `pulse ${durationMs}ms ease`;
  setTimeout(() => { box.style.animation = ""; }, durationMs);
}

/** Toggle flip class on the info card */
function toggleFlip() {
  const card = document.getElementById("flipCard");
  if (!card) return;
  card.classList.toggle("flipped");
}

/** Start/stop the loader spinner */
function setLoading(state) {
  const loader = document.getElementById("loader");
  isLoading = !!state;
  loader.classList.toggle("spin", isLoading);
}

/** Open/close modal by toggling .show class and aria-hidden */
function openModal() {
  const modal = document.getElementById("modal");
  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
}
function closeModal() {
  const modal = document.getElementById("modal");
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
}

/* ===========================================
   Part 2 in action: render + update meter
   =========================================== */

/** Render the VEI meter and label from currentVEI */
function renderVEI() {
  const fill = document.getElementById("intensityFill");
  const label = document.getElementById("intensityValue");
  const percent = veiToPercent(currentVEI);
  fill.style.width = `${percent}%`;
  label.textContent = currentVEI ? `${currentVEI} VEI` : "-- VEI";
}

/** Change VEI by delta (±1) and re-render */
function adjustVEI(delta) {
  currentVEI = clamp(currentVEI + delta, 1, 8);
  renderVEI();
}

/* ===========================================
   Form handler (uses returns and DOM updates)
   =========================================== */
function analyzeEruption(event) {
  event.preventDefault();
  const input = document.getElementById("eruptionInput").value.trim();
  const vei = veiFromName(input);     // pure, deterministic
  currentVEI = vei;

  document.getElementById("eruptionResult").textContent = `Last analyzed: ${input || "--"}`;
  renderVEI();

  // a single pulse scaled by VEI (bigger VEI → longer pulse)
  const duration = scaledDuration(500, 0.5 + vei / 8);
  pulseMagma(duration);
}

/* ===========================================
   Wire up events on DOMContentLoaded
   =========================================== */
document.addEventListener("DOMContentLoaded", () => {
  // Initial render
  renderVEI();

  // Part 2: Scope demo
  document.getElementById("scopeDemoBtn").addEventListener("click", () => {
    const returned = scopeDemo();
    console.log("[Scope] Returned:", returned);
  });

  // Seismic buttons (Part 3)
  document.getElementById("pulseFast").addEventListener("click", () => {
    pulseMagma(scaledDuration(400, 0.7)); // low tremor
  });
  document.getElementById("pulseSlow").addEventListener("click", () => {
    pulseMagma(scaledDuration(600, 2.2)); // major quake
  });
  document.getElementById("pulseDefault").addEventListener("click", () => {
    pulseMagma(); // default
  });

  // Flip card (Part 3)
  document.getElementById("flipToggle").addEventListener("click", toggleFlip);
  document.getElementById("flipCard").addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.code === "Space") toggleFlip();
  });

  // Loader (Part 3)
  document.getElementById("startLoader").addEventListener("click", () => setLoading(true));
  document.getElementById("stopLoader").addEventListener("click", () => setLoading(false));

  // Modal (Part 3)
  document.getElementById("openModal").addEventListener("click", openModal);
  document.getElementById("closeModal").addEventListener("click", closeModal);
});