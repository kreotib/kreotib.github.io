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
    const heroSlider = new Swiper('.hero-slider', {
            loop: true,
            slidesPerView: 1,
            pagination: {
                clickable: true,
                el: '.hero-slider__pagination',
            }
        }),
        planSlider = new Swiper('.plan-slider', {
            slidesPerView: 'auto',
            spaceBetween:39
        }),
        navSlider = new Swiper('.plan-tabs__nav', {
            slidesPerView: 'auto',
        });

    customSelect('select');

    const tabs = document.querySelectorAll('.tabs'),
        tabsNavLinkArray = document.querySelectorAll('.tabs-nav__link');

    if(tabs){
        tabs.forEach(el => {
            changeTab(el);
        });

        tabsNavLinkArray.forEach(el => {
            el.addEventListener('click', (e) => {
                e.preventDefault();
                changeTab(el.closest('.tabs'), findTabIndex(el));
            })
        });
    }

    const toggleLinks = document.querySelectorAll('.toggle-link');

    toggleLinks.forEach(element=>{
       element.addEventListener('click',(e)=>{
           e.preventDefault();
           const toggleBlock = element.closest('.toggle-wrapper').querySelector('.toggle-block');

           element.classList.toggle('active');
           toggleBlock.classList.toggle('active');
       })
    });
});