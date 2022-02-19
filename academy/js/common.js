const popupOpen = (popupSelector) =>{
  popupClose();

  const popup = document.querySelector(`.${popupSelector}`),
      body = document.body;

  popup.classList.add('active');
  body.classList.add('no-scroll');
};

const popupClose = () =>{
    const popupsArray = document.querySelectorAll('.popup'),
        body = document.body;

    popupsArray.forEach(el=>{
       el.classList.remove('active');
    });
    body.classList.remove('no-scroll');
};

document.addEventListener('DOMContentLoaded', () => {
    const popupTrigger = document.querySelectorAll('.popup-trigger'),
        popupArray = document.querySelectorAll('.popup');

    popupTrigger.forEach(el=>{
        el.addEventListener('click',(e)=>{
           e.preventDefault();

           popupOpen(el.dataset.popup);
        });
    });

    popupArray.forEach(el=>{
        el.addEventListener('click',(e)=>{
            e.target.classList.contains('popup__wrapper') ? popupClose() : null;
        });
    });

    const triggerLinks = document.querySelectorAll('.trigger-link');

    triggerLinks.forEach(el=>{
        el.addEventListener('click',()=>{
           el.closest('.trigger-block').querySelector('.trigger-content').classList.toggle('active');
        });
    })
});