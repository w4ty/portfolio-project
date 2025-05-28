document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        const headerHeight = document.querySelector('.site-header') ? document.querySelector('.site-header').offsetHeight : 0;
        const viewportHeight = window.innerHeight;
        const bodyHeight = document.body.offsetHeight;

        if (targetElement) {
            let scrollTargetY;

            if (targetId === '#intro') {
                scrollTargetY = 0;
            } else if (targetId === '#contact') {
                scrollTargetY = bodyHeight - viewportHeight;
            } else {
                const sectionTopAbs = targetElement.offsetTop;
                const sectionHeight = targetElement.offsetHeight;
                const visibleViewportHeight = viewportHeight - headerHeight;

                if (sectionHeight > visibleViewportHeight) {
                    scrollTargetY = sectionTopAbs - headerHeight;
                } else {
                    const centerInVisibleY = sectionTopAbs + (sectionHeight / 2) - (viewportHeight / 2) - (headerHeight / 2);
                    scrollTargetY = Math.min(sectionTopAbs - headerHeight, centerInVisibleY);
                }
            }

            scrollTargetY = Math.max(0, scrollTargetY);
            scrollTargetY = Math.min(scrollTargetY, bodyHeight - viewportHeight);

            window.scrollTo({
                top: scrollTargetY,
                behavior: 'smooth'
            });
        }
    });
});

window.addEventListener('scroll', () => {
    let currentSectionId = '';
    const navLinks = document.querySelectorAll('.main-nav ul li a');
    const headerHeight = document.querySelector('.site-header') ? document.querySelector('.site-header').offsetHeight : 0;
    const viewportHeight = window.innerHeight;
    const scrollY = window.pageYOffset;
    const bodyHeight = document.body.offsetHeight;

    if (scrollY < 50) {
        currentSectionId = 'intro';
    } else {
        const mainSections = document.querySelectorAll('main section');
        const effectiveViewportMidY = scrollY + headerHeight + (viewportHeight - headerHeight) / 2;
        let foundMainSectionId = '';

        mainSections.forEach(section => {
            const sectionId = section.getAttribute('id');
            if (sectionId === 'intro') return;

            const sectionTopAbsolute = section.offsetTop;
            const sectionBottomAbsolute = sectionTopAbsolute + section.offsetHeight;

            if (effectiveViewportMidY >= sectionTopAbsolute && effectiveViewportMidY < sectionBottomAbsolute) {
                foundMainSectionId = sectionId;
            }
        });

        if (foundMainSectionId) {
            currentSectionId = foundMainSectionId;
        } else {
            if (viewportHeight + Math.ceil(scrollY) >= bodyHeight - 10) {
                currentSectionId = 'contact';
            }
        }
    }

    navLinks.forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href') === `#${currentSectionId}`) {
            a.classList.add('active');
        }
    });
});

const hamburger = document.querySelector('.hamburger-menu');
const navMenu = document.querySelector('.main-nav');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        const isExpanded = hamburger.getAttribute('aria-expanded') === 'true' || false;
        hamburger.setAttribute('aria-expanded', !isExpanded);

        if (navMenu.classList.contains('active')) {
            navMenu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    hamburger.setAttribute('aria-expanded', 'false');
                });
            });
        }
    });
}

window.addEventListener('resize', () => {
    const DSK_MIN_WIDTH = 768;
    if (window.innerWidth >= DSK_MIN_WIDTH) {
        if (hamburger && hamburger.classList.contains('active')) {
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        }
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
        }
    }
});

const sectionsToAnimate = document.querySelectorAll('main section');

if (sectionsToAnimate.length > 0) {
    const sectionObserverOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const sectionObserverCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    };

    const sectionObserver = new IntersectionObserver(sectionObserverCallback, sectionObserverOptions);

    sectionsToAnimate.forEach(section => {
        sectionObserver.observe(section);
    });
} 