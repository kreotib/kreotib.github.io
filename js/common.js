const tabsChange = (tabs, idx = 1) => {
    const tabsNavItems = tabs.querySelectorAll('.tabs-nav__item'),
        tabsContentItems = tabs.querySelectorAll('.tabs-content__item');

    tabsNavItems.forEach((el, index) => {
        index === idx ? el.classList.add('active') : el.classList.remove('active');
    });

    tabsContentItems.forEach((el, index) => {
        index === idx ? el.classList.add('active') : el.classList.remove('active');
    });
};

document.addEventListener('DOMContentLoaded', () => {
    const formInput = document.querySelectorAll('.form-item__input');

    formInput.forEach(el => {
        el.addEventListener('blur', () => {
            el.value !== '' ? el.closest('.form-item').classList.add('form-item-filled') : null;
        });
    });

    const tabsNavItems = document.querySelectorAll('.tabs-nav__item'),
        tabs = document.querySelector('.tabs');

    tabsChange(tabs);

    tabsNavItems.forEach(el=>{
       el.addEventListener('click',(e)=>{
           e.preventDefault();

           const idx = [...e.target.closest('.tabs-nav').querySelectorAll('.tabs-nav__item')].indexOf(e.target.closest('.tabs-nav__item')),
               tabs = e.target.closest('.tabs');

           tabsChange(tabs,idx);
       });
    });
});