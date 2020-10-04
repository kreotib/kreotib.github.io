
const tabsInit = (tabsBlock, startIndex = 0) =>{
    const tabsNavList = tabsBlock.querySelector('.tabs-nav__list'),
          tabsNavItems = [...tabsNavList.children],
          tabsContent = tabsBlock.querySelector('.tabs-content'),
          tabsContentItems = [...tabsContent.children],
          tabsNavLinks = document.querySelectorAll('.tabs-nav__link');

    tabsNavItems.forEach((element,index)=>{
       index === startIndex ? element.classList.add('active') : element.classList.remove('active');
    });
    tabsContentItems.forEach((element,index)=>{
        index === startIndex ? element.classList.add('active') : element.classList.remove('active');
    });
    tabsNavLinks.forEach(element=>{
       element.addEventListener('click',(event)=>{
           event.preventDefault();
           const eTabs = element.closest('.tabs'),
                 eNavList = element.closest('.tabs-nav__list'),
                 eParent = element.parentNode,
                 eNavItems = [...eNavList.children],
                 eIndex = eNavItems.indexOf(eParent);
           showTabs(eTabs, eIndex);
       });
    });

};

const showTabs = (tabsBlock,nextIndex) =>{
    const tabsNavList = tabsBlock.querySelector('.tabs-nav__list'),
          tabsNavItems = [...tabsNavList.children],
          tabsContent = tabsBlock.querySelector('.tabs-content'),
          tabsContentItems = [...tabsContent.children],
          pageTitle= document.querySelector('.page-title');

    tabsNavItems.forEach((element,index)=>{
        index === nextIndex ? element.classList.add('active') : element.classList.remove('active');
        if(index === nextIndex){
            pageTitle ? pageTitle.innerHTML = element.querySelector('.tabs-nav__link').innerHTML : false;
        }
    });
    tabsContentItems.forEach((element,index)=>{
        index === nextIndex ? element.classList.add('active') : element.classList.remove('active');
    });

};


document.addEventListener('DOMContentLoaded',()=>{
    const tabsList = document.querySelectorAll('.tabs');

    tabsList.forEach((element)=>{
        tabsInit(element,0);
    });

    // const fonderListItem = document.querySelectorAll('.btn-card');
    //
    //     fonderListItem.forEach(element=>{
    //         element.addEventListener('click',(event)=>{
    //            event.preventDefault();
    //            let price = element.dataset.price;
    //            $.ajax({
    //                type:'POST',
    //                url: "/payment.php",
    //                data: price,
    //                dataType: 'json',
    //                cache:false
    //            });
    //         });
    //     });

});