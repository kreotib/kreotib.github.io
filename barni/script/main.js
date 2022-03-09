const openPopup = ()=>{
    const popup = document.querySelector('.popup');

    popup.classList.add('open');
};

const closePopup = () =>{
    const popup = document.querySelector('.popup');

    popup.classList.remove('open');
};

document.addEventListener('DOMContentLoaded',()=>{
    const popupTrigger = document.querySelectorAll('.popup-trigger'),
        popupClose = document.querySelectorAll('.popup-close');

    if(popupTrigger){
        popupTrigger.forEach(el=>{
            el.addEventListener('click',(e)=>{
                e.preventDefault();

                openPopup()
            });
        });
    }

    if(popupClose){
        popupClose.forEach(el=>{
            el.addEventListener('click',(e)=>{
                e.preventDefault();

                closePopup()
            });
        });
    }
});
