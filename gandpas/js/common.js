const popupOpen = (popupSelector) =>{
  popupClose();

  const popup = document.querySelector(`.${popupSelector}`),
      body = document.body;

  popup.classList.add('active');
  body.classList.add('no-scroll');
};
const popupClose = () =>{
    const popupsArray = document.querySelectorAll('.popup'),
        body = document.body;

    popupsArray.forEach(el=>{
       el.classList.remove('active');
    });
    body.classList.remove('no-scroll');
};

const changeTab = (block, newIndex = 0) => {
    const tabsNavArray = block.querySelector('.tabs-nav'),
        tabsContentArray = block.querySelector('.tabs-content'),
        tabsNavItemArray = tabsNavArray.querySelectorAll('.tabs-nav__item'),
        tabsContentItemArray = [...tabsContentArray.children];

    changeIndex(tabsNavItemArray, newIndex);
    changeIndex(tabsContentItemArray, newIndex);
};
const changeIndex = (array, newIndex) => {
    array.forEach((el, index) => {
        index === newIndex ? el.classList.add('active') : el.classList.remove('active')
    });
}
const findTabIndex = (el) => {
    const tabsItemArray = [...el.closest('.tabs').querySelectorAll('.tabs-nav__item')];

    return tabsItemArray.indexOf(el.closest('.tabs-nav__item'));
}

const showHidePassword = (target) =>{
    const input = target.closest('.form__input').querySelector('input');
    input.getAttribute('type') === 'password' ? (input.setAttribute('type','text'), target.classList.add('active')) : (input.setAttribute('type','password'), target.classList.remove('active'));
}

const createStars = () =>{
  const div = document.createElement('div');
  div.classList.add('stars-block__item');
  div.innerHTML = '<svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
      '<path d="M19.809 12.396L19.9179 12.7483H20.2867H31.0101L22.2784 19.353L21.9988 19.5645L22.1023 19.8994L25.4257 30.6493L16.8041 24.0445L16.5 23.8115L16.1959 24.0445L7.56844 30.6538L10.8448 19.9533L10.9464 19.6212L10.6707 19.41L1.97486 12.7483H12.7133H13.0821L13.191 12.396L16.5 1.69282L19.809 12.396Z" stroke="#FFCE31"/>\n' +
      '</svg>'

    return div
};
const changeStar = (index,block) =>{
  const arrayStar = block.querySelectorAll('.stars-block__item');

  arrayStar.forEach((el,idx)=>{
     idx <= index ? el.classList.add('filled') : el.classList.remove('filled');
  });

  block.dataset.count = index + 1;
};


const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

const createError = (text) =>{
    const errorBlock = document.createElement('div');
    errorBlock.classList.add('form__input-error');
    errorBlock.innerHTML = text;

    return errorBlock;
};

const inputValidation = (typeInput, errorText, input) => {
    if(typeInput === 'email'){
        !validateEmail(input.value) ? (input.closest('.form__input').append(createError(errorText)), input.classList.add('error')) : null;
    }
    if(typeInput === 'promo'){
        !validateEmail(input.value) ? (input.closest('.form__input').append(createError(errorText)), input.classList.add('error')) : input.classList.add('success');
    }
};
document.addEventListener('DOMContentLoaded', () => {
    const popupTrigger = document.querySelectorAll('.popup-trigger'),
        popupArray = document.querySelectorAll('.popup'),
        popupCloseBtns = document.querySelectorAll('.popup-close');

    popupTrigger.forEach(el=>{
        el.addEventListener('click',(e)=>{
           e.preventDefault();

           popupOpen(el.dataset.popup);
        });
    });

    popupArray.forEach(el=>{
        el.addEventListener('click',(e)=>{
            e.target.classList.contains('popup__wrapper') ? popupClose() : null;
        });
    });

    popupCloseBtns.forEach(el=>{
       el.addEventListener('click',()=>{
          popupClose();
       });
    });

    const triggerLinks = document.querySelectorAll('.trigger-link');

    triggerLinks.forEach(el=>{
        el.addEventListener('click',()=>{
           el.closest('.trigger-block').querySelector('.trigger-content').classList.toggle('active');
           el.closest('.trigger-block').classList.toggle('active');
           el.classList.toggle('active');
        });
    });


    const tabs = document.querySelectorAll('.tabs'),
        tabsNavLinkArray = document.querySelectorAll('.tabs-nav__link');

    tabs.forEach(el => {
        changeTab(el);
    });

    tabsNavLinkArray.forEach(el => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            changeTab(el.closest('.tabs'), findTabIndex(el));
        })
    });

    const passwordViewTriggers = document.querySelectorAll('.password-view-trigger');

    passwordViewTriggers.forEach(el=>{
       el.addEventListener('click',(e)=>{
           e.preventDefault();

           showHidePassword(el);
       })
    });

    const buySlider = new Swiper(".buy-slider", {
        direction: "horizontal",
        slidesPerView: "auto",
        freeMode: true,
        scrollbar: {
            el: ".swiper-scrollbar",
        },
        mousewheel: true,
    });

    const starsBlock = document.querySelectorAll('.stars-block');

    starsBlock.forEach(el=>{
        for (let i = 0; i < 5 ; i++) {
            el.append(createStars());
        }

        el.addEventListener('mouseover',(e)=>{
            const starsArray = [...el.querySelectorAll('.stars-block__item')];
            if(e.target.classList.contains('stars-block__item')){
                changeStar(starsArray.indexOf(e.target), el);
            }else{
                changeStar(starsArray.indexOf(e.target.closest('.stars-block__item')), el);
            }
        });
    });

    const courseProgressBar = document.querySelectorAll('.course-progress__bar-line');

    courseProgressBar.forEach(el=>{
       el.style.width = el.dataset.count;
    });

    customSelect('.form__select-item');


    const input = document.querySelector("#phone");

    if(input){
        window.intlTelInput(input, {
            customPlaceholder: function(selectedCountryPlaceholder, selectedCountryData) {
                return "e.g. " + selectedCountryPlaceholder;
            },
        });
    }

    const emailInput = document.querySelectorAll('input[type="email"]'),
        promoInput = document.querySelectorAll('input[name="promo"]');

    emailInput.forEach(el=>{
       el.addEventListener('change',()=>{
           const inputWrapper = el.closest('.form__input'),
                errorArray =  inputWrapper.querySelectorAll('.form__input-error');
           el.classList.remove('error');
           errorArray.forEach(el=>{el.remove()});
           inputValidation('email', 'Некорретный email', el);
       });
    });
    promoInput.forEach(el=>{
        el.addEventListener('change',()=>{
            const inputWrapper = el.closest('.form__input'),
                errorArray =  inputWrapper.querySelectorAll('.form__input-error');
            el.classList.remove('error');
            errorArray.forEach(el=>{el.remove()});
            inputValidation('promo', 'Некорретный промокод', el);
        });
    });

    const image = document.querySelector('.cropp__img img');
    const cropper = new Cropper(image, {
        aspectRatio: 16 / 9,
        crop(event) {

        },
    });
});