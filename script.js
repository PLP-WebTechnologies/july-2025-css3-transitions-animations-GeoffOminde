const modalDisplayTime = 4000;

/**
 * Displays a modal element temporarily using animation class
 * @param {string} id - Element ID of the modal to show
 */
function showModal(id) {
  const modal = document.getElementById(id);
  modal.classList.add('visible');
  modal.setAttribute('aria-hidden', 'false');

  setTimeout(() => {
    modal.classList.remove('visible');
    modal.setAttribute('aria-hidden', 'true');
  }, modalDisplayTime);
}

/**
 * Example: Utility function that returns animation speed
 */
function calculateSpeed(distance, time) {
  return distance / time;
}