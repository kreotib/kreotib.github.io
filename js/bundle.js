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

document.addEventListener('DOMContentLoaded',()=>{
    let burger = document.querySelector('.header-burger');
    let headerNav = document.querySelector('.header-nav');
    let body = document.querySelector('body');


    if(burger) {
        burger.addEventListener('click', function(){
            this.classList.toggle('active');
            headerNav.classList.toggle('active');
            body.classList.toggle('overflow');
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



