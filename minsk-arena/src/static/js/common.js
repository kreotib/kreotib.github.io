const toggleShowBlock = (block) => {
    block.classList.toggle('show');
};

const changeTab = (block, idx = 0) =>{
    const tabsLinkList = [...block.querySelectorAll('.tabs-nav__link')],
        tabsContentList = [...block.querySelectorAll('.tabs-content__item')];

    tabsLinkList.forEach((el,index)=>{
        index === idx ? el.classList.add('active') : el.classList.remove('active');
    });

    tabsContentList.forEach((el,index)=>{
        index === idx ? el.classList.add('active') : el.classList.remove('active');
    });
};

document.addEventListener('DOMContentLoaded', () => {
    const heroSlider = new Swiper(".hero-slider", {
            spaceBetween: 30,
            centeredSlides: true,
            speed: 1500,
            autoplay: {
                delay: 10000,
            }
        }),
        articlesImg = new Swiper(".articles-img-slider", {
            speed: 1500,
            loop: true,
            navigation: {
                nextEl: ".articles-img-button-next",
                prevEl: ".articles-img-button-prev",
            },
        }),
        archiveSlider = new Swiper(".archive-slider", {
            direction:"horizontal",
            slidesPerView: 'auto',
            freeMode: true,
            spaceBetween:0,
            navigation: {
                nextEl: ".archive-slider-next",
                prevEl: ".archive-slider-prev",
            },
            scrollbar: {
                el: ".swiper-scrollbar",
            },
        }),

        gallerySlider = new Swiper(".gallery-slider", {
            slidesPerView: 1,
            spaceBetween: 10,
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            breakpoints:{
                600:{
                    slidesPerView:3
                },
                475:{
                    slidesPerView:2
                }
            }
        });
    const searchTriggerOpen = document.querySelector('.search-trigger'),
        searchBlock = document.querySelector('.search-block'),
        searchTriggerClose = document.querySelector('.search-block-close');

    searchTriggerOpen.addEventListener('click', () => toggleShowBlock(searchBlock));
    searchTriggerClose.addEventListener('click', () => toggleShowBlock(searchBlock));

    const navBurger = document.querySelector('.nav-list__item_burger'),
        navBlock = document.querySelector('.mobile-nav'),
        navWrapper = document.querySelector('.mobile-nav__wrapper');

    navBurger.addEventListener('click', (e) => {
        e.preventDefault();
        toggleShowBlock(navBlock)
    });
    navBlock.addEventListener('click', (e) => !(navWrapper).contains(e.target) ? toggleShowBlock(navBlock) : null);

    const headerSecondRow = document.querySelector('.header__row_second'),
        headerSecondRowOffsetTop = headerSecondRow.offsetTop;

    document.addEventListener('scroll', () => {
        window.scrollY > headerSecondRowOffsetTop ? headerSecondRow.classList.add('fixed') : headerSecondRow.classList.remove('fixed');
    });

    const tabsArray = document.querySelectorAll('.tabs'),
        tabsNavLinks = document.querySelectorAll('.tabs-nav__link');

    tabsArray.forEach(el=>{
        changeTab(el);
    });

    tabsNavLinks.forEach(el=>{
        el.addEventListener('click',e=>{
           e.preventDefault();
           const tabsNavLinksArray = [...el.closest('.tabs').querySelectorAll('.tabs-nav__item')],
               idx = tabsNavLinksArray.indexOf(el.closest('.tabs-nav__item'));

           changeTab(el.closest('.tabs'),idx);
        });
    })
});