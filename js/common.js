const popupShow = (selector) =>{
    const popup = document.querySelector(selector);

    popup.classList.add('active');
}

document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.burger'),
        mainNav = document.querySelector('.page-list');

    burger.addEventListener('click', function () {
        this.classList.toggle('hide');
        mainNav.classList.toggle('hide');
    });

    const triggerBlockLinks = document.querySelectorAll('.trigger-link');

    triggerBlockLinks.forEach(el=>{
       el.addEventListener('click',(e)=>{
           e.preventDefault();

           el.closest('.trigger').classList.toggle('active');
       })
    });

    const popupTriggers = document.querySelectorAll('.popup-trigger');

    popupTriggers.forEach(el=>{
       el.addEventListener('click',(e)=>{
           e.preventDefault();

           popupShow(el.dataset.popup);
       })
    });
});