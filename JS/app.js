// Loader - Show for a minimum time and wait for page load
const loaderStartTime = Date.now();
const MIN_LOADER_TIME = 1500; // Minimum display time in milliseconds

function hideLoader() {
    const loader = document.querySelector('.loader-wrapper');
    if (!loader) return;

    const elapsedTime = Date.now() - loaderStartTime;
    const remainingTime = Math.max(0, MIN_LOADER_TIME - elapsedTime);

    setTimeout(() => {
        loader.classList.add('hidden');
        // Remove from DOM after fade animation completes
        setTimeout(() => loader.remove(), 600);
    }, remainingTime);
}

// Wait for both DOM content and all resources (images, etc.)
window.addEventListener('load', hideLoader);

// Animate percentage counter
const percentageElement = document.querySelector('.percentage');
const statusText = document.querySelector('.status-text');
const detailLine = document.querySelector('.detail-line');

const statusMessages = [
    'INITIALIZING SYSTEM',
    'LOADING MODULES',
    'COMPILING ASSETS',
    'ESTABLISHING CONNECTION',
    'SYSTEM READY'
];

const detailMessages = [
    '[ OK ] Loading modules...',
    '[ OK ] Checking dependencies...',
    '[ OK ] Rendering components...',
    '[ OK ] Optimizing performance...',
    '[ OK ] System online!'
];

let currentPercent = 0;
const percentInterval = setInterval(() => {
    if (currentPercent <= 100) {
        percentageElement.textContent = currentPercent + '%';
        
        // Update status messages at intervals
        if (currentPercent === 20) {
            statusText.textContent = statusMessages[1];
            detailLine.textContent = detailMessages[1];
        } else if (currentPercent === 40) {
            statusText.textContent = statusMessages[2];
            detailLine.textContent = detailMessages[2];
        } else if (currentPercent === 60) {
            statusText.textContent = statusMessages[3];
            detailLine.textContent = detailMessages[3];
        } else if (currentPercent === 90) {
            statusText.textContent = statusMessages[4];
            detailLine.textContent = detailMessages[4];
        }
        
        currentPercent += 2;
    } else {
        clearInterval(percentInterval);
    }
}, 50);

// Custom Cursor
const cursor = document.querySelector('.cursor');
const cursorDot = document.querySelector('.cursor-dot');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    cursorDot.style.left = e.clientX + 'px';
    cursorDot.style.top = e.clientY + 'px';
});

document.querySelectorAll('a, button, .skill-tag').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('active'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Active nav link
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// Mobile menu
const menuBtn = document.querySelector('.menu-btn');
const navLinksContainer = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    navLinksContainer.classList.toggle('active');
});

navLinksContainer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        menuBtn.classList.remove('active');
        navLinksContainer.classList.remove('active');
    });
});

// Theme toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-theme');
    const icon = themeToggle.querySelector('i');
    if (body.classList.contains('light-theme')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
});

// Mouse interactive gradient effect
const gradientSections = document.querySelectorAll('.about, .experience, .projects, .contact');

gradientSections.forEach(section => {
    section.addEventListener('mousemove', (e) => {
        const rect = section.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        section.style.setProperty('--mouse-x', `${x}%`);
        section.style.setProperty('--mouse-y', `${y}%`);
        section.style.backgroundPosition = `${x}% ${y}%`;
    });
    
    section.addEventListener('mouseleave', () => {
        section.style.setProperty('--mouse-x', '50%');
        section.style.setProperty('--mouse-y', '50%');
        section.style.backgroundPosition = '50% 50%';
    });
});

// Reveal on scroll
const reveals = document.querySelectorAll('.reveal');

function revealOnScroll() {
    reveals.forEach(reveal => {
        const windowHeight = window.innerHeight;
        const revealTop = reveal.getBoundingClientRect().top;
        const revealPoint = 150;

        if (revealTop < windowHeight - revealPoint) {
            reveal.classList.add('active');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

// Projects filter
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        projectCards.forEach(card => {
            if (filter === 'all' || card.dataset.category === filter) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Testimonials slider
const testimonials = document.querySelectorAll('.testimonial-card');
const dots = document.querySelectorAll('.testimonial-dots .dot');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
let currentSlide = 0;

// SAFEGUARD: Only run testimonial logic if the elements exist
if (testimonials.length > 0 && prevBtn && nextBtn) {
    function showSlide(index) {
        testimonials.forEach(t => t.classList.remove('active'));
        dots.forEach(d => d.classList.remove('active'));

        if (index >= testimonials.length) currentSlide = 0;
        if (index < 0) currentSlide = testimonials.length - 1;

        testimonials[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    prevBtn.addEventListener('click', () => {
        currentSlide--;
        showSlide(currentSlide);
    });

    nextBtn.addEventListener('click', () => {
        currentSlide++;
        showSlide(currentSlide);
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });

    // Auto slide
    setInterval(() => {
        currentSlide++;
        showSlide(currentSlide);
    }, 5000);
}

// Contact form
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Show success modal
        const modal = document.getElementById('success-modal');
        if (modal) {
            modal.classList.add('active');
        }
        // Reset form
        contactForm.reset();
    });
}

// Close Modal Function (needed for the onclick="closeModal()" in your HTML)
window.closeModal = function() {
    const modal = document.getElementById('success-modal');
    if (modal) {
        modal.classList.remove('active');
    }
}

/* -----------------------------------------------
   MODERN BACKGROUND ANIMATION (Constellation Effect)
   ----------------------------------------------- */
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');

let particlesArray;

// set canvas size to fill window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Handle resizing
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
});

// Mouse interaction
const mouse = {
    x: null,
    y: null,
    radius: 150
}

window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
});

// Clear mouse position when leaving window
window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
});

// Create Particle Class
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = (Math.random() * 2) + 1;
        this.speedX = (Math.random() * 1) - 0.5; // Random speed between -0.5 and 0.5
        this.speedY = (Math.random() * 1) - 0.5;
        
        // Use the theme colors (Indigo and Pink)
        this.color = Math.random() > 0.5 ? '#6366f1' : '#ec4899';
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Bounce off edges
        if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
        if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

function initParticles() {
    particlesArray = [];
    // Create number of particles based on screen size
    const numberOfParticles = (canvas.height * canvas.width) / 15000;
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}

function animateParticles() {
    requestAnimationFrame(animateParticles);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();

        // Draw lines between particles
        for (let j = i; j < particlesArray.length; j++) {
            const dx = particlesArray[i].x - particlesArray[j].x;
            const dy = particlesArray[i].y - particlesArray[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(99, 102, 241, ${1 - distance/100})`; // Fade out line
                ctx.lineWidth = 1;
                ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                ctx.stroke();
            }
        }
        
        // Draw lines to mouse
        if (mouse.x != null) {
            const dx = particlesArray[i].x - mouse.x;
            const dy = particlesArray[i].y - mouse.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < mouse.radius) {
                 ctx.beginPath();
                 ctx.strokeStyle = `rgba(236, 72, 153, ${1 - distance/mouse.radius})`; // Pink interaction line
                 ctx.lineWidth = 1;
                 ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                 ctx.lineTo(mouse.x, mouse.y);
                 ctx.stroke();
            }
        }
    }
}

// Initialize and Start
initParticles();
animateParticles();
