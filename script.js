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
        projectCards.forEach((card, index) => {
            // Set card index for staggered animation
            card.style.setProperty('--card-index', index);
            
            // Reset animation
            card.style.animation = 'none';
            card.offsetHeight; // Trigger reflow
            
            const cardCategories = card.getAttribute('data-category').split(' ');
            
            if (filterValue === 'all' && cardCategories.includes('all') || 
                cardCategories.includes(filterValue)) {
                card.classList.remove('hidden');
                // Re-trigger animation
                card.style.animation = '';
            } else {
                card.classList.add('hidden');
            }
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
function toggleDescription(element) {
    const journeyItem = element.closest('.journey-item');
    journeyItem.classList.toggle('expanded');
}

// Typing Animation
function typeText() {
    const text = "Arbin Shakya";
    const typedTextElement = document.getElementById('typed-text');
    const cursor = document.querySelector('.cursor');
    let charIndex = 0;

    function type() {
        if (charIndex < text.length) {
            typedTextElement.textContent += text.charAt(charIndex);
            charIndex++;
            setTimeout(type, 150);
        } else {
            // Hide cursor after typing is complete with a small delay
            setTimeout(() => {
                cursor.classList.add('hide');
            }, 800); // 1.5 second delay after typing finishes
        }
    }

    // Start typing after a small delay
    setTimeout(type, 500);
}

// Start typing animation when the page loads
document.addEventListener('DOMContentLoaded', typeText);

// Paper plane animation
document.querySelector('.primary-btn').addEventListener('click', function(e) {
    const btn = this;
    const plane = btn.querySelector('i');
    
    if (!btn.classList.contains('animate')) {
        btn.classList.add('animate');
        
        // Remove animation class after animation completes
        setTimeout(() => {
            btn.classList.remove('animate');
        }, 1200); // Match animation duration (1.2s)
    }
});

// Section title typing animation
function typeSectionTitle(element) {
    const titleSpan = element.querySelector('.section-title');
    const cursor = element.querySelector('.section-cursor');
    const text = titleSpan.getAttribute('data-text') || titleSpan.textContent;
    
    // Store original text if not already stored
    if (!titleSpan.getAttribute('data-text')) {
        titleSpan.setAttribute('data-text', text);
    }
    
    titleSpan.textContent = '';
    cursor.classList.remove('hide');
    cursor.classList.add('typing');
    
    let charIndex = 0;
    
    function type() {
        if (charIndex < text.length) {
            titleSpan.textContent += text.charAt(charIndex);
            charIndex++;
            setTimeout(type, 100);
        } else {
            // Hide cursor after typing is complete with a small delay
            setTimeout(() => {
                cursor.classList.remove('typing');
                cursor.classList.add('hide');
            }, 800);
        }
    }
    
    // Start typing
    type();
}

// Create intersection observer for section headers
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            typeSectionTitle(entry.target);
        }
    });
}, {
    threshold: 0.5,
    rootMargin: '-50px'
});

// Observe all section headers
document.querySelectorAll('.section-header').forEach(header => {
    // Store original text content
    const titleSpan = header.querySelector('.section-title');
    titleSpan.setAttribute('data-text', titleSpan.textContent);
    
    // Start observing
    sectionObserver.observe(header);
});

// Apply "All" filter by default when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Apply the filter for "all" category
    const allFilterBtn = document.querySelector('.filter-btn[data-filter="all"]');
    
    // Make sure all cards with "all" in their data-category are shown
    document.querySelectorAll('.project-card').forEach(card => {
        const cardCategories = card.getAttribute('data-category').split(' ');
        
        if (cardCategories.includes('all')) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
    
    // Ensure the "all" button is active
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    allFilterBtn.classList.add('active');
});

// Certificate carousel functionality
document.addEventListener('DOMContentLoaded', function() {
    const certificateInputs = document.querySelectorAll('.certificates input[type="radio"]');
    const container = document.querySelector('.certificates .container');
    const allCards = document.querySelectorAll('.certificates .card');
    const certificatesSection = document.querySelector('.certificates');
    
    // Create navigation dots
    createNavigationDots();
    
    // Initially show only first certificate and hide others
    limitVisibleCertificates();
    
    // Ensure only the first certificate is checked initially
    if (certificateInputs.length > 0) {
        certificateInputs[0].checked = true;
        certificateInputs[0].dispatchEvent(new Event('change'));
    }
    
    // Handle window resize for responsive behavior
    window.addEventListener('resize', function() {
        const activeInput = document.querySelector('.certificates input[type="radio"]:checked');
        if (activeInput) {
            const activeIndex = Array.from(certificateInputs).indexOf(activeInput);
            showBannersAroundSelected(activeIndex);
        } else {
            limitVisibleCertificates();
        }
    });
    
    certificateInputs.forEach((input, index) => {
        input.addEventListener('change', function() {
            // First, uncheck all other inputs to ensure only one is selected
            certificateInputs.forEach(otherInput => {
                if (otherInput !== this) {
                    otherInput.checked = false;
                }
            });
            
            // Hide all certificates first
            hideAllCertificates();
            
            // Show only the selected certificate at full width
            const isMobile = window.innerWidth <= 768;
            this.nextElementSibling.style.display = 'flex';
            this.nextElementSibling.style.width = '100%';
            this.nextElementSibling.style.maxWidth = isMobile ? '90vw' : '800px';
            this.nextElementSibling.style.minWidth = isMobile ? '280px' : '600px';
            
            // Show banners around the selected certificate
            showBannersAroundSelected(index);
            
            // Update dots
            updateDots(index);
            
            // Center the selected certificate
            centerCertificate(this.nextElementSibling);
        });
    });
    
    function createNavigationDots() {
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'certificates-dots';
        
        allCards.forEach((card, index) => {
            const dot = document.createElement('button');
            dot.className = 'certificates-dot';
            dot.setAttribute('data-index', index);
            dot.addEventListener('click', () => {
                // Uncheck all other inputs first
                certificateInputs.forEach(otherInput => {
                    otherInput.checked = false;
                });
                
                // Check the selected input
                certificateInputs[index].checked = true;
                certificateInputs[index].dispatchEvent(new Event('change'));
            });
            dotsContainer.appendChild(dot);
        });
        
        certificatesSection.appendChild(dotsContainer);
    }
    
    function limitVisibleCertificates() {
        const isMobile = window.innerWidth <= 768;
        const initialVisible = isMobile ? 1 : 2;
        
        allCards.forEach((card, index) => {
            if (index < initialVisible) {
                card.style.display = 'flex';
                card.style.width = isMobile ? '60px' : '80px';
                card.classList.remove('hidden');
            } else {
                card.style.display = 'none';
                card.classList.add('hidden');
            }
        });
    }
    
    function hideAllCertificates() {
        allCards.forEach(card => {
            card.style.display = 'none';
            card.classList.add('hidden');
        });
    }
    
    function showBannersAroundSelected(selectedIndex) {
        const totalCards = allCards.length;
        const isMobile = window.innerWidth <= 768;
        const visibleRange = isMobile ? 1 : 2; // Show 1 banner on each side for mobile, 2 for desktop
        
        // Show banners around the selected certificate
        for (let i = Math.max(0, selectedIndex - visibleRange); 
             i <= Math.min(totalCards - 1, selectedIndex + visibleRange); 
             i++) {
            if (i !== selectedIndex) {
                allCards[i].style.display = 'flex';
                allCards[i].style.width = isMobile ? '60px' : '80px';
                allCards[i].classList.remove('hidden');
            }
        }
    }
    
    function updateDots(activeIndex) {
        const dots = document.querySelectorAll('.certificates-dot');
        dots.forEach((dot, index) => {
            if (index === activeIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    function centerCertificate(selectedCard) {
        if (!container || !selectedCard) return;
        
        const containerWidth = container.offsetWidth;
        const cardWidth = selectedCard.offsetWidth;
        const cardOffsetLeft = selectedCard.offsetLeft;
        
        // Calculate the scroll position to center the card
        const scrollLeft = cardOffsetLeft - (containerWidth / 2) + (cardWidth / 2);
        
        // Smooth scroll to center the card
        container.scrollTo({
            left: scrollLeft,
            behavior: 'smooth'
        });
    }
}); 