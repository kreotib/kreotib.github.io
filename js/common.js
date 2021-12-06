const popupOpen = (selector) => {
    const popupBlock = document.querySelector(selector);

    popupClose();

    popupBlock.classList.add('show');
};

const popupClose = () => {
    const popupBlocks = document.querySelectorAll('.popup');

    popupBlocks.forEach(el => {
        el.classList.remove('show');
    });
}


const toggleNav = () => {
    const mobileNav = document.querySelector('.nav-row');

    mobileNav.classList.toggle('show');
}

const validateInput = (value) => {
    return value.length > 0
};

const showError = (el) =>{
  const errorBlock = document.createElement('span');
  errorBlock.classList.add('form-error');
  errorBlock.innerText = 'Заполните поле';

  el.closest('div').append(errorBlock);
  el.classList.add('error');
};

const removeError = (form) =>{
    const errors = form.querySelectorAll('.form-error'),
        errorsInputs = form.querySelectorAll('.error');

    errorsInputs.forEach(el=>{
        el.classList.remove('error');
    });

    errors.forEach(el=>{
       el.remove();
    });
};

document.addEventListener('DOMContentLoaded', () => {
    const itemsSlider = new Swiper(".items-slider", {
        slidesPerView: "auto",
        freeMode: true,
        spaceBetween: 12,
        breakpoints: {
            600: {
                spaceBetween: 25
            }
        },
        navigation: {
            nextEl: ".swiper-button-next",
        },
    });
    const itemsSliderImg = new Swiper(".item-slider-img", {
        slidesPerView: "auto",
        freeMode: true,
        spaceBetween: 6,
        navigation: {
            prevEl: ".swiper-button-prev",
            nextEl: ".swiper-button-next",
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true
        }
    });
    const servicesSlider = new Swiper(".services-slider", {
        direction: "horizontal",
        slidesPerView: "auto",
        freeMode: true,
        scrollbar: {
            el: ".swiper-scrollbar",
        },
        mousewheel: true,
    });
    const imgSlider = new Swiper('.item-img-slider', {
        slidesPerView: 1,
        spaceBetween: 0,
        pagination: {
            el: ".swiper-pagination",
            clickable: true
        }
    });
    const categorySlider = new Swiper('.search-category', {
        direction: "horizontal",
        slidesPerView: "auto",
        freeMode: true,
        scrollbar: {
            el: ".swiper-scrollbar",
        },
        mousewheel: true,
    });


    const popupBtns = document.querySelectorAll('.popup-btn'),
        popupCloseBtns = document.querySelectorAll('.popup-close'),
        popupArray = document.querySelectorAll('.popup');

    popupBtns.forEach(el => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            popupOpen(el.dataset.popup);
        });
    })

    popupCloseBtns.forEach(el => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            popupClose();
        });
    });

    popupArray.forEach(el => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            const elWrapper = e.target.querySelector('.popup__wrapper');
            !(elWrapper.contains(e.target)) ? popupClose() : null;
        });
    });


    customSelect('select');


    const burger = document.querySelector('.mobile-nav-burger'),
        navClose = document.querySelector('.nav-close');

    burger.addEventListener('click', function () {
        toggleNav();
    });
    navClose.addEventListener('click', function () {
        toggleNav();
    });

    const form = document.querySelectorAll('.form');
        form.forEach(el=>{
            el.addEventListener('submit',(e)=>{
                e.preventDefault();
                const formInputs = el.querySelectorAll('.text-input');
                removeError(el);
                formInputs.forEach(elInput=>{
                    !(validateInput(elInput.value)) ? showError(elInput) : null;
                });
                const errorInput = document.querySelector('.error');
                if(errorInput === undefined || errorInput === null){
                    popupOpen('.popup-thanks')
                }

            })
        })
});