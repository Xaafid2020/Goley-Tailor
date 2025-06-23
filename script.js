// Mobile Navigation Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');

mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Testimonials Slider
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial');

function showTestimonial(index) {
    testimonials.forEach(testimonial => {
        testimonial.classList.remove('active');
    });
    
    if (testimonials[index]) {
        testimonials[index].classList.add('active');
    }
}

function changeTestimonial(direction) {
    currentTestimonial += direction;
    
    if (currentTestimonial >= testimonials.length) {
        currentTestimonial = 0;
    } else if (currentTestimonial < 0) {
        currentTestimonial = testimonials.length - 1;
    }
    
    showTestimonial(currentTestimonial);
}

// Auto-advance testimonials
if (testimonials.length > 0) {
    setInterval(() => {
        changeTestimonial(1);
    }, 5000);
}

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Simple validation
        if (!data.name || !data.email || !data.service || !data.message) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Simulate form submission
        alert('Thank you for your message! We will get back to you within 24 hours.');
        contactForm.reset();
    });
}

// Gallery Filter Functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        galleryItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 10);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Gallery Modal Functionality
const modal = document.getElementById('galleryModal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalService = document.getElementById('modalService');
const modalTimeline = document.getElementById('modalTimeline');
const modalMaterials = document.getElementById('modalMaterials');

// Sample data for modal content
const galleryData = {
    'Navy Blue Custom Suit': {
        service: 'Custom Suit',
        timeline: '3-4 weeks',
        materials: 'Premium wool blend, silk lining'
    },
    'Charcoal Grey Suit': {
        service: 'Custom Suit',
        timeline: '3-4 weeks',
        materials: 'Italian wool, premium buttons'
    },
    'Brown Tweed Suit': {
        service: 'Custom Suit',
        timeline: '4-5 weeks',
        materials: 'Harris Tweed, leather details'
    },
    'Black Tuxedo': {
        service: 'Formal Wear',
        timeline: '2-3 weeks',
        materials: 'Black wool, satin lapels'
    },
    'White Dinner Jacket': {
        service: 'Formal Wear',
        timeline: '2-3 weeks',
        materials: 'White wool, black silk trim'
    },
    'Morning Coat': {
        service: 'Formal Wear',
        timeline: '3-4 weeks',
        materials: 'Traditional wool, silver buttons'
    },
    'Custom Evening Dress': {
        service: 'Women\'s Tailoring',
        timeline: '2-3 weeks',
        materials: 'Silk chiffon, hand-sewn beading'
    },
    'Women\'s Business Suit': {
        service: 'Women\'s Tailoring',
        timeline: '2-3 weeks',
        materials: 'Wool blend, professional styling'
    },
    'Wedding Dress': {
        service: 'Women\'s Tailoring',
        timeline: '4-6 weeks',
        materials: 'Silk satin, lace details'
    },
    'Suit Alteration': {
        service: 'Alterations',
        timeline: '3-5 days',
        materials: 'Matching thread, professional pressing'
    },
    'Dress Hemming': {
        service: 'Alterations',
        timeline: '1-2 days',
        materials: 'Invisible hem, professional finish'
    },
    'Jacket Tailoring': {
        service: 'Alterations',
        timeline: '5-7 days',
        materials: 'Precision fitting, quality craftsmanship'
    },
    'Pinstripe Suit': {
        service: 'Custom Suit',
        timeline: '3-4 weeks',
        materials: 'Pinstripe wool, classic styling'
    },
    'Velvet Blazer': {
        service: 'Formal Wear',
        timeline: '2-3 weeks',
        materials: 'Luxury velvet, silk lining'
    },
    'Cocktail Dress': {
        service: 'Women\'s Tailoring',
        timeline: '2-3 weeks',
        materials: 'Designer fabric, custom fit'
    }
};

function openModal(button) {
    const galleryItem = button.closest('.gallery-item');
    const img = galleryItem.querySelector('img');
    const title = galleryItem.querySelector('h3').textContent;
    const description = galleryItem.querySelector('p').textContent;
    
    modalImage.src = img.src;
    modalImage.alt = img.alt;
    modalTitle.textContent = title;
    modalDescription.textContent = description;
    
    // Set additional details from data
    const data = galleryData[title] || {
        service: 'Custom Tailoring',
        timeline: '2-4 weeks',
        materials: 'Premium materials'
    };
    
    modalService.textContent = data.service;
    modalTimeline.textContent = data.timeline;
    modalMaterials.textContent = data.materials;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside of it
if (modal) {
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
}

// FAQ Functionality
function toggleFAQ(element) {
    const faqItem = element.parentElement;
    const isActive = faqItem.classList.contains('active');
    
    // Close all FAQ items
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Open clicked item if it wasn't active
    if (!isActive) {
        faqItem.classList.add('active');
    }
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.service-card, .feature, .value-card, .team-member, .step').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// Navbar scroll effect
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling down
        navbar.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
});

// Form validation helpers
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\+]?[1-9][\d]{0,15}$/;
    return re.test(phone.replace(/\s/g, ''));
}

// Add loading states to buttons
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(e) {
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Re-enable after 3 seconds (simulated)
            setTimeout(() => {
                submitBtn.textContent = 'Send Message';
                submitBtn.disabled = false;
            }, 3000);
        }
    });
});

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    const currentYear = new Date().getFullYear();
    const yearElements = document.querySelectorAll('.current-year');
    yearElements.forEach(el => {
        el.textContent = currentYear;
    });
    
    // Initialize testimonials
    if (testimonials.length > 0) {
        showTestimonial(0);
    }
    
    // Add hover effects to gallery items
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
});

// Preload images for better performance
function preloadImages() {
    const images = [
        '/placeholder.svg?height=500&width=600',
        '/placeholder.svg?height=400&width=500',
        '/placeholder.svg?height=300&width=300'
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Call preload on page load
window.addEventListener('load', preloadImages);

// Add keyboard navigation for accessibility
document.addEventListener('keydown', function(e) {
    // Close modal with Escape key
    if (e.key === 'Escape' && modal && modal.style.display === 'block') {
        closeModal();
    }
    
    // Navigate testimonials with arrow keys
    if (testimonials.length > 0) {
        if (e.key === 'ArrowLeft') {
            changeTestimonial(-1);
        } else if (e.key === 'ArrowRight') {
            changeTestimonial(1);
        }
    }
});

// Add focus management for better accessibility
function manageFocus() {
    const focusableElements = document.querySelectorAll(
        'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid #8B4513';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
        });
    });
}

// Initialize focus management
document.addEventListener('DOMContentLoaded', manageFocus);