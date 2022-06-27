document.addEventListener('DOMContentLoaded', () => {
    /*
    const burger = document.querySelector('.burger'),
        mainNav = document.querySelector('.main-nav');

    burger.addEventListener('click', function () {
        this.classList.contains('active') ? (this.classList.remove('active'), mainNav.classList.remove('active'), document.body.classList.remove('no-scroll')) : (this.classList.add('active'), mainNav.classList.add('active'), document.body.classList.add('no-scroll'));
    });

    */

    const servicesSlider = new Swiper(".services-slider", {
            slidesPerView: 1,
            spaceBetween: 80,
            grid: {
                rows: 1,
                fill: "row",
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            breakpoints: {
                900: {
                    slidesPerView: 2,
                    grid: {
                        rows: 2,
                        fill: "row",
                    },
                },
                1385: {
                    slidesPerView: 3,
                    grid: {
                        rows: 2,
                        fill: "row",
                    },
                }
            }
        }),
        heroSlider = new Swiper(".hero-slider", {
            slidesPerView: "auto",
            spaceBetween: 15,
            pagination: {
                el: ".hero-slider-pagination",
                type: "progressbar",
            },
            breakpoints:{
                600:{
                    spaceBetween:60,
                }
            }
        });

    const heroNavigationCurrent = document.querySelector('.hero-slider__navigation-current'),
        heroNavigationLast = document.querySelector('.hero-slider__navigation-last');

    if(heroNavigationLast){
        heroNavigationLast.innerHTML = heroSlider.slides.length < 9 ? `0${heroSlider.slides.length}` : heroSlider.slides.length;
    }

    if(heroNavigationCurrent){
        heroNavigationCurrent.innerHTML = heroSlider.realIndex + 1 < 9 ? `0${heroSlider.realIndex + 1}` : heroSlider.realIndex + 1;
    }

    heroSlider.on('slideChange',()=>{
       heroNavigationCurrent.innerHTML = heroSlider.realIndex + 1 < 9 ? `0${heroSlider.realIndex + 1}` : heroSlider.realIndex + 1;
    });

    const technologyItemTriggers = document.querySelectorAll('.technology-item__header');

    if(technologyItemTriggers.length > 0){
        technologyItemTriggers.forEach(el=>{
           el.addEventListener('click',()=>{
               el.classList.toggle('active');
               el.closest('.technology-item').querySelector('.technology-item__content').classList.toggle('active');
           });
        });
    }
});