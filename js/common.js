document.addEventListener('DOMContentLoaded', () => {

    //Slider init

    const vacancySlider = new Swiper(".vacancy-slider", {
            slidesPerView: 4,
            spaceBetween: 30,
            navigation: {
                nextEl: ".vacancy-slider-button-next",
                prevEl: ".vacancy-slider-button-prev",
            },
        }),
        personSlider = new Swiper(".person-slider", {
            slidesPerView: 1,
            spaceBetween: 0,
            pagination: {
                el: ".swiper-pagination",
                clickable:true,
            },
            navigation: {
                nextEl: ".person-slider-button-next",
                prevEl: ".person-slider-button-prev",
            },
        }),
        statsSlider = new Swiper(".stats-slider", {
            slidesPerView: 3,
            spaceBetween: 30,
            navigation: {
                nextEl: ".stats-slider-button-next",
                prevEl: ".stats-slider-button-prev",
            },
        }),
        countrySlider = new Swiper(".country-slider", {
            slidesPerView: 4,
            spaceBetween: 30,
            loop: true,
            navigation: {
                nextEl: ".country-slider-button-next",
                prevEl: ".country-slider-button-prev",
            },
        }),
        instaSlider = new Swiper(".instagram-slider", {
            slidesPerView: 4,
            spaceBetween: 30,
        }),
        livingSlider = new Swiper(".living-slider", {
            slidesPerView: "auto",
            freeMode: true,
            spaceBetween: 12,
            initialSlide: 3,
            loop: true,
            breakpoints: {
                600: {
                    spaceBetween: 30
                }
            },
            navigation: {
                nextEl: ".living-slider-button-next",
                prevEl: ".living-slider-button-prev",
            },
        });

    // Question settings
    const questionTrigger = document.querySelectorAll('.question-trigger');

    questionTrigger.forEach(el => {
        el.addEventListener('click', () => {
            const elParentBlock = el.closest('.question-item');

            elParentBlock.classList.toggle('active');
        });
    });
});