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
    input.getAttribute('type') === 'password' ? input.setAttribute('type','text') : input.setAttribute('type','password')
}

document.addEventListener('DOMContentLoaded', () => {
    const popupTrigger = document.querySelectorAll('.popup-trigger'),
        popupArray = document.querySelectorAll('.popup');

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

    const triggerLinks = document.querySelectorAll('.trigger-link');

    triggerLinks.forEach(el=>{
        el.addEventListener('click',()=>{
           el.closest('.trigger-block').querySelector('.trigger-content').classList.toggle('active');
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
});