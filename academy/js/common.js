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
});