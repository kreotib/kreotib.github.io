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

const popupOpen = (selector) => {
    const popup = document.querySelector(`.${selector}`);

    popupClose();

    popup.classList.add('active');
}

const popupClose = () => {
    const popups = document.querySelectorAll('.popup');

    popups.forEach(el => {
        el.classList.remove('active');
    });
}

document.addEventListener('DOMContentLoaded', () => {
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


    const progressBars = document.querySelectorAll('.progress-bar');

    progressBars.forEach(el => {
        const progressBarCurrent = el.querySelector('.progress-bar-current');
        let dataMax;

        !el.dataset.max ? dataMax = 100 : dataMax = el.dataset.max;

        progressBarCurrent.style.width = `${el.dataset.number / dataMax * 100}%`;
    });


    const triggerLinksArray = document.querySelectorAll('.trigger-link');

    if (triggerLinksArray.length !== 0) {
        triggerLinksArray.forEach(element => {
            element.addEventListener('click', (e) => {
                e.preventDefault();

                element.classList.toggle('active');
                element.closest('.trigger-wrapper').querySelector('.trigger-block').classList.toggle('active');
            });
        });
    }


    const filterLinkArray = document.querySelectorAll('.filter-link'),
        filterBlockArray = document.querySelectorAll('.filter-block');

    if (filterLinkArray.length !== 0) {
        filterLinkArray.forEach((element) => {
            element.addEventListener('click', (e) => {
                e.preventDefault();
                filterLinkArray.forEach(el => {
                    element.dataset.name === el.dataset.name && !(el.classList.contains('active')) ? el.classList.add('active') : el.classList.remove('active');
                });

                const elementWithout = [...filterLinkArray].filter((el) => el !== element);
                element.classList.contains('active') ? elementWithout.forEach(el => el.classList.add('not-active')) : filterLinkArray.forEach(el => el.classList.remove('not-active'));

                console.log(element);

                element.classList.contains('active') ? console.log('1') : console.log('2');

                filterBlockArray.forEach(blockElement => {
                    element.dataset.name === blockElement.dataset.name && !(blockElement.classList.contains('active')) ? blockElement.classList.add('active') : blockElement.classList.remove('active');
                });
            });
        });
    }


    customSelect('.custom-select');

    const starBlock = document.querySelector('.star-block');

    if (starBlock) {
        const starBlockItems = starBlock.querySelectorAll('.star-block__item');
        starBlockItems.forEach((element, index) => {
            element.addEventListener('click', () => {
                starBlockItems.forEach((el, idx) => {
                    idx <= index ? el.classList.add('active') : el.classList.remove('active');
                });
            });
        });
    }

    const inputPassword = document.querySelectorAll('.input-password');

    if(inputPassword.length > 0){
        inputPassword.forEach(element=>{
            const inputPasswordIcon = element.querySelector('.input-password__icon'),
                inputPasswordItem = element.querySelector('.input-password-item');

            inputPasswordIcon.addEventListener('click',()=>{
               inputPasswordIcon.classList.toggle('active');
               inputPasswordIcon.classList.contains('active') ? inputPasswordItem.setAttribute('type','text') : inputPasswordItem.setAttribute('type','password');
            });
        });
    }

});
