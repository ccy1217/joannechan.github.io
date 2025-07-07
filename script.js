const toggleBtn = document.getElementById('toggle-mode');
const modeIcon = document.getElementById('mode-icon');

function updateIcon(isDark) {
  modeIcon.src = isDark ? 'icons/sun.svg' : 'icons/moon.svg';
  modeIcon.alt = isDark ? 'Switch to light mode' : 'Switch to dark mode';
}

// Check saved mode
const savedMode = localStorage.getItem('darkMode') === 'true';
if (savedMode) {
  document.body.classList.add('dark-mode');
  updateIcon(true);
} else {
  updateIcon(false);
}

// Toggle dark mode
toggleBtn.addEventListener('click', () => {
  const isDark = document.body.classList.toggle('dark-mode');
  localStorage.setItem('darkMode', isDark);
  updateIcon(isDark);
});
// water ripple mouse effect when clicking
document.addEventListener('click', function (e) {
  const ripple = document.createElement('div');
  ripple.className = 'ripple';

  ripple.style.left = `${e.pageX - 10}px`;
  ripple.style.top = `${e.pageY - 10}px`;
  ripple.style.width = ripple.style.height = '20px'; // initial size

  document.body.appendChild(ripple);

  setTimeout(() => {
    ripple.remove();
  }, 600); // same as animation duration
});

const cursor = document.getElementById('custom-cursor');
document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.pageX + 'px';
  cursor.style.top = e.pageY + 'px';
});
