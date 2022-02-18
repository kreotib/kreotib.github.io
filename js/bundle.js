const startTimer = () =>{
    const timer = document.querySelector('.timer'),
        deadLine = new Date(timer.dataset.end),
        diff = deadLine - new Date(),
        hours = diff > 0 ? Math.floor(diff / 1000 / 60 / 60) % 24 : 0,
        minutes = diff > 0 ? Math.floor(diff / 1000 / 60) % 60 : 0,
        days = diff > 0 ? Math.floor(diff / 1000 / 60 / 60 / 24) : 0,
        hoursBlock = timer.querySelector('.timer__hours'),
        minutesBlock = timer.querySelector('.timer__minutes'),
        daysBlock = timer.querySelector('.timer__days');

    hoursBlock.querySelector('span:nth-child(1)').textContent = _timerTextRefactor(hours)[0];
    hoursBlock.querySelector('span:nth-child(2)').textContent = _timerTextRefactor(hours)[1];
    minutesBlock.querySelector('span:nth-child(1)').textContent = _timerTextRefactor(minutes)[0];
    minutesBlock.querySelector('span:nth-child(2)').textContent = _timerTextRefactor(minutes)[1];
    daysBlock.querySelector('span:nth-child(1)').textContent = _timerTextRefactor(days)[0];
    daysBlock.querySelector('span:nth-child(2)').textContent = _timerTextRefactor(days)[1];
};

const _timerTextRefactor = (text)=>{
    return text < 10 ? String(`0${text}`) : String(text);
}

const openPopup = (popupSelector) =>{
    const popup = document.querySelector(`.${popupSelector}`);

    popup.classList.add('active');
    document.body.classList.add('overflow')
}

const closePopup = (popup) =>{
    popup.classList.remove('active');
    document.body.classList.remove('overflow')
}

const showCloseMenu = (stopScroll = true)=>{
    let headerNav = document.querySelector('.header-nav');
    let body = document.querySelector('body'),
        heroLogos = document.querySelector('.hero-logos'),
        burger = document.querySelector('.header-burger');

    burger.classList.toggle('active');
    headerNav.classList.toggle('active');
    stopScroll ? body.classList.toggle('overflow') : body.classList.remove('overflow');
    heroLogos.classList.toggle('active');
}

document.addEventListener('DOMContentLoaded',()=>{
    const header = document.querySelector('.header');

    document.addEventListener('scroll',(e)=>{
        pageYOffset > header.clientHeight ? header.classList.add('active') : header.classList.remove('active');
    });

    let burger = document.querySelector('.header-burger');

    document
        .querySelectorAll('.header-nav__item[href^="#"]')
        .forEach(trigger => {
            trigger.onclick = function(e) {
                e.preventDefault();
                let hash = this.getAttribute('href');
                let target = document.querySelector(hash);
                let elementPosition = target.offsetTop;

                showCloseMenu(false);

                window.scrollTo({
                    top: elementPosition,
                    behavior: "smooth"
                });
            };
        });

    if(burger) {
        burger.addEventListener('click', function(){
            showCloseMenu();
        })
    }

    const timer = document.querySelector('.timer');

    if(timer){
        let timerId = null;
        startTimer();
        timerId = setInterval(startTimer, 1000);
    }

    const questionTrigger = document.querySelectorAll('.question-item__content');

    questionTrigger.forEach(el=>{
       el.addEventListener('click',(e)=>{
           e.preventDefault();

           el.classList.toggle('active');
           el.closest('.question-item').querySelector('.answer-item__text').classList.toggle('active');
       });
    });

    const popupTrigger = document.querySelectorAll('.popup-trigger'),
        popup = document.querySelectorAll('.popup');

    popupTrigger.forEach(el=>{
        el.addEventListener('click',(e)=>{
            e.preventDefault();
            openPopup(el.dataset.popup);
        })
    });

    popup.forEach(el=>{
        el.addEventListener('click',(e)=>{
            e.target.classList.contains('popup-close') || e.target.classList.contains('popup__wrapper') ? closePopup(el) : null;
        });
    })

    const cookieAlertClose = document.querySelector('.cookie-alert__close'),
        cookieAlert = document.querySelector('.cookie-alert');

    cookieAlertClose.addEventListener('click',(e)=>{
       e.preventDefault()

       cookieAlert.classList.add('hidden');
    });

    const picker = datepicker('.calendar-select__item',{
        customDays: ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'],
        customMonths: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        showAllDates: true
    });

    const productSlider = new Swiper(".product-slider", {
        slidesPerView: 1,
        spaceBetween: 30,
        breakpoints: {
            1366: {
                slidesPerView: 5,
                grid: {
                    rows: 3,
                    fill: 'row',
                },
            },
            991: {
                slidesPerView: 4,
                grid: {
                    rows: 5,
                    fill: 'row',
                },
            },
            700: {
                slidesPerView: 3,
                grid: {
                    rows: 5,
                    fill: 'row',
                },
                navigation: {

                }
            },
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });
});



