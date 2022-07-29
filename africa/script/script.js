const parallaxImgFunc = (img) => {
    const imgParent = img.closest('.parallax-wrapper'),
        imgY = imgParent.offsetTop,
        winY = window.scrollY;

    if (window.innerWidth > 1024) {
        img.style.transform = `translate3d(0, ${(winY - imgY) * .3}px,0)`;
    }
}

const animateBlock = (section) => {
    const animationBlock = section.querySelectorAll('*[data-animate]');

    animationBlock.forEach((element, index) => {
        element.style.transitionDelay = `${index * .3}s`;
        element.classList.add('animated');
    });
};

const addObserver = (element) => {
    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            entry.isIntersecting ? (animateBlock(entry.target)) : null;
        });
    }, {rootMargin: '-100px'});

    observer.observe(element);
};

document.addEventListener('DOMContentLoaded', () => {
    const parallaxImages = document.querySelectorAll('.parallax-img');

    parallaxImages.forEach(element => {
        parallaxImgFunc(element);
    });

    const burger = document.querySelector('.burger'),
        nav = document.querySelector('.nav');

    burger.addEventListener('click', (e) => {
        e.preventDefault();

        nav.classList.toggle('active');
        burger.classList.toggle('active');
    });

    const navItemLinks = document.querySelectorAll('.nav-item__link');

    navItemLinks.forEach(element => {
        element.addEventListener('click', () => {
            nav.classList.remove('active');
            burger.classList.remove('active');
        })
    });


    const sectionWithAnimation = document.querySelectorAll('[data-animate]'),
        animationSection = [];

    sectionWithAnimation.forEach(el => {
        animationSection.push(el.closest('section'))
    });

    const animationSectionFiltred = animationSection.filter(function (item, pos) {
        return animationSection.indexOf(item) == pos;
    });

    animationSectionFiltred.forEach(el => {
        addObserver(el);
    });


    function checkNotificationSupported() {
        return new Promise((fulfilled, reject) => {
            if (!('serviceWorker' in navigator)) {
                reject(new Error('Service workers are not supported by this browser'));
                return;
            }

            if (!('PushManager' in window)) {
                reject(new Error('Push notifications are not supported by this browser'));
                return;
            }

            if (!('showNotification' in ServiceWorkerRegistration.prototype)) {
                reject(new Error('Notifications are not supported by this browser'));
                return;
            }

            fulfilled();
        })
    }

    console.log(checkNotificationSupported());
});


document.addEventListener('scroll', () => {
    const parallaxImages = document.querySelectorAll('.parallax-img');
    parallaxImages.forEach(element => {
        parallaxImgFunc(element);
    });
});