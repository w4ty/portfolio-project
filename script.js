document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('main section');
    const navLi = document.querySelectorAll('.main-nav ul li a');
    const headerOffset = document.querySelector('.site-header').offsetHeight + 20;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - headerOffset;
        if (pageYOffset >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLi.forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href').includes(current)) {
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