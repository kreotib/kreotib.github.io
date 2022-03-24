
toggleFixedHeader = () =>{
   const header = document.querySelector('.header');

   window.scrollY > header.clientHeight ? header.classList.add('fixed') : header.classList.remove('fixed');
};

animateTitle = (title) =>{
   const titleText = title.textContent,
       arrayOfStrings = titleText.split('').filter(el=>el !== ' '),
       arrayOfSpan = [];

   title.innerHTML = '';

   arrayOfStrings.forEach((el,index)=>{
      arrayOfSpan.push(`<span style="transition-delay: ${index * 0.2}s"> ${el} </span>`);
   });

   title.innerHTML = arrayOfSpan.join('');
}

document.addEventListener('DOMContentLoaded',()=>{
   const burger = document.querySelector('.burger'),
       mainNav = document.querySelector('.main-nav');

   burger.addEventListener('click',(e)=>{
      e.preventDefault();

      burger.classList.toggle('active');
      mainNav.classList.toggle('active');
   });

   toggleFixedHeader();

   document.addEventListener('scroll',()=>{
      toggleFixedHeader();
   });

   const animateTitleArray = document.querySelectorAll('.animate-title');

   animateTitleArray.forEach(el=>{
      animateTitle(el);
   });

   const optionsObserve = {
      root: null,
      rootMargin: '0px',
      threshold: 0
   },
       observer = new IntersectionObserver((entries, observer) => {
         entries.forEach(entry => {
            if (entry.isIntersecting) {
               const animateBlock = entry.target
               animateBlock.classList.add('animate');
               observer.unobserve(animateBlock);
            }
         })
      }, optionsObserve),
       sectionsArray = document.querySelectorAll('.section');

   sectionsArray.forEach(element=>{
         const animateBlock = element.querySelectorAll('.animate-block');

         animateBlock.forEach((el,i) => {
            setTimeout(()=>{
               observer.observe(el);
            }, i * 300)
         });
      });

   const reviewsSlider = new Swiper(".reviews-slider", {
      slidesPerView: 'auto',
      loop:false,
      freeMode:true,
      speed:500,
      spaceBetween: 15,
      navigation: {
         nextEl: ".swiper-button-next",
         prevEl: ".swiper-button-prev",
      },
      breakpoints:{
         600:{
            spaceBetween: 30
         }
      }
   });

   var scroll = new SmoothScroll('a[href*="#"]', {
      speed: 1000
   });
});