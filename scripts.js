// GSAP Animation Script for Sahaj Agro
// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {

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
            if (window.innerWidth > 768) {
                // Ensure correct logos show on desktop scroll
                logoDesktop.style.display = 'none';
                logoMobile.style.display = 'block';
            }
        } else {
            navbar.classList.remove('scrolled');
            if (window.innerWidth > 768) {
                logoDesktop.style.display = 'block';
                logoMobile.style.display = 'none';
            }
        }
    });

    // Mobile Menu
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !menuToggle.contains(e.target) && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });

    // --- 2. Animations (GSAP) ---

    // --- 2. Animations (GSAP) ---

    // A. Hero Entrance - More Dynamic
    const heroTl = gsap.timeline();

    // Initial State Set (avoids FOUC)
    gsap.set(".hero-title, .hero-subtitle, .hero-actions, .trust-badge", { opacity: 0, y: 50 });

    heroTl.to(".hero-title", {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power4.out",
        delay: 0.2
    })
        .to(".hero-subtitle", {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out"
        }, "-=0.8")
        .to(".hero-actions", {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "back.out(1.7)"
        }, "-=0.6")
        .to(".trust-badge", {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out"
        }, "-=0.4");

    // B. Parallax Hero Image - Stronger Effect
    gsap.to(".hero-bg-wrapper", {
        yPercent: 40, // Increased parallax
        scale: 1.1, // Slight zoom out effect on scroll
        ease: "none",
        scrollTrigger: {
            trigger: ".hero-section",
            start: "top top",
            end: "bottom top",
            scrub: true
        }
    });

    // C. Section Titles Reveal - "Word Split" or Staggered Lines style
    gsap.utils.toArray('.section-header, .distribution-layout').forEach(section => {
        // Find children to animate
        const children = section.querySelectorAll('span, h2, p, .btn');
        if (children.length > 0) {
            gsap.from(children, {
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                },
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power4.out"
            });
        }
    });

    // D. About Stats & Values - Pop Up Effect
    gsap.from(".stat-item", {
        scrollTrigger: {
            trigger: ".stats-row",
            start: "top 85%"
        },
        scale: 0.5,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(2)" // Bouncy pop
    });

    gsap.from(".value-card", {
        scrollTrigger: {
            trigger: ".values-grid",
            start: "top 80%"
        },
        y: 100,
        opacity: 0,
        rotation: 5, // Slight rotation entrance
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
    });

    // E. Process Cards - Cascade Entrance with Image Focus
    gsap.from(".process-card", {
        scrollTrigger: {
            trigger: ".process-grid",
            start: "top 75%",
            toggleActions: "play none none reverse"
        },
        y: 100,
        opacity: 0,
        scale: 0.9,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out",
        onComplete: function () {
            gsap.set(this.targets(), { clearProps: "all" }); // Cleanup for hover effects
        }
    });

    // F. Product Cards - 3D Flip/Fade In
    gsap.from(".product-card", {
        scrollTrigger: {
            trigger: ".products-grid",
            start: "top 80%"
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        clearProps: "all"
    });

    // G. Image Parallax for About & General Images
    gsap.utils.toArray('.parallax-img img').forEach(img => {
        gsap.to(img, {
            yPercent: -20,
            ease: "none",
            scrollTrigger: {
                trigger: img.parentElement,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    });

    // H. Footer Reveal - Smooth Slide Up
    gsap.from(".footer-col", {
        scrollTrigger: {
            trigger: ".site-footer",
            start: "top 85%"
        },
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
    });

    // --- 3. Enhanced Hover Interactions ---

    // Magnetic-like effect for Buttons (Optional - keeping it clean for now)

    // Product Card Levitating Hover (handled in CSS, but we can add JS tilt if requested. 
    // CSS hover is usually smoother for simple transform)

});
