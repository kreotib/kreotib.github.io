document.addEventListener('DOMContentLoaded',()=>{
    const swiper = new Swiper('.swiper',{
        effect: 'coverflow',
        loop:true,
        slidesPerView:'auto',
        speed:1000,
        coverflowEffect: {
            depth:0,
            stretch:0,
            scale:1,
            rotate:0,
            slideShadows: false,
        },
    });
});