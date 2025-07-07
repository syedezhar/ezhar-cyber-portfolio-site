
// Typing Animation
const typingText = document.querySelector('.typing-text');
const roles = [
    'CSE (IoT) Student',
    'Cybersecurity Enthusiast',
    'Innovation Driver',
    'Tech Explorer'
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeRole() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        typingText.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }
    
    let typeSpeed = isDeleting ? 100 : 150;
    
    if (!isDeleting && charIndex === currentRole.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeSpeed = 500;
    }
    
    setTimeout(typeRole, typeSpeed);
}

// Particles Animation
class ParticleSystem {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.resize();
        this.createParticles();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createParticles() {
        const particleCount = Math.floor((this.canvas.width * this.canvas.height) / 15000);
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach((particle, index) => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Bounce off edges
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;
            
            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(0, 255, 136, ${particle.opacity})`;
            this.ctx.fill();
            
            // Draw connections
            this.particles.slice(index + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(otherParticle.x, otherParticle.y);
                    this.ctx.strokeStyle = `rgba(0, 255, 136, ${0.2 * (1 - distance / 100)})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.stroke();
                }
            });
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Navigation
class Navigation {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.hamburger = document.querySelector('.hamburger');
        this.navMenu = document.querySelector('.nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        
        this.initializeNavigation();
        this.handleScroll();
    }
    
    initializeNavigation() {
        // Mobile menu toggle
        this.hamburger.addEventListener('click', () => {
            this.navMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on links
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.navMenu.classList.remove('active');
            });
        });
        
        // Smooth scroll for navigation links
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    handleScroll() {
        window.addEventListener('scroll', () => {
            // Add background to navbar on scroll
            if (window.scrollY > 50) {
                this.navbar.style.background = 'rgba(10, 10, 10, 0.98)';
            } else {
                this.navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            }
            
            // Update active navigation link
            this.updateActiveLink();
        });
    }
    
    updateActiveLink() {
        const sections = document.querySelectorAll('.section');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                this.navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
}

// Scroll Animations
class ScrollAnimations {
    constructor() {
        this.elements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in');
        this.handleScroll();
        window.addEventListener('scroll', () => this.handleScroll());
    }
    
    handleScroll() {
        this.elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('animate');
            }
        });
    }
}

// Skills Animation
class SkillsAnimation {
    constructor() {
        this.skillBars = document.querySelectorAll('.skill-progress');
        this.animateSkills();
        window.addEventListener('scroll', () => this.animateSkills());
    }
    
    animateSkills() {
        this.skillBars.forEach(bar => {
            const barTop = bar.getBoundingClientRect().top;
            
            if (barTop < window.innerHeight - 100 && !bar.classList.contains('animated')) {
                const width = bar.getAttribute('data-width');
                bar.style.width = width;
                bar.classList.add('animated');
            }
        });
    }
}

// Testimonials Slider
class TestimonialsSlider {
    constructor() {
        this.slides = document.querySelectorAll('.testimonial-card');
        this.dots = document.querySelectorAll('.dot');
        this.currentSlide = 0;
        
        this.initializeSlider();
        this.autoSlide();
    }
    
    initializeSlider() {
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.goToSlide(index);
            });
        });
    }
    
    goToSlide(index) {
        this.slides[this.currentSlide].classList.remove('active');
        this.dots[this.currentSlide].classList.remove('active');
        
        this.currentSlide = index;
        
        this.slides[this.currentSlide].classList.add('active');
        this.dots[this.currentSlide].classList.add('active');
    }
    
    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.slides.length;
        this.goToSlide(nextIndex);
    }
    
    autoSlide() {
        setInterval(() => {
            this.nextSlide();
        }, 5000);
    }
}

// Contact Form
class ContactForm {
    constructor() {
        this.form = document.querySelector('.contact-form');
        this.initializeForm();
    }
    
    initializeForm() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });
    }
    
    handleSubmit() {
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);
        
        // Simulate form submission
        this.showSuccessMessage();
        this.form.reset();
    }
    
    showSuccessMessage() {
        const button = this.form.querySelector('.btn-primary');
        const originalText = button.textContent;
        
        button.textContent = 'Message Sent!';
        button.style.background = 'linear-gradient(135deg, #00ff88, #00cc6a)';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
        }, 3000);
    }
}

// Certificate Modal
class CertificateModal {
    constructor() {
        this.modal = document.getElementById('certificateModal');
        this.closeBtn = document.querySelector('.close');
        this.certificateButtons = document.querySelectorAll('.view-certificate');
        
        this.initializeModal();
    }
    
    initializeModal() {
        this.certificateButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.openModal();
            });
        });
        
        this.closeBtn.addEventListener('click', () => {
            this.closeModal();
        });
        
        window.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });
    }
    
    openModal() {
        this.modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
    
    closeModal() {
        this.modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Scroll Indicator
class ScrollIndicator {
    constructor() {
        this.scrollIndicator = document.querySelector('.scroll-indicator');
        this.initializeScrollIndicator();
    }
    
    initializeScrollIndicator() {
        this.scrollIndicator.addEventListener('click', () => {
            const aboutSection = document.getElementById('about');
            aboutSection.scrollIntoView({ behavior: 'smooth' });
        });
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                this.scrollIndicator.style.opacity = '0';
            } else {
                this.scrollIndicator.style.opacity = '1';
            }
        });
    }
}

// Statistics Counter Animation
class StatsCounter {
    constructor() {
        this.counters = document.querySelectorAll('.stat-number');
        this.animateCounters();
        window.addEventListener('scroll', () => this.animateCounters());
    }
    
    animateCounters() {
        this.counters.forEach(counter => {
            const counterTop = counter.getBoundingClientRect().top;
            
            if (counterTop < window.innerHeight - 100 && !counter.classList.contains('counted')) {
                counter.classList.add('counted');
                this.animateCounter(counter);
            }
        });
    }
    
    animateCounter(counter) {
        const target = parseInt(counter.textContent);
        const increment = target / 50;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + '+';
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + '+';
            }
        };
        
        updateCounter();
    }
}

// Project Management (for future use)
class ProjectManager {
    constructor() {
        this.projects = [];
        this.addProjectBtn = document.querySelector('.add-project-btn .btn-primary');
        this.initializeProjectManager();
    }
    
    initializeProjectManager() {
        this.addProjectBtn.addEventListener('click', () => {
            this.showAddProjectForm();
        });
    }
    
    showAddProjectForm() {
        // This would open a modal or form to add new projects
        alert('Project management functionality will be implemented here. This allows easy addition of new projects without editing code.');
    }
    
    addProject(projectData) {
        // This would add a new project card to the grid
        this.projects.push(projectData);
        this.renderProjects();
    }
    
    renderProjects() {
        // This would re-render the projects grid
        console.log('Rendering projects:', this.projects);
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Start typing animation
    setTimeout(typeRole, 1000);
    
    // Initialize particle system
    const particlesCanvas = document.getElementById('particles');
    new ParticleSystem(particlesCanvas);
    
    // Initialize all components
    new Navigation();
    new ScrollAnimations();
    new SkillsAnimation();
    new TestimonialsSlider();
    new ContactForm();
    new CertificateModal();
    new ScrollIndicator();
    new StatsCounter();
    new ProjectManager();
    
    // Add fade-in classes to elements for animation
    const elementsToAnimate = [
        '.about-text',
        '.about-visual',
        '.project-card',
        '.skill-item',
        '.certificate-card',
        '.contact-info',
        '.contact-form'
    ];
    
    elementsToAnimate.forEach(selector => {
        document.querySelectorAll(selector).forEach((element, index) => {
            element.classList.add('fade-in');
            element.style.animationDelay = `${index * 0.1}s`;
        });
    });
});

// Performance optimizations
window.addEventListener('load', () => {
    // Preload critical resources
    const preloadLinks = [
        'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@300;400;500;600;700&display=swap'
    ];
    
    preloadLinks.forEach(href => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = href;
        document.head.appendChild(link);
    });
});

// Utility functions for future updates
const Utils = {
    // Function to easily update content
    updateContent: (selector, content) => {
        const element = document.querySelector(selector);
        if (element) {
            element.innerHTML = content;
        }
    },
    
    // Function to add new skills
    addSkill: (category, skillName, percentage) => {
        const categoryElement = document.querySelector(`[data-category="${category}"] .skill-items`);
        if (categoryElement) {
            const skillHTML = `
                <div class="skill-item">
                    <span class="skill-name">${skillName}</span>
                    <div class="skill-bar">
                        <div class="skill-progress" data-width="${percentage}%"></div>
                    </div>
                </div>
            `;
            categoryElement.insertAdjacentHTML('beforeend', skillHTML);
        }
    },
    
    // Function to update social links
    updateSocialLinks: (links) => {
        // Implementation for updating social media links
        console.log('Updating social links:', links);
    },
    
    // Function to add certificates
    addCertificate: (title, issuer, icon = '🏆') => {
        const certificatesGrid = document.querySelector('.certificates-grid');
        const certificateHTML = `
            <div class="certificate-card">
                <div class="certificate-icon">${icon}</div>
                <h3>${title}</h3>
                <p>${issuer}</p>
                <button class="view-certificate">View Certificate</button>
            </div>
        `;
        certificatesGrid.insertAdjacentHTML('beforeend', certificateHTML);
    }
};

// Make utils available globally for easy updates
window.PortfolioUtils = Utils;

console.log('Portfolio website loaded successfully! 🚀');
console.log('Use PortfolioUtils for easy content updates.');
