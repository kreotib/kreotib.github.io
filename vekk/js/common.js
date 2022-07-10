const heroSliderInit = () => {
    const heroSlider = document.querySelector('.hero-slider'),
        heroSliderItems = heroSlider.querySelectorAll('.hero-slider__item'),
        buttonNext = heroSlider.querySelector('.hero-slider-button-next'),
        buttonPrev = heroSlider.querySelector('.hero-slider-button-prev');


    heroSliderItems.forEach((el, index) => {
        let slideWidth = (30 / (heroSliderItems.length - 1));
        el.style.width = `${slideWidth}%`;
    });

    const slideChange = (newIndex = 0) => {
        newIndex > heroSliderItems.length - 1 ? newIndex = 0 : null;
        newIndex < 0 ? newIndex = heroSliderItems.length - 1 : null;
        heroSliderItems.forEach((el, index) => {
            index === newIndex ? el.classList.add('hero-slider__item--active') : el.classList.remove('hero-slider__item--active');
        });
    };

    buttonNext.addEventListener('click', (e) => {
        e.preventDefault();

        const newIndex = [...heroSliderItems].indexOf(heroSlider.querySelector('.hero-slider__item--active'));

        slideChange(newIndex + 1);
    });

    buttonPrev.addEventListener('click', (e) => {
        e.preventDefault();

        const newIndex = [...heroSliderItems].indexOf(heroSlider.querySelector('.hero-slider__item--active'));

        slideChange(newIndex - 1);
    });

    slideChange();
}

const initMap = () => {
    const myMap = new ymaps.Map("map", {
            center: [55.750748, 37.569624],
            zoom: 12,
            controls: []
        }, {}),
        myPlacemark = new ymaps.Placemark([55.735038, 37.509236], {}, {
            iconLayout: 'default#image',
            iconImageHref: 'img/icons/map.png',
            iconImageSize: [33, 54],
            iconImageOffset: [-10, -54]
        });
    myMap.geoObjects.add(myPlacemark)
}

const initPopup = () => {
    const popupButtons = document.querySelectorAll('*[data-popup]'),
        popupArray = document.querySelectorAll('.popup');

    popupButtons.forEach(element => {
        element.addEventListener('click', (e) => {
            e.preventDefault();

            openPopup(element.dataset.popup);
        });
    });

    popupArray.forEach(element=>{
       element.addEventListener('click',(e)=>{
           e.target.classList.contains('popup-wrapper') || e.target.classList.contains('popup-close') ? closeAllPopup() : null;
       });
    });

    const openPopup = (selector) => {
        closeAllPopup();

        const popup = document.querySelector(`.${selector}`);
        popup.classList.add('active');
    }

    const closeAllPopup = () => {
        popupArray.forEach(el => {
            el.classList.remove('active');
        });
    };
}

document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.burger'),
        mainNav = document.querySelector('.main-nav');

    burger.addEventListener('click', function () {
        this.classList.contains('active') ? (this.classList.remove('active'), mainNav.classList.remove('active'), document.body.classList.remove('no-scroll')) : (this.classList.add('active'), mainNav.classList.add('active'), document.body.classList.add('no-scroll'));
    });

    const swiper = new Swiper('.partners-slider', {
        loop: true,
        slidesPerView: 'auto',
        freeMode: true,
        spaceBetween: 10,
        navigation: {
            nextEl: '.partners-slider-button-next',
            prevEl: '.partners-slider-button-prev',
        },
        breakpoints: {
            1100: {
                slidesPerView: 8
            }
        }
    });

    const heroSlider = document.querySelector('.hero-slider'),
        popup = document.querySelector('.popup');

    if (heroSlider) {
        heroSliderInit();
    }

    if(popup){
        initPopup();
    }

    ymaps.ready(initMap);
});