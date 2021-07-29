const changeTab  = (tab, index = 0)=>{
    const tabsNavItems = tab.querySelectorAll('.tabs-nav__item'),
        tabsContentItems = tab.querySelectorAll('.tabs-content__item');
    index < 0 ? index = 0 : index;
    index > tabsNavItems.length ? index = tabsNavItems.length - 1 : index;
    tabsNavItems.forEach((el,ind)=>{
        ind !== index ? el.classList.remove('active') : el.classList.add('active');
    });
    tabsContentItems.forEach((el,ind)=>{
        ind !== index ? el.classList.remove('active') : el.classList.add('active');
    });
}
$(document).ready(function () {
    const tabsList = document.querySelectorAll('.tabs');
    tabsList.forEach(el=>{
        changeTab(el);
        const tabsNavLinks = [...el.querySelectorAll('.tabs-nav__link')];
        tabsNavLinks.forEach((element,index)=>{
            element.addEventListener('click',(event)=>{
                event.preventDefault();
                changeTab(element.closest('.tabs'),index);
            });
        });
    });
});
