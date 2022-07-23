document.addEventListener('DOMContentLoaded', () => {
    const triggerLinks = document.querySelectorAll('.trigger-link');

    if (triggerLinks.length > 0) {
        triggerLinks.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();

                const triggerWrapper = trigger.closest('.trigger-wrapper'),
                    triggerBlock = triggerWrapper.querySelector('.trigger-block');

                trigger.classList.toggle('active');
                triggerBlock.classList.toggle('active');
            });
        });
    }

    const burger = document.querySelector('.burger'),
        nav = document.querySelector('.header__nav');

    burger.addEventListener('click',()=>{
       nav.classList.toggle('active');
       burger.classList.toggle('active');
       body.classList.toggle('no-scroll-m')
    });
});