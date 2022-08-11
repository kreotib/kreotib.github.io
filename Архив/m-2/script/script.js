document.addEventListener('DOMContentLoaded', () => {
    const popupTriggers = document.querySelectorAll('*[data-popup]'),
        popups = document.querySelectorAll('.popup'),
        popupClose = document.querySelectorAll('.popup-close');

    if (popupTriggers.length > 0) {
        popupTriggers.forEach(el => {
            el.addEventListener('click', (e) => {
                e.preventDefault();

                const popup = document.querySelector(`.${el.dataset.popup}`);

                document.body.classList.add('hidden');
                popup.classList.add('active');
            });
        });
    };

    if (popups.length > 0) {
        popups.forEach(el => {
            el.addEventListener('click', (e) => {
                if (e.target.classList.contains('popup-wrapper')) {
                    document.body.classList.remove('hidden');
                    el.classList.remove('active');
                }
            });
        });
    }

    if (popupClose.length > 0) {
        popups.forEach(el => {
            el.addEventListener('click', (e) => {
                document.body.classList.remove('hidden');
                el.classList.remove('active');
            });
        });
    };

    document.querySelector('.boxes-btn').addEventListener('click',(e)=>{
       e.preventDefault();
        document.querySelector('.advantages').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        })
    });

    if(window.innerWidth < 767){
        if(popupTriggers.length > 0){
            popupTriggers.forEach(trigger=>{
                trigger.addEventListener('click',(e)=>{
                    window.open(trigger.href)
                });
            });
        }
    }
});