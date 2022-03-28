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

document.addEventListener('DOMContentLoaded',()=>{
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


    const progressBars = document.querySelectorAll('.progress-bar');

    progressBars.forEach(el=>{
       const progressBarCurrent = el.querySelector('.progress-bar-current');

       progressBarCurrent.style.width = `${el.dataset.number}%`;
    });


    const triggerLinksArray = document.querySelectorAll('.trigger-link');

    if(triggerLinksArray.length !== 0){
        triggerLinksArray.forEach(element=>{
            element.addEventListener('click',(e)=>{
                e.preventDefault();

                element.classList.toggle('active');
                element.closest('.trigger-wrapper').querySelector('.trigger-block').classList.toggle('active');
            });
        });
    }

});
