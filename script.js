        // Mobile Navigation
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');
        
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
        
        // Close mobile menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
        
        // Header scroll effect
        window.addEventListener('scroll', () => {
            const header = document.querySelector('header');
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
        
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Update active class
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            });
        });
        
        // Portfolio filtering
        const filterBtns = document.querySelectorAll('.filter-btn');
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');
                
                const filter = btn.textContent;
                
                portfolioItems.forEach(item => {
                    if (filter === 'All' || item.querySelector('.portfolio-tags').textContent.includes(filter)) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
        
        // Form submission
        const contactForm = document.getElementById('contactForm');
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
        
        // Scroll animations
        const animateElements = document.querySelectorAll('.animate');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                }
            });
        }, {
            threshold: 0.1
        });
        
        animateElements.forEach(element => {
            observer.observe(element);
        });
        
        // Set active nav link based on scroll position
        window.addEventListener('scroll', () => {
            const sections = document.querySelectorAll('section');
            const navLinks = document.querySelectorAll('.nav-links a');
            
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (pageYOffset >= (sectionTop - 100)) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').substring(1) === current) {
                    link.classList.add('active');
                }
            });
        });

        const roles = [
            "Full Stack Developer",
            "Laravel Expert",
            "React.js Developer",
            "UI/UX Designer",
            "Web Freelancer"
        ];

        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        const roleElement = document.getElementById("dynamic-role");
        const typingSpeed = 100;
        const deletingSpeed = 50;
        const pauseBetweenWords = 1500;

        function typeRole() {
            const currentRole = roles[roleIndex];
            if (isDeleting) {
                charIndex--;
                roleElement.textContent = currentRole.substring(0, charIndex);
                if (charIndex === 0) {
                    isDeleting = false;
                    roleIndex = (roleIndex + 1) % roles.length;
                    setTimeout(typeRole, 500);
                } else {
                    setTimeout(typeRole, deletingSpeed);
                }
            } else {
                charIndex++;
                roleElement.textContent = currentRole.substring(0, charIndex);
                if (charIndex === currentRole.length) {
                    isDeleting = true;
                    setTimeout(typeRole, pauseBetweenWords);
                } else {
                    setTimeout(typeRole, typingSpeed);
                }
            }
        }

        document.addEventListener("DOMContentLoaded", typeRole);
        //  JavaScript for toggle behavior:
        const themeSwitch = document.getElementById("theme-switch");
        const body = document.body;

        // Load theme on page load
        if (localStorage.getItem("theme") === "dark") {
            body.classList.add("dark");
            themeSwitch.checked = true;
        }

        themeSwitch.addEventListener("change", () => {
            body.classList.toggle("dark");
            localStorage.setItem("theme", body.classList.contains("dark") ? "dark" : "light");
        });