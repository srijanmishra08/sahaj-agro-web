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
    gsap.from(".feature-card", {
        scrollTrigger: {
            trigger: ".features-grid",
            start: "top 85%"
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: {
            amount: 0.6,
            grid: [2, 3],
            from: "start"
        },
        ease: "power3.out",
        clearProps: "all"
    });

    // D2b. Storytelling Section - Interactive Features & Visuals
    const storyFeatures = document.querySelectorAll('.story-feature');
    const visualSlides = document.querySelectorAll('.visual-slide');
    const visualPanel = document.querySelector('.story-visual-panel');
    const progressFill = document.querySelector('.progress-fill');

    if (storyFeatures.length > 0 && visualSlides.length > 0) {
        // Click handler for features
        storyFeatures.forEach((feature, index) => {
            feature.addEventListener('click', () => {
                // Update active feature
                storyFeatures.forEach(f => f.classList.remove('active'));
                feature.classList.add('active');

                // Update active slide
                visualSlides.forEach(s => s.classList.remove('active'));
                if (visualSlides[index]) {
                    visualSlides[index].classList.add('active');
                    // Scroll to the slide
                    visualSlides[index].scrollIntoView({
                        behavior: 'smooth',
                        block: 'nearest',
                        inline: 'center'
                    });
                }

                // Update progress bar
                const progress = ((index + 1) / storyFeatures.length) * 100;
                if (progressFill) {
                    progressFill.style.width = progress + '%';
                }
            });
        });

        // Scroll handler for visual panel
        if (visualPanel) {
            visualPanel.addEventListener('scroll', () => {
                const scrollLeft = visualPanel.scrollLeft;
                const slideWidth = visualSlides[0]?.offsetWidth || 320;
                const gap = 32; // 2rem gap
                const currentIndex = Math.round(scrollLeft / (slideWidth + gap));

                // Update active states
                storyFeatures.forEach((f, i) => {
                    f.classList.toggle('active', i === currentIndex);
                });
                visualSlides.forEach((s, i) => {
                    s.classList.toggle('active', i === currentIndex);
                });

                // Update progress
                const progress = ((currentIndex + 1) / storyFeatures.length) * 100;
                if (progressFill) {
                    progressFill.style.width = Math.min(progress, 100) + '%';
                }
            });
        }

        // Entrance animation for storytelling section
        gsap.from(".story-content-inner", {
            scrollTrigger: {
                trigger: ".storytelling-section",
                start: "top 80%"
            },
            x: -50,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });

        gsap.from(".story-feature", {
            scrollTrigger: {
                trigger: ".story-features",
                start: "top 85%"
            },
            y: 30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.12,
            ease: "power3.out"
        });

        gsap.from(".visual-slide", {
            scrollTrigger: {
                trigger: ".story-visual-panel",
                start: "top 85%"
            },
            x: 60,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
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
