const popupOpen = (popupTrigger) =>{
    console.log(popupTrigger.dataset.popup);

    const popup = document.querySelector(`.${popupTrigger.dataset.popup}`);
    popup.classList.add('active');
};
const popupClose = (popup) =>{
    popup.classList.remove('active');
};

document.addEventListener('DOMContentLoaded', ()=>{
    const popupTrigger = document.querySelectorAll('.popupTrigger');
    popup = document.querySelectorAll('.popup');
    popup.forEach(el=>{
        el.addEventListener('click',(event)=>{
            event.target === el ? popupClose(el) : false;
        });
    });
    popupTrigger.forEach(el=>{
        el.addEventListener('click',(event)=>{
            event.preventDefault();
            popupOpen(el);
            console.log('111');
        });
    });
});