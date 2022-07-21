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
    }
    ;

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
    }
});