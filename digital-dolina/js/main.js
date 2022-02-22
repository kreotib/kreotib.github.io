const showTagsBlock = (dataSelector) =>{
    if(dataSelector){
        const tagsBlockArray = document.querySelectorAll('.tags-block'),
            tagsListLinks = document.querySelectorAll('.tags-list__item');

        tagsBlockArray.forEach(el=>{
            el.dataset.name === dataSelector ? el.classList.toggle('active') : el.classList.remove('active');
        });
        tagsListLinks.forEach(el=>{
            el.dataset.name === dataSelector ? el.classList.toggle('active') : el.classList.remove('active');
        });
    }
};

document.addEventListener('DOMContentLoaded',()=>{
    const tagsListLinks = document.querySelectorAll('.tags-list__item');

    tagsListLinks.forEach(el=>{
       el.addEventListener('click',(e)=>{
           e.preventDefault();
           showTagsBlock(el.dataset.name);
       });
    });
});