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

    if(cookieAlert){
        const cookieAlertBtn = cookieAlert.querySelector('.cookie-alert-close');

        cookieAlertBtn.addEventListener('click',(e)=>{
            e.preventDefault();

            cookieAlert.classList.add('hidden');
        });
    }

    const difficultWrapper = document.querySelector('.difficult-wrapper-input');

    if(difficultWrapper){
        const difficultWrapperItem = difficultWrapper.querySelectorAll('.difficult__wrapper-item');

        difficultWrapperItem.forEach((element,index)=>{
           element.addEventListener('click',()=>{
               difficultWrapperItem.forEach((newElement, newIndex)=>{

                  index < newIndex ? newElement.classList.remove('active') : newElement.classList.add('active');

               });
           });
        });
    }
});