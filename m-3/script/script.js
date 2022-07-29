const sliderTabsInit = (slider,newIndex = 0) => {
    const sliderTabsNavLink = document.querySelectorAll('.slider-tabs__link');

    sliderTabsNavLink.forEach((element,index) => {
        element.addEventListener('click', (e) => {
            e.preventDefault();
            changeSliderTabs(index);

            slider.slideTo(index);
        });
    });


    changeSliderTabs(newIndex);
}

const changeSliderTabs = (newIndex = 0) => {
    const sliderTabsNavLink = document.querySelectorAll('.slider-tabs__link');

    sliderTabsNavLink.forEach((element, index) => {
        index !== newIndex ? element.classList.remove('active') : element.classList.add('active');
    });
};

document.addEventListener('DOMContentLoaded', () => {
    const sliderTabs = new Swiper(".slider-tabs", {
            slidesPerView: "auto",
            freeMode: true,
            mousewheel: true,
        }),
        slider = new Swiper(".slider-wrapper", {
            slidesPerView: 1,
            autoHeight: true,
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            on:{
                init:function(){
                    sliderTabsInit(this);
                }
            }
        });

    slider.on('slideChange',()=>{
        changeSliderTabs(slider.realIndex);
    });

    document.querySelector('.boxes-btn').addEventListener('click', (e) => {
        e.preventDefault();

        document.querySelector('.advantages').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        })
    });

});