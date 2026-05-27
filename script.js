// Navbar scroll effect
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLink = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Hamburger menu toggle
if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    });
}

// Close menu when link is clicked
navLink.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.style.display = 'none';
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.animation = `fadeInUp 0.6s ease forwards`;
            entry.target.style.animationDelay = `${index * 0.1}s`;
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.project-card, .about-features .feature, .timeline-item').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// Skill bar animation
const skillObserverOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const skillObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillProgress = entry.target.querySelector('.skill-progress');
            if (skillProgress) {
                const width = skillProgress.style.width;
                skillProgress.style.width = '0';
                setTimeout(() => {
                    skillProgress.style.width = width;
                }, 100);
            }
            skillObserver.unobserve(entry.target);
        }
    });
}, skillObserverOptions);

document.querySelectorAll('.skill-item').forEach(item => {
    skillObserver.observe(item);
});

// Parallax effect for hero section
const heroSection = document.querySelector('.hero');
if (heroSection) {
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        heroSection.style.backgroundPosition = `0 ${scrollPosition * 0.5}px`;
    });
}

// Add active class to nav links based on scroll position
const sections = document.querySelectorAll('section');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navLink.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Counter animation for stats
const stats = document.querySelectorAll('.stat h3');
const startCount = () => {
    stats.forEach(stat => {
        const target = parseInt(stat.innerText);
        if (!isNaN(target)) {
            let count = 0;
            const increment = target / 30;
            const timer = setInterval(() => {
                count += increment;
                if (count >= target) {
                    stat.innerText = stat.innerText;
                    clearInterval(timer);
                } else {
                    stat.innerText = Math.ceil(count) + '+';
                }
            }, 50);
        }
    });
};

const statsObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            startCount();
            statsObserver.unobserve(entry.target);
        }
    });
});

const statsSection = document.querySelector('.about-stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Mobile responsive handler
const handleResize = () => {
    if (window.innerWidth > 768) {
        navLinks.style.display = 'flex';
    } else {
        navLinks.style.display = 'none';
    }
};

window.addEventListener('resize', handleResize);
handleResize();

// Typewriter effect for code
const codeLines = document.querySelectorAll('.code-line');
let delay = 0;
codeLines.forEach(line => {
    const text = line.innerText;
    line.innerText = '';
    let charIndex = 0;

    const typeWriter = () => {
        if (charIndex < text.length) {
            line.innerText += text[charIndex];
            charIndex++;
            setTimeout(typeWriter, 30);
        }
    };

    setTimeout(typeWriter, delay);
    delay += text.length * 30 + 200;
});

// Add ripple effect to buttons
document.querySelectorAll('.btn, .project-link, .social-icon').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

console.log('🚀 Portfolio loaded! Welcome to Sourabh\'s Portfolio');
