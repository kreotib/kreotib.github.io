const popupOpen = (selector) => {
    const popupBlock = document.querySelector(selector);

    popupClose();

    popupBlock.classList.add('active');
};

const popupClose = () => {
    const popupBlocks = document.querySelectorAll('.popup');

    popupBlocks.forEach(el => {
        el.classList.remove('active');
    });
}

const changeTab = (tabBlock, idx = 0) => {
    const tabBlockContents = tabBlock.querySelectorAll('.tabs-content__item'),
        tabBlockLink = tabBlock.querySelectorAll('.tabs-nav__item');

    tabBlockContents.forEach((el, index) => {
        index !== idx ? el.classList.remove('active') : el.classList.add('active');
    });

    tabBlockLink.forEach((el, index) => {
        index !== idx ? el.querySelector('.tabs-nav__link').classList.remove('active') : el.querySelector('.tabs-nav__link').classList.add('active');
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.burger'),
        mainNav = document.querySelector('.left-aside'),
        pageContent = document.querySelector('.page-content');

    burger.addEventListener('click', function () {
        this.classList.toggle('hide');
        mainNav.classList.toggle('hide');
        pageContent.classList.toggle('full');
        document.querySelector('body').classList.toggle('no-scroll-mob');
        document.querySelector('html').classList.toggle('no-scroll-mob')
    });

    const triggerBlockLinks = document.querySelectorAll('.trigger-link');

    triggerBlockLinks.forEach(el => {
        el.addEventListener('click', (e) => {
            e.preventDefault();

            el.closest('.trigger').classList.toggle('active');
        })
    });

    const popupBtns = document.querySelectorAll('.popup-trigger'),
        popupCloseBtns = document.querySelectorAll('.popup-close'),
        popupArray = document.querySelectorAll('.popup');

    popupBtns.forEach(el => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            popupOpen(el.dataset.popup);
        });
    })

    popupCloseBtns.forEach(el => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            popupClose();
        });
    });

    popupArray.forEach(el => {
        el.addEventListener('click', (e) => {
            const elWrapper = el.querySelector('.popup__wrapper');
            !(elWrapper.contains(e.target)) ? popupClose() : null;
        });
    });

    const tabsArr = document.querySelectorAll('.tabs');

    tabsArr.forEach(el => {
        changeTab(el, 0)
    });

    document.querySelectorAll('.tabs-nav__link').forEach(el => {
        el.addEventListener('click', (event) => {
            event.preventDefault();
            changeTab(el.closest('.tabs'), [...el.closest('.tabs').querySelectorAll('.tabs-nav__link')].indexOf(event.target))
        });
    });


    const tableSlider = new Swiper(".table", {
        direction: "horizontal",
        slidesPerView: 'auto',
        freeMode: true,
        spaceBetween: 0,
        mousewheel: true,
        scrollbar: {
            el: ".swiper-scrollbar",
        },
    });

    const gainedChart = document.querySelector('.chart').getContext('2d');

    const gain = [74.699997, 76.580002, 81.349998, 83.000000, 85.879997, 83.120003, 77.989998, 81.279999,83.000000, 85.879997, 83.120003,];
    const dates = ["Jan 2, 20","Jan 8, 20", "Feb 3, 20","Feb 8, 20","Feb 15, 20","Mar 4, 20", "Apr 5, 20", "May 6, 20", "Jun 9, 20", "Nov 10, 20", "Dec 11, 20", "Dec 14, 20"];
    const gradient = gainedChart.createLinearGradient(0,0,0,400);
    gradient.addColorStop(1,"rgba(255,217,0,1)");
    gradient.addColorStop(0,"rgba(232,111,0,1)");
    let gainData = {
        datasets: [{
            data: gain,
            fill:true,
            backgroundColor: gradient,
            pointBackgroundColor: 'rgba(255, 66, 66, 1)',
            pointBorderColor:'rgba(256,256,256,1)',
            pointBorderWidth:3,
            pointRadius:5,
            order: 0,
        }]
    };
    let gainConfig = {
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    label: function(tooltipItem, data) {
                        return parseInt(tooltipItem.parsed.y)
                    }
                }
            },
        },
        scales: {
            x: {
                type: 'time',
                ticks: {
                    color:'rgba(41,123,199,255)',
                },
                time: {
                    minUnit: 'month'
                },
                grid:{
                    display: false,
                }
            },
            y: {
                suggestedMax: 45,
                ticks: {
                    display:false,
                    stepSize: 5,
                    //max: 100
                },
                grid:{
                    display: false,
                    color:'transparent',
                }
            },
        },
        maintainAspectRatio: false,
        responsive: true,
    };
    let lineGainChart = new Chart(gainedChart, {
        type: 'line',
        data: gainData,
        options: gainConfig,
        plugins: [{
            beforeInit: function(lineGainChart) {
                for (let c = 0; c < dates.length; c++) {

                    let myMoment = moment(dates[c], 'MMM D, YYYY');

                    lineGainChart.data.labels.push(myMoment);
                }
            }
        }]
    });

});