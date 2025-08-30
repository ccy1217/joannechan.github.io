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
const zoomInBtn = document.getElementById("zoom-in");
const zoomOutBtn = document.getElementById("zoom-out");
const closeBtn = document.querySelector(".lightbox .close");
const prevBtn = document.querySelector(".lightbox .prev");
const nextBtn = document.querySelector(".lightbox .next");

let currentScale = 1;
let currentIndex = 0;
let galleryImages = [];

// Open lightbox and initialize gallery
document.querySelectorAll(".zoomable").forEach((img, index) => {
  img.addEventListener("click", () => {
    galleryImages = Array.from(document.querySelectorAll(".zoomable"));
    currentIndex = index;
    openLightbox();
  });
});

function openLightbox() {
  lightbox.style.display = "flex";
  currentScale = 1;
  updateLightboxImage();
}

function updateLightboxImage() {
  lightboxImg.src = galleryImages[currentIndex].src;
  lightboxImg.style.transform = `scale(${currentScale})`;
}

// Zoom controls
zoomInBtn.addEventListener("click", () => {
  currentScale += 0.2;
  lightboxImg.style.transform = `scale(${currentScale})`;
});

zoomOutBtn.addEventListener("click", () => {
  if (currentScale > 0.4) currentScale -= 0.2;
  lightboxImg.style.transform = `scale(${currentScale})`;
});

// Navigation
prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
  currentScale = 1;
  updateLightboxImage();
});

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % galleryImages.length;
  currentScale = 1;
  updateLightboxImage();
});

// Close lightbox
closeBtn.addEventListener("click", () => {
  lightbox.style.display = "none";
});



