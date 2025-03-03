// DOM Elements
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('nav');
const header = document.querySelector('header');
const skillBars = document.querySelectorAll('.skill-progress');
const skillsSection = document.querySelector('.skills');
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const contactForm = document.getElementById('contactForm');
const revealElements = document.querySelectorAll('.section-header, .about-content, .skills-content, .projects-grid, .contact-content');

// Mobile Navigation
function toggleMobileNav() {
    hamburger.classList.toggle('active');
    nav.classList.toggle('active');
    document.body.classList.toggle('nav-open');
}

hamburger.addEventListener('click', toggleMobileNav);

// Close mobile nav when clicking outside
document.addEventListener('click', (e) => {
    if (nav.classList.contains('active') && 
        !nav.contains(e.target) && 
        !hamburger.contains(e.target)) {
        toggleMobileNav();
    }
});

// Close mobile nav when clicking links
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
        if (nav.classList.contains('active')) {
            toggleMobileNav();
        }
    });
});

// Smooth scrolling with offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const headerOffset = 70;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Sticky header with throttle
let lastScrollTop = 0;
let ticking = false;

function updateHeader() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScrollTop = scrollTop;
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            updateHeader();
        });
        ticking = true;
    }
});

// Projects filtering with animation
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        // Filter projects with fade effect
        projectCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.8)';
            
            setTimeout(() => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.display = 'none';
                }
            }, 300);
        });
    });
});

// Skills animation with IntersectionObserver
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            skillBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            });
            skillsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

skillsObserver.observe(skillsSection);

// Form submission with validation
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Basic form validation
    const formData = new FormData(this);
    let isValid = true;
    let errorMessages = [];

    formData.forEach((value, key) => {
        if (!value.trim()) {
            isValid = false;
            errorMessages.push(`${key.charAt(0).toUpperCase() + key.slice(1)} is required`);
        }
        if (key === 'email' && !isValidEmail(value)) {
            isValid = false;
            errorMessages.push('Please enter a valid email address');
        }
    });

    if (!isValid) {
        alert(errorMessages.join('\n'));
        return;
    }

    // Simulate form submission
    const submitButton = contactForm.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';

    setTimeout(() => {
        alert('Your message has been sent successfully!');
        contactForm.reset();
        submitButton.disabled = false;
        submitButton.textContent = 'Send Message';
    }, 1500);
});

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Reveal animations with IntersectionObserver
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(element => {
    revealObserver.observe(element);
});

// Handle window resize
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        if (window.innerWidth > 768 && nav.classList.contains('active')) {
            toggleMobileNav();
        }
    }, 250);
});

// Add revealed class for CSS animations
document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.textContent = `
        .section-header, .about-content, .skills-content, .projects-grid, .contact-content {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .revealed {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
});

// Journey Section Tab Switching
const journeyTabs = document.querySelectorAll('.journey-tabs .tab');
const journeySections = document.querySelectorAll('.journey-section');

journeyTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs and sections
        journeyTabs.forEach(t => t.classList.remove('active'));
        journeySections.forEach(section => section.classList.remove('active'));
        
        // Add active class to clicked tab
        tab.classList.add('active');
        
        // Show corresponding section
        const targetSection = document.getElementById(tab.getAttribute('data-tab'));
        targetSection.classList.add('active');
    });
});

// Toggle description for journey items
function toggleDescription(button) {
    const journeyItem = button.closest('.journey-item');
    const description = journeyItem.querySelector('.item-description');
    
    // Toggle active class on button and journey item
    button.classList.toggle('active');
    journeyItem.classList.toggle('expanded');
    
    // Animate the description
    if (journeyItem.classList.contains('expanded')) {
        description.style.display = 'block';
        setTimeout(() => {
            description.style.opacity = '1';
        }, 10);
    } else {
        description.style.opacity = '0';
        setTimeout(() => {
            description.style.display = 'none';
        }, 300);
    }
} 