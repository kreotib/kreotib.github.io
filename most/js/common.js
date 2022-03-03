const triggerBlockToggle = (event) =>{
    event.preventDefault();
    const eventTarget = event.target,
        triggerWrapper = eventTarget.closest('.trigger-block-wrapper');

    triggerWrapper.classList.toggle('active');
};

document.addEventListener('DOMContentLoaded', () => {

    const triggerLinksArray = document.querySelectorAll('.trigger-block-link');

    triggerLinksArray.forEach(el=>{
       el.addEventListener('click',(e)=>triggerBlockToggle(e));
    });



    const burger = document.querySelector('.burger'),
        mainNav = document.querySelector('.header__nav');

    burger.addEventListener('click', function () {
        this.classList.contains('active') ? (this.classList.remove('active'), mainNav.classList.remove('active'), document.body.classList.remove('no-scroll')) : (this.classList.add('active'), mainNav.classList.add('active'), document.body.classList.add('no-scroll'));
    });
});