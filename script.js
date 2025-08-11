let globalIntensity = 0;

// Analyze eruption input
function analyzeEruption(event) {
  event.preventDefault();
  const input = document.getElementById('eruptionInput').value;
  const intensity = Math.floor(Math.random() * 9) + 1; // VEI scale 1–9
  globalIntensity = intensity;

  document.getElementById('eruptionResult').textContent = `Last analyzed: ${input}`;
  document.getElementById('intensityFill').style.width = `${intensity * 10}%`;
  document.getElementById('intensityValue').textContent = `${intensity} VEI`;
}

// Simulate seismic activity
function simulateSeismic(level) {
  const box = document.getElementById('animatedBox');
  box.style.animation = level === 'high' ? 'pulse 0.6s ease' : 'pulse 1.2s ease';
  setTimeout(() => box.style.animation = '', 600);
}

// Animate lava pulse
function animateBox() {
  const box = document.getElementById('animatedBox');
  box.classList.add('animate');
  setTimeout(() => box.classList.remove('animate'), 600);
}

// Flip card
function flipCard(cardElement) {
  cardElement.classList.toggle('flip');
}

// Toggle ash cloud
function toggleLoader() {
  const loader = document.getElementById('loader');
  loader.classList.toggle('spin');
}

// Modal control
function showModal() {
  document.getElementById('modal').classList.add('show');
}
function hideModal() {
  document.getElementById