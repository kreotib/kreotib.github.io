document.addEventListener('DOMContentLoaded', () => {
    /*
    const burger = document.querySelector('.burger'),
        mainNav = document.querySelector('.main-nav');

    burger.addEventListener('click', function () {
        this.classList.contains('active') ? (this.classList.remove('active'), mainNav.classList.remove('active'), document.body.classList.remove('no-scroll')) : (this.classList.add('active'), mainNav.classList.add('active'), document.body.classList.add('no-scroll'));
    });
    */

     /* NAVIGATION */
    const asideNav = document.querySelector('.aside-nav'),
        pageList = asideNav.querySelector('.page-list'),
        navListArray = pageList.querySelectorAll('.aside-nav__item');

    navListArray.forEach(el=>{
        const elNavList = el.querySelector('.aside-nav__list');

        elNavList ? el.classList.add('aside-nav__item-has-child') : null;
    });

    asideNav.addEventListener('click',(event)=>{
        let navItem = event.target.closest('.aside-nav__item-has-child'); // (1)

        if (!navItem) return;

        if (!asideNav.contains(navItem)) return;

        navItem.classList.toggle('active');
    });
});