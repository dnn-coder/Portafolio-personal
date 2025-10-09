// Smooth scrolling for navigation links
document.querySelectorAll('.nav-menu a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth'
        });
        // Close mobile menu after clicking
        document.querySelector('.nav-menu').classList.remove('active');
        document.querySelector('.hamburger').classList.remove('active');
        document.querySelector('.hamburger').setAttribute('aria-expanded', 'false');
    });
});

// Hamburger menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
    hamburger.classList.toggle('open');
    const isExpanded = navMenu.classList.contains('active');
    hamburger.setAttribute('aria-expanded', isExpanded);
});

// Project filters
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        projectCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            if (filterValue === 'all' || cardCategory === filterValue) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Scroll animations using Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Animate progress bars
            if (entry.target.classList.contains('skill-card')) {
                const progressBar = entry.target.querySelector('.progress');
                const width = progressBar.style.width;
                progressBar.style.width = '0';
                setTimeout(() => {
                    progressBar.style.width = width;
                }, 100);
            }
        }
    });
}, observerOptions);

// Observe project cards and skill cards
projectCards.forEach(card => {
    observer.observe(card);
});

const skillCards = document.querySelectorAll('.skill-card');
skillCards.forEach(card => {
    observer.observe(card);
});

// Create twinkling stars
document.addEventListener('DOMContentLoaded', () => {
    const starsContainer = document.querySelector('.stars');
    const hero = document.querySelector('.hero');
    const numberOfStars = 150;
    const stars = [];

    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        const rand = Math.random();
        if (rand > 0.8) { // 20% chance to be solid no glow
            star.classList.add('solid-no-glow');
        } else if (rand > 0.6) { // 20% chance to be solid with glow
            star.classList.add('solid-star');
        }
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        const size = Math.random() * 5 + 2;
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        if (size < 4) {
            star.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
        } else {
            star.style.backgroundColor = 'rgba(255, 255, 255, 0.4)';
        }
        star.style.animationDelay = Math.random() * 2 + 's';
        starsContainer.appendChild(star);
        stars.push(star);
    }

    // Mouse parallax effect
    hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const moveX = (mouseX - centerX) * 0.03;
        const moveY = (mouseY - centerY) * 0.03;

        stars.forEach(star => {
            star.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    });
});

// Footer remains static at bottom