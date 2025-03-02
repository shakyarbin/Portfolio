// Toggle mobile navigation
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('nav');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    nav.classList.toggle('active');
});

// Close mobile navigation when clicking on a link
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        nav.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// Sticky header on scroll
const header = document.querySelector('header');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        header.style.padding = '15px 100px';
        header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.padding = '20px 100px';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    // Responsive padding adjustment
    if (window.innerWidth <= 1024 && window.innerWidth > 768) {
        if (scrollTop > 100) {
            header.style.padding = '15px 50px';
        } else {
            header.style.padding = '20px 50px';
        }
    } else if (window.innerWidth <= 768) {
        if (scrollTop > 100) {
            header.style.padding = '15px 30px';
        } else {
            header.style.padding = '20px 30px';
        }
    }
    
    lastScrollTop = scrollTop;
});

// Projects filtering
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
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Skills animation on scroll
const skillBars = document.querySelectorAll('.skill-progress');
const skillsSection = document.querySelector('.skills');

function animateSkills() {
    const sectionTop = skillsSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (sectionTop < windowHeight - 100) {
        skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        });
        
        window.removeEventListener('scroll', animateSkills);
    }
}

window.addEventListener('scroll', animateSkills);

// Form submission
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Here you would typically send the form data to a server
    // For demonstration, we'll just log it to the console
    console.log({
        name,
        email,
        subject,
        message
    });
    
    // Show success message (in a real application)
    alert('Your message has been sent successfully!');
    
    // Reset form
    contactForm.reset();
});

// Reveal animations on scroll
const revealElements = document.querySelectorAll('.section-header, .about-content, .skills-content, .projects-grid, .contact-content');

function revealOnScroll() {
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('revealed');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

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