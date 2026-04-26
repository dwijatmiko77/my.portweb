const navToggle = document.getElementById('navToggle');
        const navMenu = document.getElementById('navMenu');
        const navOverlay = document.getElementById('navOverlay');
        const navLinks = document.querySelectorAll('.nav-menu a');
        const navbar = document.querySelector('.navbar');

        // Toggle menu
        navToggle.addEventListener('click', () => {
            const isOpen = navMenu.classList.contains('active');
            
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            navOverlay.classList.toggle('active');
            
            document.body.style.overflow = isOpen ? '' : 'hidden';
        });

        // Close menu
        const closeMenu = () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            navOverlay.classList.remove('active');
            document.body.style.overflow = '';
        };

        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                closeMenu();
                
                setTimeout(() => {
                    const target = document.querySelector(link.getAttribute('href'));
                    if(target) target.scrollIntoView({ behavior: 'smooth' });
                }, 300);
            });
        });

        navOverlay.addEventListener('click', closeMenu);

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                closeMenu();
            }
        });

        // REVERSIBLE SCROLL ANIMATIONS
        // Animasi aktif saat scroll ke bawah MASUK viewport dan scroll ke atas KELUAR viewport
        
        const observerOptions = {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px"
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Element masuk viewport (scroll down) -> Tambah class visible
                    entry.target.classList.add('visible');
                    
                    // Animate progress bars
                    const progressFills = entry.target.querySelectorAll('.progress-fill');
                    progressFills.forEach(fill => {
                        const width = fill.getAttribute('data-width');
                        fill.style.width = width + '%';
                    });
                } else {
                    // Element keluar viewport (scroll up) -> Hapus class visible
                    entry.target.classList.remove('visible');
                    
                    // Reset progress bars untuk animasi ulang
                    const progressFills = entry.target.querySelectorAll('.progress-fill');
                    progressFills.forEach(fill => {
                        fill.style.width = '0%';
                    });
                }
            });
        }, observerOptions);

        // Observe all animated elements
        document.querySelectorAll('.animate-on-scroll, .slide-left, .slide-right, .slide-up, .scale-in, .skill-card').forEach((el) => {
            observer.observe(el);
        });

        // Navbar scroll effect
        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                navbar.style.background = 'rgba(10, 10, 10, 0.95)';
                navbar.style.padding = '1rem 5%';
            } else {
                navbar.style.background = 'rgba(10, 10, 10, 0.8)';
                navbar.style.padding = '1.5rem 5%';
            }
            
            lastScroll = currentScroll;
        });