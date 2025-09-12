document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('.main-nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const header = document.querySelector('header');
                const headerHeight = header ? header.offsetHeight : 0; // Get header height dynamically
                const scrollOffset = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 10; // Additional offset

                window.scrollTo({
                    top: scrollOffset,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add 'active' class to nav links based on scroll position (Section highlighting)
    const sections = document.querySelectorAll('main section');
    const navLinks = document.querySelectorAll('.main-nav a');

    const observerOptions = {
        root: null, // relative to the viewport
        rootMargin: '0px 0px -50% 0px', // When section midpoint is visible
        threshold: 0 // We just need to know when it crosses the rootMargin
    };

    let currentActive = null; // To track the currently active section

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                const activeLink = document.querySelector(`.main-nav a[href="#${id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                    currentActive = id; // Update current active section ID
                }
            }
        });
    }, observerOptions);

    // Initial check to set active class on load (for the section visible on page load)
    const firstVisibleSection = Array.from(sections).find(section => {
        const rect = section.getBoundingClientRect();
        return rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2;
    });
    if (firstVisibleSection) {
        const initialActiveLink = document.querySelector(`.main-nav a[href="#${firstVisibleSection.id}"]`);
        if (initialActiveLink) {
            initialActiveLink.classList.add('active');
            currentActive = firstVisibleSection.id;
        }
    }


    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Back to Top button functionality
    const backToTopBtn = document.getElementById('backToTopBtn');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) { // Show button after scrolling 400px
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});