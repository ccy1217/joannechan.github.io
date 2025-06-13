const toggleBtn = document.getElementById('toggle-mode');
const modeIcon = document.getElementById('mode-icon');

function updateIcon(isDark) {
  modeIcon.src = isDark ? 'icons/sun.svg' : 'icons/moon.svg';
  modeIcon.alt = isDark ? 'Switch to light mode' : 'Switch to dark mode';
}

const userPrefersDark = localStorage.getItem('darkMode') === 'true';
if (userPrefersDark) {
  document.body.classList.add('dark-mode');
  updateIcon(true);
} else {
  updateIcon(false);
}

toggleBtn.addEventListener('click', () => {
  const isDark = document.body.classList.toggle('dark-mode');
  localStorage.setItem('darkMode', isDark);
  updateIcon(isDark);
});

