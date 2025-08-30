const toggleBtn = document.getElementById('toggle-mode');
const modeIcon = document.getElementById('mode-icon');

// Ripple effect on click
document.addEventListener('click', function (e) {
  const ripple = document.createElement('div');
  ripple.className = 'ripple';
  ripple.style.left = `${e.pageX - 10}px`;
  ripple.style.top = `${e.pageY - 10}px`;
  ripple.style.width = ripple.style.height = '20px';
  document.body.appendChild(ripple);
  setTimeout(() => ripple.remove(), 600);
});

// Dark mode toggle
function updateIcon(isDark) {
  modeIcon.src = isDark ? 'icons/sun.svg' : 'icons/moon.svg';
  modeIcon.alt = isDark ? 'Switch to light mode' : 'Switch to dark mode';
}
const savedMode = localStorage.getItem('darkMode') === 'true';
if (savedMode) {
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
//menu
const menuToggle = document.getElementById("menu-toggle");
const sidebar = document.querySelector(".sidebar");
const mainContent = document.querySelector(".main-content");

menuToggle.addEventListener("click", () => {
  sidebar.classList.toggle("hidden");
  mainContent.classList.toggle("sidebar-hidden");
});

// toggle submenu
document.querySelectorAll('.submenu-toggle').forEach(button => {
  button.addEventListener('click', () => {
    const submenu = button.nextElementSibling;
    submenu.style.display = submenu.style.display === 'flex' ? 'none' : 'flex';
  });
});


//gallery container
document.querySelectorAll('.gallery-container').forEach(gallery => {
  let slides = gallery.querySelectorAll('.slide');
  let current = 0;

  const showSlide = (index) => {
    slides.forEach((slide, i) => {
      slide.style.display = i === index ? 'block' : 'none';
    });
    // Update active pagination
    gallery.querySelectorAll('.pagination a').forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }

  // Show first slide
  showSlide(current);

  // Next/Prev buttons
  gallery.querySelectorAll('.next').forEach(nextBtn => {
    nextBtn.addEventListener('click', () => {
      current = (current + 1) % slides.length;
      showSlide(current);
    });
  });

  gallery.querySelectorAll('.prev').forEach(prevBtn => {
    prevBtn.addEventListener('click', () => {
      current = (current - 1 + slides.length) % slides.length;
      showSlide(current);
    });
  });

  // Pagination dots
  gallery.querySelectorAll('.pagination a').forEach((dot, index) => {
    dot.addEventListener('click', (e) => {
      e.preventDefault();
      current = index;
      showSlide(current);
    });
  });
});

//--------second interface for zoom in and out for the big image 
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const mapImg = document.getElementById("map1");
const closeBtn = document.querySelector(".close");
const zoomIn = document.getElementById("zoom-in");
const zoomOut = document.getElementById("zoom-out");

let scale = 1;

// Open lightbox
mapImg.onclick = () => {
  lightbox.style.display = "block";
  lightboxImg.src = mapImg.src;
  scale = 1;
  lightboxImg.style.transform = `scale(${scale})`;
};

// Close lightbox
closeBtn.onclick = () => {
  lightbox.style.display = "none";
};

// Zoom in
zoomIn.onclick = () => {
  scale += 0.2;
  lightboxImg.style.transform = `scale(${scale})`;
};

// Zoom out
zoomOut.onclick = () => {
  scale -= 0.2;
  if (scale < 0.2) scale = 0.2; // minimum size
  lightboxImg.style.transform = `scale(${scale})`;
};

// Close lightbox if clicking outside the image
lightbox.onclick = (e) => {
  if (e.target === lightbox) {
    lightbox.style.display = "none";
  }
};
