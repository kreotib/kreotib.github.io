const popupOpen = (selector) => {
    const popupBlock = document.querySelector(selector);

    popupClose();

    popupBlock.classList.add('active');
};

const popupClose = () => {
    const popupBlocks = document.querySelectorAll('.popup');

    popupBlocks.forEach(el => {
        el.classList.remove('active');
    });
}

const changeTab = (tabBlock, idx = 0) => {
    const tabBlockContents = tabBlock.querySelectorAll('.tabs-content__item'),
        tabBlockLink = tabBlock.querySelectorAll('.tabs-nav__item');

    tabBlockContents.forEach((el, index) => {
        index !== idx ? el.classList.remove('active') : el.classList.add('active');
    });

    tabBlockLink.forEach((el, index) => {
        index !== idx ? el.querySelector('.tabs-nav__link').classList.remove('active') : el.querySelector('.tabs-nav__link').classList.add('active');
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.burger'),
        mainNav = document.querySelector('.left-aside'),
        pageContent = document.querySelector('.page-content');

    burger.addEventListener('click', function () {
        this.classList.toggle('hide');
        mainNav.classList.toggle('hide');
        pageContent.classList.toggle('full');
        document.body.classList.toggle('no-scroll-mob')
    });

    const triggerBlockLinks = document.querySelectorAll('.trigger-link');

    triggerBlockLinks.forEach(el=>{
       el.addEventListener('click',(e)=>{
           e.preventDefault();

           el.closest('.trigger').classList.toggle('active');
       })
    });

    const popupBtns = document.querySelectorAll('.popup-trigger'),
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
            const elWrapper = el.querySelector('.popup__wrapper');
            !(elWrapper.contains(e.target)) ? popupClose() : null;
        });
    });

    const tabsArr = document.querySelectorAll('.tabs');

    tabsArr.forEach(el=>{
       changeTab(el,0)
    });

    document.querySelectorAll('.tabs-nav__link').forEach(el => {
        el.addEventListener('click', (event) => {
            event.preventDefault();
            changeTab(el.closest('.tabs'), [...el.closest('.tabs').querySelectorAll('.tabs-nav__link')].indexOf(event.target))
        });
    });


    const tableSlider = new Swiper(".table", {
            direction:"horizontal",
            slidesPerView: 'auto',
            freeMode: true,
            spaceBetween:0,
            mousewheel: true,
            scrollbar: {
                el: ".swiper-scrollbar",
            },
        });
});