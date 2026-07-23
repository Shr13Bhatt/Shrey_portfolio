// ==========================================
// MOBILE MENU TOGGLE
// ==========================================
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

if (menuIcon && navbar) {
    menuIcon.onclick = () => {
        menuIcon.classList.toggle('bx-x');
        navbar.classList.toggle('active');
    };
}

// ==========================================
// NAVIGATION HIGHLIGHTS & STICKY HEADER
// ==========================================
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('header nav a');
const header = document.querySelector('header');

window.onscroll = () => {
    const top = window.scrollY;
    
    sections.forEach(sec => {
        const offset = sec.offsetTop - 150;
        const height = sec.offsetHeight;
        const id = sec.getAttribute('id');
        
        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                const target = document.querySelector(`header nav a[href*=${id}]`);
                if (target) {
                    target.classList.add('active');
                }
            });
        }
    });
    
    // Sticky header toggle
    if (header) {
        header.classList.toggle('sticky', window.scrollY > 100);
    }
    
    // Auto-close mobile menu on scroll
    if (menuIcon && navbar && navbar.classList.contains('active')) {
        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('active');
    }
};

// ==========================================
// TYPING EFFECT
// ==========================================
class TxtType {
    constructor(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
    }
    tick() {
        const i = this.loopNum % this.toRotate.length;
        const fullTxt = this.toRotate[i];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = `<span class="wrap">${this.txt}</span>`;

        const that = this;
        let delta = 200 - Math.random() * 100;

        if (this.isDeleting) { delta /= 2; }

        if (!this.isDeleting && this.txt === fullTxt) {
            delta = this.period;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.loopNum++;
            delta = 500;
        }

        setTimeout(() => {
            that.tick();
        }, delta);
    }
}

// ==========================================
// INITIALIZATION
// ==========================================
window.addEventListener('DOMContentLoaded', () => {
    // Start typing effect
    const elements = document.getElementsByClassName('typewrite');
    for (let i = 0; i < elements.length; i++) {
        const toRotate = elements[i].getAttribute('data-type');
        const period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }

    // ==========================================
    // SCROLL REVEAL ANIMATIONS (Intersection Observer)
    // ==========================================
    const scrollRevealElements = document.querySelectorAll('.scroll-reveal');
    
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.15
        };
        
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    // Add slight index delay to grid items inside the revealed section
                    const delays = entry.target.querySelectorAll('.timeline-content, .skill-card, .progress, .cert-card, .info-card');
                    delays.forEach((item, index) => {
                        item.style.transitionDelay = `${(index + 1) * 100}ms`;
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    });
                    
                    // Unobserve to run animation only once
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        scrollRevealElements.forEach(el => {
            revealObserver.observe(el);
        });
    } else {
        // Fallback for older browsers
        scrollRevealElements.forEach(el => {
            el.classList.add('active');
        });
    }
});

// ==========================================
// PREMIUM CONTACT FORM HANDLING
// ==========================================
const contactForm = document.querySelector('#contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalContent = submitBtn.innerHTML;
        
        // Visual transition to loading
        submitBtn.disabled = true;
        submitBtn.innerHTML = "Sending Message... <i class='bx bx-loader-alt bx-spin'></i>";
        submitBtn.style.opacity = '0.8';
        
        // Simulate async email send
        setTimeout(() => {
            submitBtn.innerHTML = "Message Sent! <i class='bx bx-check-circle'></i>";
            submitBtn.style.background = "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)";
            submitBtn.style.color = "#ffffff";
            submitBtn.style.opacity = '1';
            
            // Reset contact form fields
            contactForm.reset();
            
            // Revert submit button back to original state
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalContent;
                submitBtn.style.background = "";
                submitBtn.style.color = "";
            }, 3500);
        }, 1800);
    });
}
