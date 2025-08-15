// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function() {
    // Initialize EmailJS 
    // Loading animation
    const loader = document.querySelector('.loader');
    if (loader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.classList.add('fade-out');
            }, 1000);
        });
    }
    
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        
        // Close mobile menu when clicking a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }
    
    // Header scroll effect
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.scrollY > 50);
        });
    }
    // Profile tilt effect
const profileTilt = document.getElementById('profile-tilt');

if (profileTilt) {
    profileTilt.addEventListener('mousemove', (e) => {
        const { left, top, width, height } = profileTilt.getBoundingClientRect();
        const x = (e.clientX - left) / width;
        const y = (e.clientY - top) / height;
        
        const tiltX = (x - 0.5) * 20;
        const tiltY = (0.5 - y) * 20;
        
        profileTilt.style.transform = `rotateY(${tiltX}deg) rotateX(${tiltY}deg)`;
    });
    
    profileTilt.addEventListener('mouseleave', () => {
        profileTilt.style.transform = 'rotateY(0) rotateX(0)';
    });
}

// Counter animation for projects badge
const counter = document.querySelector('.counter');
if (counter) {
    const target = parseInt(counter.getAttribute('data-count'));
    const duration = 2000;
    const increment = target / (duration / 16);
    
    let current = 0;
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            counter.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            counter.textContent = target;
        }
    };
    
    // Start counter when badge is visible
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            updateCounter();
            observer.unobserve(counter);
        }
    });
    
    observer.observe(counter);
}

// Dynamic role text animation
const roles = ["Full Stack Developer", "Laravel Expert", "React.js Specialist", "UI/UX Designer"];
const dynamicRole = document.getElementById('dynamic-role');

if (dynamicRole) {
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isPaused = false;
    
    const typeRole = () => {
        if (isPaused) return;
        
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            dynamicRole.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            
            if (charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                isPaused = true;
                setTimeout(() => {
                    isPaused = false;
                    typeRole();
                }, 500);
            } else {
                setTimeout(typeRole, 50);
            }
        } else {
            dynamicRole.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            
            if (charIndex === currentRole.length) {
                isDeleting = true;
                isPaused = true;
                setTimeout(() => {
                    isPaused = false;
                    typeRole();
                }, 2000);
            } else {
                setTimeout(typeRole, 100);
            }
        }
    };
    
    // Start typing after a delay
    setTimeout(typeRole, 1000);
}
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Update active class
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
        });
    });
    
    // Set active nav link based on scroll position
    const sections = document.querySelectorAll('section');
    const navLinksAll = document.querySelectorAll('.nav-link');
    
    function setActiveNavLink() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinksAll.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', setActiveNavLink);
    
    // Back to top button
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTop.classList.add('active');
            } else {
                backToTop.classList.remove('active');
            }
        });
    }
    
    // Theme toggle functionality
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        const icon = themeToggle.querySelector('i');
        
        function toggleTheme() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            if (currentTheme === 'dark') {
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
                if (icon) {
                    icon.classList.replace('fa-sun', 'fa-moon');
                }
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                if (icon) {
                    icon.classList.replace('fa-moon', 'fa-sun');
                }
            }
        }
        
        // Check for saved preference or system preference
        if (localStorage.getItem('theme') === 'dark' || 
            (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.setAttribute('data-theme', 'dark');
            if (icon) {
                icon.classList.replace('fa-moon', 'fa-sun');
            }
        }
        
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    
    // Initialize GSAP animations
    if (typeof gsap !== 'undefined') {
        // Register ScrollTrigger plugin
        gsap.registerPlugin(ScrollTrigger);
        
        // Animate hero elements
        gsap.from('.hero-title', {
            opacity: 0,
            y: 50,
            duration: 1,
            ease: "power3.out",
            delay: 0.5
        });
        
        gsap.from('.hero-description', {
            opacity: 0,
            y: 30,
            duration: 1,
            ease: "power3.out",
            delay: 0.8
        });
        
        gsap.from('.hero-cta', {
            opacity: 0,
            y: 30,
            duration: 1,
            ease: "power3.out",
            delay: 1.1
        });
        
        gsap.from('.profile-container', {
            opacity: 0,
            scale: 0.8,
            duration: 1,
            ease: "elastic.out(1, 0.5)",
            delay: 0.7
        });
        // Add slight bounce effect when scrolled to
        const hireMeBtn = document.querySelector('.hire-me-btn');

        if (hireMeBtn) {
        window.addEventListener('scroll', () => {
            const rect = hireMeBtn.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.8 && rect.bottom > 0) {
            hireMeBtn.style.animation = 'bounce 1s';
            }
        });
        
        hireMeBtn.addEventListener('animationend', () => {
            hireMeBtn.style.animation = '';
        });
        }

       
       
        // Animate section headers
        gsap.utils.toArray('.section-header').forEach(section => {
            gsap.from(section, {
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                    toggleActions: "play none none none"
                },
                opacity: 0,
                y: 50,
                duration: 0.8,
                ease: "power3.out"
            });
        });
        
        // Animate skills grid
        gsap.utils.toArray('.skill-item').forEach((skill, i) => {
            gsap.from(skill, {
                scrollTrigger: {
                    trigger: '.skills-grid',
                    start: "top 80%",
                    toggleActions: "play none none none"
                },
                opacity: 0,
                y: 30,
                duration: 0.5,
                delay: i * 0.1,
                ease: "power3.out"
            });
        });
        
        // Animate timeline items
        gsap.utils.toArray('.timeline-item').forEach((item, i) => {
            gsap.from(item, {
                scrollTrigger: {
                    trigger: '.timeline',
                    start: "top 80%",
                    toggleActions: "play none none none"
                },
                opacity: 0,
                x: i % 2 === 0 ? -50 : 50,
                duration: 0.8,
                delay: i * 0.2,
                ease: "power3.out"
            });
        });
    }
    
    // Initialize VanillaTilt for profile image
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelector("#profile-tilt"), {
            max: 10,
            speed: 400,
            glare: true,
            "max-glare": 0.2,
        });
    }
    
    // Initialize Three.js background
    if (typeof THREE !== 'undefined') {
        const canvas = document.getElementById('threejs-bg');
        if (canvas) {
            // Scene setup
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            const renderer = new THREE.WebGLRenderer({
                canvas,
                alpha: true,
                antialias: true
            });
            
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            
            // Particles
            const particlesGeometry = new THREE.BufferGeometry();
            const particleCount = 1000;
            
            const posArray = new Float32Array(particleCount * 3);
            
            for (let i = 0; i < particleCount * 3; i++) {
                posArray[i] = (Math.random() - 0.5) * 10;
            }
            
            particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
            
            const particlesMaterial = new THREE.PointsMaterial({
    size: 0.02,
    color: new THREE.Color(getComputedStyle(document.documentElement).getPropertyValue('--primary').trim()),
    transparent: true,
    opacity: 0.8
});
            
            const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
            scene.add(particlesMesh);
            
            camera.position.z = 3;
            
            // Animation
            function animate() {
                requestAnimationFrame(animate);
                
                particlesMesh.rotation.x += 0.0005;
                particlesMesh.rotation.y += 0.0005;
                
                renderer.render(scene, camera);
            }
            
            animate();
            
            // Resize handler
            window.addEventListener('resize', () => {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            });
        }
    }
    
    document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const submitBtn = document.getElementById('submitBtn');
    const originalBtnText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Send form data
    emailjs.sendForm('service_n31kaxn', 'template_xi70v3h', this)
        .then(() => {
        // Success
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
        showToast('Message sent successfully!', 'success');
        this.reset();
        
        // Reset button after 2 seconds
        setTimeout(() => {
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        }, 2000);
        }, (error) => {
        // Error
        submitBtn.innerHTML = '<i class="fas fa-times"></i> Error';
        showToast('Failed to send message. Please try again.', 'error');
        console.error('EmailJS error:', error);
        
        // Reset button after 2 seconds
        setTimeout(() => {
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        }, 2000);
        });
    });

    function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = 'toast show ' + type;
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 4000);
    }
    
    
    // Toast notification
    function showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        document.body.appendChild(toast);
        
        // Position toast
        const toasts = document.querySelectorAll('.toast');
        const lastToast = toasts[toasts.length - 2];
        const offset = lastToast ? lastToast.offsetHeight + 10 : 0;
        
        toast.style.bottom = `${20 + offset}px`;
        
        // Animate in
        setTimeout(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateY(0)';
        }, 10);
        
        // Remove after delay
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(20px)';
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 5000);
    }
    
    // Set current year in footer
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // Load skills data
    const skillsGrid = document.querySelector('.skills-grid');
    if (skillsGrid) {
        const skills = [
            { name: 'HTML5', icon: 'fab fa-html5', color: '#E44D26' },
            { name: 'CSS3', icon: 'fab fa-css3-alt', color: '#264DE4' },
            { name: 'JavaScript', icon: 'fab fa-js-square', color: '#F0DB4F' },
            { name: 'React.js', icon: 'fab fa-react', color: '#61DAFB' },
            { name: 'Laravel', icon: 'fab fa-laravel', color: '#FF2D20' },
            { name: 'PHP', icon: 'fab fa-php', color: '#777BB4' },
            { name: 'MySQL', icon: 'fas fa-database', color: '#4479A1' },
            { name: 'Git', icon: 'fab fa-git-alt', color: '#F05032' },
            { name: 'Node.js', icon: 'fab fa-node-js', color: '#68A063' },
            { name: 'Tailwind CSS', icon: 'fas fa-wind', color: '#38B2AC' },
            { name: 'Bootstrap', icon: 'fab fa-bootstrap', color: '#7952B3' },
            { name: 'Figma', icon: 'fab fa-figma', color: '#F24E1E' }
        ];
        
        skills.forEach(skill => {
            const skillItem = document.createElement('div');
            skillItem.className = 'skill-item';
            skillItem.innerHTML = `
                <i class="${skill.icon} skill-icon" style="color: ${skill.color}"></i>
                <span class="skill-name">${skill.name}</span>
            `;
            skillsGrid.appendChild(skillItem);
        });
    }
    
    const projects = [
        {
            title: 'Restaurant Website',
            description: 'A modern restaurant website with online booking system and menu display.',
            image: 'assets/pexels-julieaagaard-2351274.jpg',
            tags: ['HTML5', 'CSS3', 'JavaScript'],
            liveLink: 'https://issam-oua.github.io/food-web/',
            codeLink: 'https://github.com/issam-oua/food-web'
        },
        {
            title: 'E-commerce Platform',
            description: 'Full-featured e-commerce platform with product catalog and cart functionality.',
            image: 'assets/desktop.png',
            tags: ['HTML5', 'CSS3', 'JavaScript'],
            liveLink: 'https://issam-oua.github.io/E-commerce.ma/',
            codeLink: 'https://github.com/issam-oua/E-commerce.ma'
        },
        {
            title: 'Celestial Hotel',
            description: 'Celestial Hotel — Responsive hotel website built with HTML, CSS, and JavaScript, featuring elegant design, smooth animations, and a user-friendly booking interface',
            image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
            tags: ['HTML5', 'CSS3', 'JavaScript'],
            liveLink: 'https://celestial-hotel.netlify.app/',
            codeLink: 'https://github.com/Issam-oua/celestial-dreams-hotel'
        }
    ];
    
    const slider = document.querySelector('.projects-slider');
    const dotsContainer = document.querySelector('.carousel-dots');
    const prevBtn = document.querySelector('.carousel-nav.prev');
    const nextBtn = document.querySelector('.carousel-nav.next');
    
    let currentIndex = 0;
    
    // Create project cards
    projects.forEach((project, index) => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.innerHTML = `
            <div class="project-image">
                <img src="${project.image}" alt="${project.title}">
            </div>
            <div class="project-info">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                </div>
                <div class="project-links">
                    <a href="${project.liveLink}" target="_blank" class="project-link live">
                        <i class="fas fa-external-link-alt"></i>
                        <span>Live Demo</span>
                    </a>
                    <a href="${project.codeLink}" target="_blank" class="project-link code">
                        <i class="fab fa-github"></i>
                        <span>View Code</span>
                    </a>
                </div>
            </div>
        `;
        slider.appendChild(projectCard);
        
        // Create dots
        const dot = document.createElement('button');
        dot.className = 'carousel-dot';
        dot.setAttribute('data-index', index);
        dotsContainer.appendChild(dot);
    });
    
    const cards = document.querySelectorAll('.project-card');
    const dots = document.querySelectorAll('.carousel-dot');
    
    // Initialize first card as active
    cards[0].classList.add('active');
    dots[0].classList.add('active');
    
    // Navigation functions
    function goToProject(index) {
        currentIndex = index;
        
        // Update active card
        cards.forEach((card, i) => {
            card.classList.toggle('active', i === index);
        });
        
        // Update active dot
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        
        // Scroll to card
        cards[index].scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center'
        });
        
        // Update button states
        prevBtn.disabled = index === 0;
        nextBtn.disabled = index === cards.length - 1;
    }
    
    // Dot click event
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const index = parseInt(dot.getAttribute('data-index'));
            goToProject(index);
        });
    });
    
    // Button click events
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            goToProject(currentIndex - 1);
        }
    });
    
    nextBtn.addEventListener('click', () => {
        if (currentIndex < cards.length - 1) {
            goToProject(currentIndex + 1);
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' && currentIndex > 0) {
            goToProject(currentIndex - 1);
        } else if (e.key === 'ArrowRight' && currentIndex < cards.length - 1) {
            goToProject(currentIndex + 1);
        }
    });
    
    // Disable prev button initially
    prevBtn.disabled = true;

    
    // Portfolio filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    if (filterBtns.length) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');
                
                const filter = btn.dataset.filter;
                const projectCards = document.querySelectorAll('.project-card');
                
                projectCards.forEach(card => {
                    if (filter === 'all') {
                        card.style.display = 'block';
                    } else {
                        const tags = Array.from(card.querySelectorAll('.project-tag')).map(tag => tag.textContent.toLowerCase());
                        if (tags.includes(filter)) {
                            card.style.display = 'block';
                        } else {
                            card.style.display = 'none';
                        }
                    }
                });
            });
        });
    }
});