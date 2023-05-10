const copyContent = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      console.log('Content copied to clipboard');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  }

const scrollToTop = () => {
    const c = document.documentElement.scrollTop || document.body.scrollTop;
    if (c > 0) {
      window.requestAnimationFrame(scrollToTop);
      window.scrollTo(0, c - c / 8);
    }
  };

const documentObject = [
    {
        name:'card',
        steps:[
            {
                title:'Please take a photo of the front side of your ID card',
                subtitle:'Please take a photo of the front side of your ID card and press the button «Upload»',
                labelImage:'card.svg',
                labelImageClassName:'corner',
                images:[
                    {
                        src:'card.svg',
                        className:'blurred',
                        label:'Too blurry'
                    },
                    {
                        src:'card.svg',
                        className:'small',
                        label:'Too small'
                    },
                    {
                        src:'card.svg',
                        className:'dark',
                        label:'Too dark'
                    },
                ]
            },
            {
                title:'Please take a photo of the back side of your ID card',
                subtitle:'Please take a photo of the back side of your ID card and press the button «Upload»',
                labelImage:'card-back.svg',
                labelImageClassName:'corner',
                images:[
                    {
                        src:'card-back.svg',
                        className:'blurred',
                        label:'Too blurry'
                    },
                    {
                        src:'card-back.svg',
                        className:'small',
                        label:'Too small'
                    },
                    {
                        src:'card-back.svg',
                        className:'dark',
                        label:'Too dark'
                    },
                ]
            },
            {
                title:'Take a selfie',
                subtitle:'Please take a photo of yourself and press the button "Upload"',
                labelImage:'selfie.svg',
                labelImageClassName:'',
                images:[
                    {
                        src:'person-blur.svg',
                        className:'',
                        label:'Too blurry'
                    },
                    {
                        src:'person-bad.svg',
                        className:'',
                        label:'Bad lighting'
                    },
                    {
                        src:'person-neutral.svg',
                        className:'',
                        label:'Not a neutral face'
                    },
                ]
            },
            {
                title:'Take a selfie of yourself holding your ID',
                subtitle:'Please take a photo of yourself holding your ID and press the button "Upload"',
                labelImage:'selfie-id.svg',
                labelImageClassName:'',
                images:[
                    {
                        src:'person-blur.svg',
                        className:'',
                        label:'Too blurry'
                    },
                    {
                        src:'person-bad.svg',
                        className:'',
                        label:'Bad lighting'
                    },
                    {
                        src:'person-neutral.svg',
                        className:'',
                        label:'Not a neutral face'
                    },
                ]
            }
        ]
    },
    {
        name:'passport',
        steps:[
            {
                title:'Please capture front side of your ID card',
                subtitle:'Please show the back side of the ID card in the marked area and press the button “Capture”.',
                labelImage:'passport.svg',
                labelImageClassName:'corner',
                images:[
                    {
                        src:'passport.svg',
                        className:'blurred',
                        label:'Too blurry'
                    },
                    {
                        src:'passport.svg',
                        className:'small',
                        label:'Too small'
                    },
                    {
                        src:'passport.svg',
                        className:'dark',
                        label:'Too dark'
                    },
                ]
            },
            {
                title:'Take a selfie',
                subtitle:'Please show the back side of the ID card in the marked area and press the button “Capture”.',
                labelImage:'selfie.svg',
                
                images:[
                    {
                        src:'person-blur.svg',
                        className:'',
                        label:'Too blurry'
                    },
                    {
                        src:'person-bad.svg',
                        className:'',
                        label:'Bad lighting'
                    },
                    {
                        src:'person-neutral.svg',
                        className:'',
                        label:'Not a neutral face'
                    },
                ]
            },
            {
                title:'Take a selfie of yourself holding your ID',
                subtitle:'Please show the back side of the ID card in the marked area and press the button “Capture”.',
                labelImage:'selfie-passport.svg',
                images:[
                    {
                        src:'person-blur.svg',
                        className:'',
                        label:'Too blurry'
                    },
                    {
                        src:'person-bad.svg',
                        className:'',
                        label:'Bad lighting'
                    },
                    {
                        src:'person-neutral.svg',
                        className:'',
                        label:'Not a neutral face'
                    },
                ]
            },
        ]
    },
    {
        name:'driver',
        steps:[
            {
                title:'Please take a photo of the front side of your DL card',
                subtitle:'Please take a photo of the front side of your DL card and press the button «Upload»',
                labelImage:'driver.svg',
                labelImageClassName:'corner',
                images:[
                    {
                        src:'driver.svg',
                        className:'blurred',
                        label:'Too blurry'
                    },
                    {
                        src:'driver.svg',
                        className:'small',
                        label:'Too small'
                    },
                    {
                        src:'driver.svg',
                        className:'dark',
                        label:'Too dark'
                    },
                ]
            },
            {
                title:'Please take a photo of the back side of your ID card',
                subtitle:'Please take a photo of the back side of your DL card and press the button «Upload»',
                labelImage:'driver-back.svg',
                labelImageClassName:'corner',
                images:[
                    {
                        src:'driver-back.svg',
                        className:'blurred',
                        label:'Too blurry'
                    },
                    {
                        src:'driver-back.svg',
                        className:'small',
                        label:'Too small'
                    },
                    {
                        src:'driver-back.svg',
                        className:'dark',
                        label:'Too dark'
                    },
                ]
            },
            {
                title:'Take a selfie',
                subtitle:'Please take a photo of yourself and press the button "Upload"',
                labelImage:'selfie.svg',
                images:[
                    {
                        src:'person-blur.svg',
                        className:'',
                        label:'Too blurry'
                    },
                    {
                        src:'person-bad.svg',
                        className:'',
                        label:'Bad lighting'
                    },
                    {
                        src:'person-neutral.svg',
                        className:'',
                        label:'Not a neutral face'
                    },
                ]
            },
            {
                title:'Take a selfie of yourself holding your ID',
                subtitle:'Please show the back side of the ID card in the marked area and press the button “Capture”.',
                labelImage:'selfie-driver.svg',
                images:[
                    {
                        src:'person-blur.svg',
                        className:'',
                        label:'Too blurry'
                    },
                    {
                        src:'person-bad.svg',
                        className:'',
                        label:'Bad lighting'
                    },
                    {
                        src:'person-neutral.svg',
                        className:'',
                        label:'Not a neutral face'
                    },
                ]
            },
        ]
    }
]

const createBlock = (obj) =>{
    const newSlide = `
    <div class="form-card swiper-slide">
        <div class="form-card__wrapper">
            <div class="form-card__header">
                <p class="form-card__title">${obj.title}</p>
                <p class="form-card__desc">
                    ${obj.subtitle}
                </p>
            </div>
            <div class="form-card__content form-card__content--small form-upload">
                <div class="form-upload__wrapper form-photo">
                    <div class="form-photo__wrapper">
                        <div class="form-photo__label form-photo__label--${obj.labelImageClassName}">
                            <img src="assets/image/${obj.labelImage}" alt="card" class="form-photo__img">
                        </div>
                        <div class="form-photo__list photo-list">
                            <div class="photo-list__item">
                                <div class="photo-list__content">
                                    <div class="photo-list__img photo-list__img--${obj.images[0].className}">
                                        <img src="assets/image/${obj.images[0].src}" alt="card" class="form-photo__img">
                                    </div>
                                    <p class="photo-list__text">${obj.images[0].label}</p>
                                </div>
                            </div>
                            <div class="photo-list__item">
                                <div class="photo-list__content">
                                    <div class="photo-list__img photo-list__img--${obj.images[1].className}">
                                        <img src="assets/image/${obj.images[1].src}" alt="card" class="form-photo__img">
                                    </div>
                                    <p class="photo-list__text">${obj.images[1].label}</p>
                                </div>
                            </div>
                            <div class="photo-list__item">
                                <div class="photo-list__content">
                                    <div class="photo-list__img photo-list__img--${obj.images[2].className}">
                                        <img src="assets/image/${obj.images[2].src}" alt="card" class="form-photo__img">
                                    </div>
                                    <p class="photo-list__text">${obj.images[2].label}</p>
                                </div>
                            </div>
                        </div>
                        <div class="form-photo__button">
                            <div class="upload-file">
                                <div class="upload-file__result">
                                </div>
                                <label class="upload-file__label">
                                    <input required class="upload-file__input" value="upload" type="file" accept="image/jpeg, image/png, image/jpg, image/webp, image/heic">
                                    <span class="upload-file__button button button--base button--blue">upload</span>
                                    <span class="upload-file__link form__link">Change selected picture</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="form-card__footer">
                <a href="#" class="button button--base button--blue form-button-next">
                    continue
                </a>

                <div class="form-card__description">
                    <p class="form__description">
                        Want to select different document? <a class="form__link form__link--blue" href="#">Click&nbsp;here</a>
                    </p>
                </div>
            </div>
        </div>
    </div>
    `

    

    return newSlide
}

const createVerificationBlock = (value, slider) =>{
    let currentObject = {},
        newSlideBlocks = [];
    documentObject.forEach(element=>{
        if(element.name == value) currentObject = element;
    });

    currentObject.steps.forEach(element=>{
        newSlideBlocks.push(createBlock(element));
    });

    slider.appendSlide(newSlideBlocks);
    slider.appendSlide(`<div class="form-card swiper-slide">
                                <div class="form-card__wrapper form-card__wrapper--small">
                                    <div class="form-card__header">
                                        <p class="form-card__title">Thank you for registration request!</p>
                                        <p class="form-card__desc">
                                            Once your application is approved you will receive email with access to your model panel
                                        </p>
                                    </div>
                                    <div class="form-card__content form-card__content--small form-number">
                                        <div class="form-number__wrapper ">
                                            <div class="app-number">
                                                <div class="app-number__wrapper">
                                                    <div class="app-number__header">
                                                        <p class="app-number__title"> your application number</p>
                                                    </div>
                                                    <div class="app-number__content">
                                                        <p class="app-number__label copy-link">D82HU731K</p>
                                                    </div>
                                                
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-card__footer">
                                        <p class="form-card__desc">
                                            Save this ID number so that you can contact support about your case
                                        </p>
                                        <a href="https://www.modelcenter.live" class="button button--base button--blue">
                                            ok, thanks
                                        </a>
                                        <div class="form-card__description">
                                            <p class="form__description">
                                                you will be redirected to our main website in
                                            </p>
                                            <p class="form__description form__description--bold">
                                                20 sec
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>`)
    // slider.update();

    slider.slideNext();
}

document.addEventListener('DOMContentLoaded',()=>{
    const swiper = new Swiper('.swiper', {
        autoHeight: true,
        spaceBetween:34,
        allowTouchMove: false,
        initialSlide:0 ,
        speed:500,

        navigation:{
          nextEl:'.form-button-next'  
        },

          pagination: {
            el: ".form-pagination",
            type: "fraction",     
         },
      });

      swiper.on('slideChange', function () {
        const loader = document.querySelector('.loader');

        loader.classList.add('loader--active');
        document.body.classList.add('no-scroll');
        scrollToTop();
        setTimeout(()=>{
           
            document.body.classList.remove('no-scroll');
            loader.classList.remove('loader--active');
        },2000);

        const currentSlide = swiper.slides[swiper.realIndex],
            currentInputs = currentSlide.querySelectorAll('input');
        

      });
    const inputArray = document.querySelectorAll('.input');

    inputArray.forEach(element=>{
        element.addEventListener('input',()=>{
            element.classList.remove('input--success');
            element.classList.remove('input--error');
        });
        element.addEventListener('change',()=>{
            element.checkValidity() ? element.classList.add('input--success') : element.classList.add('input--error')
        });
    });

    document.addEventListener('click',(e)=>{
        if(e.target.classList.contains('form-button-next')){
            swiper.slideNext();
        }
        if(e.target.classList.contains('upload-file__input')){
            e.target.addEventListener('change',(e)=>{
                const uploadFile = e.target.closest('.upload-file'),
                    uploadFileLabel = uploadFile.querySelector('.upload-file__label');
                    uploadFileResult = uploadFile.querySelector('.upload-file__result');
    
                uploadFileLabel.classList.add('upload-file__label--active');
    
    
                uploadFileResult.innerHTML = `
                        <div class="upload-file__img">
                            <img src="${URL.createObjectURL(e.target.files[0])}" alt="">
                        </div>
                        <div class="upload-file__content">
                            <p class="upload-file__title">Uploaded picture:</p>
                            <p class="upload-file__name">${e.target.files[0].name}</p>
                        </div>`
            });
        }
    });

    const verificationLinks = document.querySelectorAll('.verification-link');

    verificationLinks.forEach(element=>{
        element.addEventListener('change',()=>{
            createVerificationBlock(element.value, swiper);
        });
    });

    const copyLink = document.querySelectorAll('.copy-link');

    copyLink.forEach(element=>{
        element.addEventListener('click',(e)=>{
            e.preventDefault();

            copyContent(e.target.textContent);
        });
    })
});