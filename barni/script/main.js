const openPopup = ()=>{
    const popup = document.querySelector('.popup');

    popup.classList.add('open');
};

const closePopup = () =>{
    const popup = document.querySelector('.popup');

    popup.classList.remove('open');
};

const detectBrowserAgent = (browserName) =>{
    return navigator.userAgent.indexOf(browserName) !== -1
}

document.addEventListener('DOMContentLoaded',()=>{
    const popupTrigger = document.querySelectorAll('.popup-trigger'),
        popupClose = document.querySelectorAll('.popup-close'),
        heroImgItems = document.querySelectorAll('.hero__img-item'),
        heroImgItemVideo = document.querySelector('.hero__img-item_video'),
        heroImgItemImg = document.querySelector('.hero__img-item_img');

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

    if(heroImgItems){
        heroImgItems.forEach(el=>{
            console.log(detectBrowserAgent('Safari'));
            !detectBrowserAgent('Chrome') || !detectBrowserAgent('Safari') ? heroImgItemVideo.classList.add('hidden') : heroImgItemImg.classList.add('hidden');
        });
    }

});



