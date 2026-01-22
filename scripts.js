// GSAP Animation Script for Sahaj Agro
// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {

    // --- 0. Force Video Autoplay on Mobile ---
    const heroVideo = document.getElementById('heroVideo');
    if (heroVideo) {
        // Function to attempt video play
        const attemptPlay = () => {
            heroVideo.muted = true; // Ensure muted for autoplay
            const playPromise = heroVideo.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    // Auto-play was prevented, try again on user interaction
                    console.log('Autoplay prevented, waiting for user interaction');
                });
            }
        };

        // Try to play immediately
        attemptPlay();

        // Also try on various user interactions for stubborn mobile browsers
        ['touchstart', 'click', 'scroll'].forEach(event => {
            document.addEventListener(event, function playOnInteraction() {
                attemptPlay();
                document.removeEventListener(event, playOnInteraction);
            }, { once: true, passive: true });
        });

        // Handle visibility change (when tab becomes active)
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden) {
                attemptPlay();
            }
        });
    }

    // --- 1. Navbar Logic (Scroll State & Mobile) ---
    const navbar = document.querySelector('.navbar');
    const logoDesktop = document.querySelector('.logo-desktop');
    const logoMobile = document.querySelector('.logo-mobile');
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Scroll Handler
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            // Only toggle logos on desktop
            if (window.innerWidth > 768) {
                logoDesktop.style.display = 'none';
                logoMobile.style.display = 'block';
            }
        } else {
            navbar.classList.remove('scrolled');
            // Only toggle logos on desktop
            if (window.innerWidth > 768) {
                logoDesktop.style.display = 'block';
                logoMobile.style.display = 'none';
            }
        }
    });

    // Handle resize events for logo display
    window.addEventListener('resize', () => {
        if (window.innerWidth <= 768) {
            // Mobile: always show mobile logo
            logoDesktop.style.display = 'none';
            logoMobile.style.display = 'block';
        } else {
            // Desktop: follow scroll state
            if (window.scrollY > 50) {
                logoDesktop.style.display = 'none';
                logoMobile.style.display = 'block';
            } else {
                logoDesktop.style.display = 'block';
                logoMobile.style.display = 'none';
            }
        }
    });

    // Initial check for mobile
    if (window.innerWidth <= 768) {
        logoDesktop.style.display = 'none';
        logoMobile.style.display = 'block';
    }

    // Mobile Menu
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => navMenu.classList.remove('active'));
    });

    // --- 2. Animations (GSAP) ---

    // A. Hero Entrance
    const heroTl = gsap.timeline();
    heroTl.from(".hero-title", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.2
    })
        .from(".hero-subtitle", {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
        }, "-=0.6")
        .from(".hero-actions", {
            y: 20,
            opacity: 0,
            duration: 0.8
        }, "-=0.6")
        .from(".trust-badge", {
            y: 20,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2
        }, "-=0.4");

    // B. Parallax Hero Image
    gsap.to(".hero-bg-wrapper", {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
            trigger: ".hero-section",
            start: "top top",
            end: "bottom top",
            scrub: true
        }
    });

    // C. Section Titles Reveal
    gsap.utils.toArray('.section-header, .distribution-layout').forEach(section => {
        gsap.from(section.children, {
            scrollTrigger: {
                trigger: section,
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            y: 40,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out"
        });
    });

    // D. About Stats & Values
    gsap.from(".stat-item", {
        scrollTrigger: {
            trigger: ".stats-row",
            start: "top 85%"
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.7)"
    });

    gsap.from(".value-card", {
        scrollTrigger: {
            trigger: ".values-grid",
            start: "top 85%"
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        clearProps: "all" /* Safe cleanup */
    });

    // D2. Why Choose Us Section Animation
    gsap.from(".why-feature-card", {
        scrollTrigger: {
            trigger: ".why-choose-features",
            start: "top 85%"
        },
        x: -40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        clearProps: "all"
    });

    // D2b. Why Choose Us - Image Carousel with Auto-Rotate
    const whyCarouselSlides = document.querySelectorAll('.why-carousel-slide');
    const whyCarouselDots = document.querySelectorAll('.why-dot');
    let whyCurrentSlide = 0;
    let whyCarouselInterval = null;
    const whyCarouselDelay = 4000; // 4 seconds between slides

    function updateWhyCarousel(index) {
        // Update slides
        whyCarouselSlides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        // Update dots
        whyCarouselDots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        whyCurrentSlide = index;
    }

    function nextWhySlide() {
        const nextIndex = (whyCurrentSlide + 1) % whyCarouselSlides.length;
        updateWhyCarousel(nextIndex);
    }

    function startWhyCarousel() {
        if (whyCarouselSlides.length > 0) {
            whyCarouselInterval = setInterval(nextWhySlide, whyCarouselDelay);
        }
    }

    function stopWhyCarousel() {
        if (whyCarouselInterval) {
            clearInterval(whyCarouselInterval);
            whyCarouselInterval = null;
        }
    }

    // Initialize carousel
    if (whyCarouselSlides.length > 0) {
        // Start auto-rotation
        startWhyCarousel();

        // Dot click handlers
        whyCarouselDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                stopWhyCarousel();
                updateWhyCarousel(index);
                startWhyCarousel();
            });
        });

        // Pause on hover
        const carouselContainer = document.querySelector('.why-carousel-container');
        if (carouselContainer) {
            carouselContainer.addEventListener('mouseenter', stopWhyCarousel);
            carouselContainer.addEventListener('mouseleave', startWhyCarousel);
        }

        // Entrance animation for carousel
        gsap.from(".why-carousel-container", {
            scrollTrigger: {
                trigger: ".why-choose-visual",
                start: "top 85%"
            },
            x: 60,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });
    }

    // D2c. Product Showcase Animation (fallback for old structure)
    gsap.from(".showcase-header", {
        scrollTrigger: {
            trigger: ".product-showcase",
            start: "top 85%"
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out"
    });

    gsap.from(".showcase-item", {
        scrollTrigger: {
            trigger: ".showcase-gallery",
            start: "top 85%"
        },
        y: 50,
        opacity: 0,
        scale: 0.95,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        clearProps: "all"
    });

    // D3. Founder's Story Section Animation
    const foundersTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".founders-section",
            start: "top 80%"
        }
    });

    foundersTl.from(".founder-img-wrapper img", {
        x: -60,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    })
    .from(".founder-frame", {
        x: -40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
    }, "-=0.7")
    .from(".founder-accent", {
        scale: 0,
        opacity: 0,
        duration: 0.6,
        ease: "back.out(1.7)"
    }, "-=0.5")
    .from(".founder-content-col .eyebrow", {
        y: 30,
        opacity: 0,
        duration: 0.6
    }, "-=0.6")
    .from(".founder-content-col .section-title", {
        y: 30,
        opacity: 0,
        duration: 0.6
    }, "-=0.4")
    .from(".quote-icon", {
        scale: 0,
        rotation: -180,
        opacity: 0,
        duration: 0.6,
        ease: "back.out(1.7)"
    }, "-=0.3")
    .from(".founder-message p", {
        y: 25,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15
    }, "-=0.3")
    .from(".founder-signature", {
        y: 20,
        opacity: 0,
        duration: 0.5
    }, "-=0.2");

    // E. Process Timeline (Restored with Safety)
    gsap.from(".process-card", {
        scrollTrigger: {
            trigger: ".process-grid",
            start: "top 85%", /* Trigger slightly earlier */
            toggleActions: "play none none none" /* Play once and stay */
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        clearProps: "all" /* Safety: Clear inline styles after animation to prevent stuck states */
    });

    // F. Product Cards Stagger
    gsap.set(".product-card", { opacity: 1, y: 0 }); // Ensure visible first
    gsap.from(".product-card", {
        scrollTrigger: {
            trigger: ".products-grid",
            start: "top 80%"
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        clearProps: "all"
    });



    // H. Footer Reveal
    gsap.from(".footer-col", {
        scrollTrigger: {
            trigger: ".site-footer",
            start: "top 90%"
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2
    });

    // --- 3. Filter Filtering Logic ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Active Class
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            productCards.forEach(card => {
                const category = card.getAttribute('data-category');

                if (filter === 'all' || filter === category) {
                    gsap.to(card, { autoAlpha: 1, scale: 1, display: 'block', duration: 0.4 });
                } else {
                    gsap.to(card, { autoAlpha: 0, scale: 0.95, display: 'none', duration: 0.4 });
                }
            });

            // Re-trigger ScrollTrigger refresh for layout changes
            ScrollTrigger.refresh();
        });
    });

});
