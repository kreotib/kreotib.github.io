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

document.addEventListener('DOMContentLoaded', () => {

    const burger = document.querySelector('.burger'),
        mainNav = document.querySelector('.main-nav');

    burger.addEventListener('click', function () {
        this.classList.contains('active') ? (this.classList.remove('active'), mainNav.classList.remove('active'), document.body.classList.remove('no-scroll')) : (this.classList.add('active'), mainNav.classList.add('active'), document.body.classList.add('no-scroll'));
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

    const heroSliderReady = document.querySelectorAll('.hero-slider__ready-text');

    heroSliderReady.forEach(el=>{
       const value = el.querySelector('span'),
           readyRow = el.closest('.hero-slider__ready').querySelector('.hero-slider__ready-completed');

       readyRow.style.width = value.innerText;
    });

    const achievementsSlider = new Swiper(".achievements-slider", {
            autoplay:{
                delay:1500,
                speed:300,
            },
            loop:true,
            slidesPerView: 3,
            spaceBetween: 7,
            breakpoints: {
                475:{
                    slidesPerView: 5,
                    grid:{
                        rows:1,
                    }
                }
            }

        }), layoutSlider = new Swiper(".layout-slider", {
            spaceBetween: 0,
            slidesPerView: "auto",
            breakpoints:{
                992:{
                    direction: "vertical",
                    slidesPerView:3,
                },
            },
            navigation: {
                nextEl: ".layout-slider-button",
            },
        }), newsSlider = new Swiper(".news-slider", {
            slidesPerView: "auto",
            spaceBetween: 50,
        }),
        heroBgSlider = new Swiper(".hero-bg-slider", {
            slidesPerView: 1,
            spaceBetween: 0,
            loop: true,
            speed:1000,
        }),
        heroSlider = new Swiper('.hero-slider', {
            loopAdditionalSlides: 1,
            slidesPerView: 1,
            centeredSlides: true,
            loop:true,

            pagination: {
                el: ".hero-pagination",
                clickable:true,
            },

            breakpoints:{
                1440:{
                    spaceBetween:140,
                    slidesPerView:3,
                },
                1024:{
                    spaceBetween:30,
                    slidesPerView:3,
                }
            }
        }),
        achievementsSliderBig = new Swiper(".achievements-slider-big", {
            slidesPerView: 1,
            spaceBetween: 25,
            breakpoints:{
                1100:{
                    slidesPerView:4,
                },
                800:{
                  slidesPerView:3,
                },
                475:{
                    slidesPerView:2,
                }
            },
            navigation: {
                nextEl: ".swiper-button-next",
            },
        }),
        objectSlider = new Swiper(".object-slider", {
            slidesPerView: 1,
            spaceBetween: 25,
            effect: 'fade',
            speed:500,
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
        });

    heroSlider.on('slideChange',function (){
       heroBgSlider.slideTo(heroSlider.realIndex);
    });

    const scroll = new SmoothScroll('a[href*="#"]', {
        speed: 1000
    });

});