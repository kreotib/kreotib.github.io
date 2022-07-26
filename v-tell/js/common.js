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

const faqInit = (faqNameStart = 'all') => {
    const faqTags = document.querySelector('.faq-tags'),
        faqTagsItems = faqTags.querySelectorAll('.faq-tags__item');

    faqTagsItems.forEach(faqTag => {
        faqTag.addEventListener('click', (e) => {
            e.preventDefault();

            faqChange(faqTag.dataset.name, faqTagsItems);
        });
    });

    const faqChange = (faqName, faqTagsItems) =>{
        const faqWrapper = document.querySelector('.faq-wrapper'),
            faqItems = faqWrapper.querySelectorAll('.faq-wrapper__item');

        faqTagsItems.forEach(faqElement =>{
            faqName === faqElement.dataset.name ? faqElement.classList.add('active') : faqElement.classList.remove('active');
        });

        if(faqName === 'all'){
            faqItems.forEach(faqElement =>{
                faqElement.classList.remove('hidden');
            });
        }else{
            faqItems.forEach(faqElement =>{
                faqName === faqElement.dataset.name ? faqElement.classList.remove('hidden') : faqElement.classList.add('hidden');
            });
        }
    }

    faqChange(faqNameStart, faqTagsItems);

};

const animateBlock = (section) => {
    const animationBlock = section.querySelectorAll('*[data-animate]');

    animationBlock.forEach((element, index) => {
        element.style.transitionDelay = `${index * .3}s`;
        element.classList.add('animated');
    });
};

const addObserver = (element) => {
    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            entry.isIntersecting ? (animateBlock(entry.target)) : null;
        });
    }, {rootMargin: '-100px'});

    observer.observe(element);
};

document.addEventListener('DOMContentLoaded', () => {
    const mapLines = document.querySelectorAll('.map-line');

    if(mapLines.length > 0){
        mapLines.forEach((element,index)=>{
            element.style.animationDelay = `${index*0.3}s`
        });
    }

    const faq = document.querySelector('.faq');
    if(faq){
        faqInit();
    }
    const sectionWithAnimation = document.querySelectorAll('[data-animate]'),
        animationSection = [];

    if(sectionWithAnimation.length > 0){
        sectionWithAnimation.forEach(el => {
            animationSection.push(el.closest('section'))
        });

        const animationSectionFiltred = animationSection.filter(function (item, pos) {
            return animationSection.indexOf(item) == pos;
        });

        animationSectionFiltred.forEach(el => {
            addObserver(el);
        });
    }

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
            spaceBetween: 39
        }),
        navSlider = new Swiper('.plan-tabs__nav', {
            slidesPerView: 'auto',
            freeMode: true,
        }),
        navSliderSecond = new Swiper('.regulation-tabs__nav', {
            slidesPerView: 'auto',
            freeMode: true,
        }),
        navSliderThird = new Swiper('.delivery-tabs__nav', {
            slidesPerView: 'auto',
            freeMode: true,
        }),
        navSliderFifth = new Swiper('.zone-tabs__nav', {
            slidesPerView: 'auto',
            freeMode: true,
        }),
        navSliderFourth = new Swiper('.faq-tags', {
            slidesPerView: 'auto',
            freeMode: true,
            spaceBetween: 8
        }),
        navSliderSix = new Swiper('.settings-tabs__nav', {
            slidesPerView: 'auto',
            freeMode: true,
        });


    customSelect('select');

    const tabs = document.querySelectorAll('.tabs'),
        tabsNavLinkArray = document.querySelectorAll('.tabs-nav__link');

    if (tabs) {
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

    toggleLinks.forEach(element => {
        element.addEventListener('click', (e) => {
            e.preventDefault();
            const toggleBlock = element.closest('.toggle-wrapper').querySelector('.toggle-block');

            element.classList.toggle('active');
            toggleBlock.classList.toggle('active');
        })
    });
});