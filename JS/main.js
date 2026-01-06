/**
 * ============================================
 * PORTFOLIO MAIN JAVASCRIPT
 * ============================================
 * Author: Your Name
 * Version: 1.0.0
 * ============================================
 */


// ============================================
// NEON CIRCUIT BOARD ANIMATION
// ============================================
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');

// Canvas Sizing
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Configuration
const config = {
    lineCount: 40,      // How many 'signals' are moving at once
    speed: 3,           // Speed of the signals
    turnChance: 0.05,   // Chance to turn 90 degrees
    baseWidth: 2,       // Thickness of lines
    fadeRate: 0.05,     // How fast trails fade (lower = longer trails)
    colors: [
        '#6c63ff', // Your Primary Purple
        '#00d9ff', // Your Secondary Cyan
        '#ff0055', // An accent Red (for "Security Alert" vibes)
        '#ffffff'  // White for high energy
    ]
};

class Signal {
    constructor() {
        this.reset();
    }

    reset() {
        // Start from a random edge or random point
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        
        // Snap to a grid (every 10px) to make it look like a circuit
        this.x = Math.floor(this.x / 10) * 10;
        this.y = Math.floor(this.y / 10) * 10;

        // Choose a random cardinal direction (Up, Down, Left, Right)
        const dirs = [
            { x: config.speed, y: 0 },
            { x: -config.speed, y: 0 },
            { x: 0, y: config.speed },
            { x: 0, y: -config.speed }
        ];
        this.dir = dirs[Math.floor(Math.random() * dirs.length)];
        
        this.color = config.colors[Math.floor(Math.random() * config.colors.length)];
        this.life = 0;
        this.maxLife = Math.random() * 100 + 50; // How long the line draws before resetting
    }

    update() {
        // Save previous position for drawing
        const prevX = this.x;
        const prevY = this.y;

        // Move
        this.x += this.dir.x;
        this.y += this.dir.y;
        this.life++;

        // Randomly turn 90 degrees
        if (Math.random() < config.turnChance) {
            // If moving horizontally, switch to vertical
            if (this.dir.x !== 0) {
                this.dir.x = 0;
                this.dir.y = Math.random() > 0.5 ? config.speed : -config.speed;
            } 
            // If moving vertically, switch to horizontal
            else {
                this.dir.y = 0;
                this.dir.x = Math.random() > 0.5 ? config.speed : -config.speed;
            }
        }

        // Draw the segment
        ctx.beginPath();
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(this.x, this.y);
        ctx.strokeStyle = this.color;
        ctx.lineWidth = config.baseWidth;
        ctx.lineCap = 'square';
        
        // Add a "Glow" effect
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        
        ctx.stroke();
        
        // Reset shadow for performance
        ctx.shadowBlur = 0;

        // Reset if out of bounds or life over
        if (
            this.x < 0 || 
            this.x > canvas.width || 
            this.y < 0 || 
            this.y > canvas.height || 
            this.life > this.maxLife
        ) {
            this.reset();
        }
    }
}

// Initialize Signals
const signals = [];
for (let i = 0; i < config.lineCount; i++) {
    signals.push(new Signal());
}

function animate() {
    // Instead of clearing the canvas completely, we draw a semi-transparent 
    // black rectangle. This creates the "fading trail" effect.
    ctx.fillStyle = `rgba(5, 5, 5, ${config.fadeRate})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    signals.forEach(signal => signal.update());

    requestAnimationFrame(animate);
}

// Handle Window Resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.fillStyle = '#050505';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
});

// Start Animation
animate();


// ============================================
// PRELOADER
// ============================================
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    
    setTimeout(() => {
        preloader.classList.add('loaded');
    }, 500);
});

// ============================================
// CUSTOM CURSOR
// ============================================
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    }, 100);
});

// Add hover effect to interactive elements
const interactiveElements = document.querySelectorAll('a, button, .project-card, .tool-item');

interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
        cursorFollower.classList.add('hover');
    });
    
    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
        cursorFollower.classList.remove('hover');
    });
});

// ============================================
// THEME TOGGLE (Dark/Light Mode)
// ============================================
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    themeIcon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
}

// ============================================
// MOBILE MENU TOGGLE
// ============================================
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

// Close menu when clicking nav links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// ============================================
// HEADER SCROLL EFFECT
// ============================================
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ============================================
// ACTIVE NAV LINK ON SCROLL
// ============================================
const sections = document.querySelectorAll('section[id]');

function highlightNavLink() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector(`.nav-link[href*="${sectionId}"]`)?.classList.add('active');
        } else {
            document.querySelector(`.nav-link[href*="${sectionId}"]`)?.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', highlightNavLink);

// ============================================
// TYPED TEXT EFFECT
// ============================================
const typedTextElement = document.getElementById('typed-text');
const textArray = ['Web Developer', 'UI/UX Designer', 'Full Stack Developer', 'Problem Solver'];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeText() {
    const currentText = textArray[textIndex];
    if (isDeleting) {
        typedTextElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50; // Faster when deleting
    } else {
        typedTextElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100; // Normal typing speed
    }

    if (!isDeleting && charIndex === currentText.length) {
        // Finished typing word
        isDeleting = true;
        typingSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        // Finished deleting word
        isDeleting = false;
        textIndex = (textIndex + 1) % textArray.length;
        typingSpeed = 500; // Pause before new word
    }

    setTimeout(typeText, typingSpeed);
}

// Initialize Typewriter
document.addEventListener('DOMContentLoaded', typeText);

// ============================================
// SKILLS PROGRESS BAR ANIMATION
// ============================================
const skillsSection = document.getElementById('skills');
const progressBars = document.querySelectorAll('.skill-progress');

function showProgress() {
    progressBars.forEach(progressBar => {
        const value = progressBar.dataset.progress;
        progressBar.style.width = `${value}%`;
    });
}

function hideProgress() {
    progressBars.forEach(progressBar => {
        progressBar.style.width = 0;
    });
}

// Use Intersection Observer to trigger animation
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            showProgress();
        } else {
            hideProgress();
        }
    });
}, { threshold: 0.5 });

if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

// ============================================
// PROJECT FILTERING
// ============================================
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                card.classList.remove('hidden');
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 200);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    card.classList.add('hidden');
                }, 200);
            }
        });
    });
});

// ============================================
// TESTIMONIALS SLIDER
// ============================================
const track = document.getElementById('testimonials-track');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const dotsContainer = document.getElementById('slider-dots');

if (track) {
    const cards = document.querySelectorAll('.testimonial-card');
    let currentIndex = 0;
    
    // Create dots
    cards.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('slider-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.slider-dot');

    function updateSlider() {
        // Calculate percentage to slide based on card width
        // Note: Logic implies 1 card visible on mobile, 2 on tablet, 3 on desktop
        // For simplicity, we slide by item index assuming refined CSS flex logic
        const cardWidth = cards[0].offsetWidth; 
        track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        
        // Update dots
        dots.forEach(dot => dot.classList.remove('active'));
        if (dots[currentIndex]) dots[currentIndex].classList.add('active');
    }

    function goToSlide(index) {
        // Boundary checks based on viewport
        const maxIndex = window.innerWidth >= 1024 ? cards.length - 3 : 
                         window.innerWidth >= 768 ? cards.length - 2 : cards.length - 1;
        
        if (index < 0) index = maxIndex;
        if (index > maxIndex) index = 0;
        
        currentIndex = index;
        updateSlider();
    }

    prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
    nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));

    // Handle Resize
    window.addEventListener('resize', () => {
        goToSlide(0); // Reset on resize to prevent alignment issues
    });
}

// ============================================
// CONTACT FORM HANDLING
// ============================================
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simulate form submission
        const btn = contactForm.querySelector('.btn-submit');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
        btn.disabled = true;

        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.disabled = false;
            formStatus.textContent = "Message sent successfully! I'll get back to you soon.";
            formStatus.className = 'form-status success';
            contactForm.reset();
            
            setTimeout(() => {
                formStatus.style.display = 'none';
            }, 5000);
        }, 2000);
    });
}

// ============================================
// BACK TO TOP BUTTON
// ============================================
const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ============================================
// SCROLL ANIMATIONS (Simple AOS)
// ============================================
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
        }
    });
}, observerOptions);

document.querySelectorAll('[data-aos]').forEach(el => {
    observer.observe(el);
});

// Update Copyright Year
document.getElementById('current-year').textContent = new Date().getFullYear();