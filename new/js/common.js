document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.burger'),
        mainNav = document.querySelector('.aside'),
        html = document.querySelector('html');

    burger.addEventListener('click', function () {
        this.classList.contains('active') ? (html.classList.remove('no-scroll'),document.body.classList.remove('no-scroll'),this.classList.remove('active'), mainNav.classList.remove('active'), document.body.classList.remove('no-scroll')) : (html.classList.add('no-scroll'),document.body.classList.add('no-scroll'),this.classList.add('active'), mainNav.classList.add('active'), document.body.classList.add('no-scroll'));
    });

     /* NAVIGATION */
    const asideNav = document.querySelector('.header-nav'),
        pageList = asideNav.querySelector('.header-list'),
        navListArray = pageList.querySelectorAll('.header-list__item');

    navListArray.forEach(el=>{
        const elNavList = el.querySelector('.header-nav__list');

        elNavList ? el.classList.add('header-list__item-has-child') : null;
    });

    asideNav.addEventListener('click',(event)=>{
        let navItem = event.target.closest('.header-list__item-has-child'); // (1)

        if (!navItem) return;

        if (!asideNav.contains(navItem)) return;

        navItem.classList.toggle('active');
    });


    const triggerLinks = document.querySelectorAll('.trigger-link');

    triggerLinks.forEach(el=>{
       el.addEventListener('click',()=>{
           el.classList.toggle('active');
          el.closest('.trigger-wrapper').querySelector('.trigger-block').classList.toggle('active');
       });
    });
});