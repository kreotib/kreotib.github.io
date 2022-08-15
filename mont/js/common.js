const tabsInit = () => {
    const tabs = document.querySelectorAll('.tabs');

    if (tabs.length > 0) {
        tabs.forEach(el => {
            changeTab(el);
        });

        const tabsNavLinkArray = document.querySelectorAll('.tabs-nav__link');
        tabsNavLinkArray.forEach(el => {
            el.addEventListener('click', (e) => {
                e.preventDefault();
                changeTab(el.closest('.tabs'), findTabIndex(el));
            })
        });
    }
}

const changeTab = (block, newIndex = 0) => {
    const tabsNavArray = block.querySelector('.tabs-nav'),
        tabsContentArray = block.querySelector('.tabs-content'),
        tabsNavItemArray = tabsNavArray.querySelectorAll('.tabs-nav__item'),
        tabsContentItemArray = [...tabsContentArray.children];

    changeIndex(tabsNavItemArray, newIndex);
    changeIndex(tabsContentItemArray, newIndex);
};

const changeIndex = (array, newIndex) => {
    array.forEach((el, index) => {
        index === newIndex ? el.classList.add('active') : el.classList.remove('active')
    });
};

const findTabIndex = (el) => {
    const tabsItemArray = [...el.closest('.tabs').querySelectorAll('.tabs-nav__item')];

    return tabsItemArray.indexOf(el.closest('.tabs-nav__item'));
};

const expandableListInit = (expandableList, count) => {
    const expandableListItems = expandableList.querySelectorAll('.expandable-list-item'),
        expandableListLink = expandableList.querySelector('.expandable-list-link'),
        expandableListLinkText = `еще ${+expandableListItems.length - +count} поставщиков`;

    expandableListItems.forEach((element, index) => {
        index >= count ? element.classList.add('hidden') : null;
    });

    expandableListItems.length < count ? expandableListLink.classList.add('hidden') : expandableListLink.textContent = expandableListLinkText;

    expandableListLink.addEventListener('click', (e) => {
        e.preventDefault();

        expandableListLink.classList.toggle('active');
        expandableListLink.classList.contains('active') ? expandableListLink.text = 'скрыть' : expandableListLink.text = expandableListLinkText;

        if (expandableListLink.classList.contains('active')) {
            expandableListItems.forEach(element => {
                element.classList.remove('hidden');
            });
        } else {
            expandableListItems.forEach((element, index) => {
                index >= count ? element.classList.add('hidden') : null;
            });
        }
    });
}

const commentTextExpand = (slider) => {
    const commentItemText = document.querySelectorAll('.comment-item__text');

    commentItemText.forEach(element => {
        if (element.textContent.length > 220) {
            const elementFullText = element.textContent,
                elementSliceText = elementFullText.slice(0, 220);

            element.textContent = elementSliceText;

            const elementLink = document.createElement('a');

            elementLink.setAttribute('href', '#');
            elementLink.classList.add('comment-item__link');
            elementLink.textContent = 'читать полностью'
            element.after(elementLink);

            elementLink.addEventListener('click', (e) => {
                e.preventDefault();

                elementLink.classList.toggle('active');
                elementLink.classList.contains('active') ? (elementLink.textContent = 'скрыть', element.textContent = elementFullText) : (elementLink.textContent = 'показать полностью', element.textContent = elementSliceText);
                slider.updateAutoHeight(500)
            });
        }
    });
};

const popupOpen = (selector) => {
    const popup = document.querySelector(`.${selector}`);

    popupClose();

    popup.classList.add('active');
}

const popupClose = () => {
    const popups = document.querySelectorAll('.popup');

    popups.forEach(el => {
        el.classList.remove('active');
    });
}

const createFileBlock = (text) => {
    const blockFile = document.createElement('span'),
        blockFileClose = document.createElement('span');

    blockFile.classList.add('file-input-text');
    blockFile.textContent = text;

    blockFileClose.classList.add('file-input-close');

    blockFile.append(blockFileClose);

    return blockFile;
}

document.addEventListener('DOMContentLoaded', () => {
    tabsInit();

    const popups = document.querySelectorAll('.popup'),
        popupBtns = document.querySelectorAll('*[data-popup]');

    if (popups.length > 0) {
        popups.forEach(el => {
            const popupCloseBtn = el.querySelector('.popup-close');

            popupCloseBtn.addEventListener('click', () => {
                popupClose();
            });

            el.addEventListener('click', (e) => {
                e.target.classList.contains('popup-wrapper') ? popupClose() : null;
            });
        });
    }
    if (popupBtns.length > 0) {
        popupBtns.forEach(el => {
            el.addEventListener('click', (e) => {
                e.preventDefault();
                popupOpen(el.dataset.popup);
            });
        })
    }

    const triggerLinks = document.querySelectorAll('.trigger-link');

    if (triggerLinks.length > 0) {
        triggerLinks.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();

                const triggerWrapper = trigger.closest('.trigger-wrapper'),
                    triggerBlock = triggerWrapper.querySelectorAll('.trigger-block');

                trigger.classList.toggle('active');
                triggerBlock.forEach(element => {
                    element.classList.toggle('active');
                })
            });
        });
    }

    const burger = document.querySelector('.burger'),
        nav = document.querySelector('.header__nav');

    burger.addEventListener('click', () => {
        nav.classList.toggle('active');
        burger.classList.toggle('active');
        document.body.classList.toggle('no-scroll-m');
    });

    const filter = document.querySelector('.filter-wrapper'),
        filterShowBtn = document.querySelector('.filter-show'),
        filterCloseBtn = document.querySelector('.filter-close');

    if (filter) {
        filterShowBtn.addEventListener('click', (e) => {
            e.preventDefault();

            filter.classList.add('active');
            document.body.classList.add('no-scroll-m');
        });
        filterCloseBtn.addEventListener('click', (e) => {
            e.preventDefault();

            filter.classList.remove('active');
            document.body.classList.remove('no-scroll-m');
        });
    }

    const expandableList = document.querySelectorAll('.expandable-list');

    if (expandableList.length > 0) {
        expandableList.forEach(element => {
            expandableListInit(element, element.dataset.count);
        });
    }

    const cookieAlert = document.querySelector('.cookie-alert');

    if (cookieAlert) {
        const cookieAlertBtn = cookieAlert.querySelector('.cookie-alert-close');

        cookieAlertBtn.addEventListener('click', (e) => {
            e.preventDefault();

            cookieAlert.classList.add('hidden');
        });
    }

    const difficultWrapper = document.querySelector('.difficult-wrapper-input');

    if (difficultWrapper) {
        const difficultWrapperItem = difficultWrapper.querySelectorAll('.difficult__wrapper-item');

        difficultWrapperItem.forEach((element, index) => {
            element.addEventListener('click', () => {
                difficultWrapperItem.forEach((newElement, newIndex) => {

                    index < newIndex ? newElement.classList.remove('active') : newElement.classList.add('active');

                });
            });
        });
    }

    const starBlock = document.querySelectorAll('.star-block');

    if (starBlock.length > 0) {
        starBlock.forEach(element => {
            const starBlockItems = element.querySelectorAll('.star-block-item'),
                starBlockLinks = element.querySelectorAll('.star-block__link');

            const changeStarBlock = (count) => {
                starBlockItems.forEach((starItem, starIndex) => {
                    starIndex + 1 <= count ? starItem.classList.add('active') : starItem.classList.remove('active');
                });
            }

            starBlockLinks.forEach((starLink, starLinkIndex) => {
                starLink.addEventListener('click', () => {
                    changeStarBlock(starLinkIndex + 1);
                    element.dataset.count = starLinkIndex + 1;
                });
            });

            changeStarBlock(element.dataset.count);
        });
    }

    const progress = document.querySelectorAll('.progress');

    if (progress.length > 0) {
        progress.forEach(element => {
            const progressItem = element.querySelector('.progress__item'),
                max = element.dataset.max,
                current = element.dataset.count,
                currentPercent = (current / max) * 100;

            progressItem.style.width = `${currentPercent}%`
        })
    }

    const commentSlider = new Swiper('.comment-slider', {
            slidesPerView: 'auto',
            spaceBetween: 40,
            autoHeight: true,
            pagination: {
                el: ".comment-slider-pagination",
                type: "fraction",
            },
            navigation: {
                nextEl: '.comment-slider-button-next',
                prevEl: '.comment-slider-button-prev',
            },
            on: {
                beforeInit: function () {
                    commentTextExpand(this);
                }
            }
        }),
        loginFormSlider = new Swiper(".login-form-slider", {
            autoHeight: true,
            pagination: {
                el: ".login-form-pagination",
                type: "progressbar",
            },
            navigation: {
                nextEl: ".login-form-button-next",
                prevEl: ".login-form-button-prev",
            },
            on: {
                init: function () {
                    const loginFormCurrent = document.querySelector('.login-form-controls-current'),
                        loginFormMax = document.querySelector('.login-form-controls-max');

                    loginFormCurrent.textContent = this.realIndex + 1;
                    loginFormMax.textContent = this.slides.length;
                },
            },
        }),
        cardSlider = new Swiper(".card-slider", {
            slidesPerView: 1,
            spaceBetween: 16,
            breakpoints: {
                600: {
                    slidesPerView: 2,
                },
                1280: {
                    slidesPerView: 4,
                }
            },
            navigation: {
                nextEl: ".card-slider-button-next",
                prevEl: ".card-slider-button-prev",
            },
        }),
        notificationSlider = new Swiper(".notification-content-slider", {
            slidesPerView: 'auto',
            direction: 'vertical',
            freeMode: true,
            mousewheel: {
                invert: false,
            },
            scrollbar: {
                el: ".swiper-scrollbar",
                draggable: true,
            },

        });

    loginFormSlider.on('slideChange', function () {
        const loginFormCurrent = document.querySelector('.login-form-controls-current');

        loginFormCurrent.textContent = this.realIndex + 1;
    });

    const backTop = document.querySelector('.back-top');

    if (backTop) {
        document.addEventListener('scroll', () => {
            window.pageYOffset > 200 ? backTop.classList.remove('hidden') : backTop.classList.add('hidden');
        })

        backTop.addEventListener('click', (e) => {
            e.preventDefault();

            document.body.scrollIntoView({
                behavior: 'smooth',
            });
        });
    }

    const testAnswerFilters = document.querySelectorAll('.test-answers-filter');

    if (testAnswerFilters.length > 0) {
        testAnswerFilters.forEach(element => {
            element.addEventListener('click', () => {
                testAnswerFilters.forEach(el => {
                    el.classList.remove('active');
                });
                element.classList.add('active');
            });
        });
    }

    const fileInput = document.querySelectorAll('.file-input');

    if (fileInput.length > 0) {
        fileInput.forEach(element => {
            const fileInputItem = element.querySelector('.file-input-item'),
                fileInputFiles = element.querySelector('.file-input-files');

            fileInputItem.addEventListener('change', () => {
                fileInputFiles.innerHTML = '';
                fileInputFiles.append(createFileBlock(fileInputItem.files[0].name));

                const fileInputClose = element.querySelector('.file-input-close');

                fileInputClose.addEventListener('click', () => {
                    fileInputItem.value = '';

                    fileInputFiles.innerHTML = '';
                });
            });
        });
    }

    const rangeSliderWrapper = document.querySelector('.range-slider-wrapper');

    if (rangeSliderWrapper) {
        const rangeSlider = rangeSliderWrapper.querySelector('.range-slider'),
            rangeSliderInputs = rangeSliderWrapper.querySelectorAll('.filter-block__range-input-item');
        noUiSlider.create(rangeSlider, {
            connect: true,
            behaviour: 'tap',
            start: [0, 50],
            step: 1,
            range: {
                // Starting at 500, step the value by 500,
                // until 4000 is reached. From there, step by 1000.
                'min': [0],
                'max': [100]
            },
            format: {
                // 'to' the formatted value. Receives a number.
                to: function (value) {
                    return value;
                },
                // 'from' the formatted value.
                // Receives a string, should return a number.
                from: function (value) {
                    return Number(value.replace(',-', ''));
                }
            }
        });

        rangeSlider.noUiSlider.on('update', function (values, handle, unencoded, isTap, positions) {
            rangeSliderInputs[handle].value = values[handle];
        });

        rangeSliderInputs.forEach((element, index) => {
            element.addEventListener('change', () => {
                rangeSlider.noUiSlider.set(rangeSliderInputs[0].value, rangeSliderInputs[1].value);
            });
        });
    }

    const filterBlockDate = document.querySelector('.filter-block__date-input');

    if (filterBlockDate) {
        const datepickerFirst = datepicker('.date-input', {
                customMonths: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
                customDays: ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'],
                formatter: (input, date, instance) => {
                    const value = date.toLocaleDateString();
                    input.value = value;
                },

                onShow: instance => {
                    datepickerFirst.parent.classList.add('active');
                },
                onHide: instance => {
                    datepickerFirst.parent.classList.remove('active');
                },
            }),
            datepickerSecond = datepicker('.date-input-second', {
                customMonths: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
                customDays: ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'],
                formatter: (input, date, instance) => {
                    const value = date.toLocaleDateString();
                    input.value = value;
                },
                position: 'br',
                onShow: instance => {
                    datepickerSecond.parent.classList.add('active');
                },
                onHide: instance => {
                    datepickerSecond.parent.classList.remove('active');
                },
            });
    }

    const pie = document.querySelector('.pie');

    if(pie){
        const circle = new CircularProgressBar("pie");
        circle.initial();
    }
});