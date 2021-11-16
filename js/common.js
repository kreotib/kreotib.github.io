document.addEventListener('DOMContentLoaded', () => {
    const languageChangeTrigger = document.querySelector('.language-change__current'),
        languageChange = document.querySelector('.language-change');

    languageChangeTrigger.addEventListener('click',(event)=>{
        languageChange.classList.toggle('open');
    });
    document.body.addEventListener('click',(event)=>{
        !(event.target === languageChange || languageChange.contains(event.target)) && languageChange.classList.contains('open') ? languageChange.classList.toggle('open') : null;
    });
    if (typeof window.ethereum !== 'undefined') {
        console.log('MetaMask is installed!');
    }
    const ethereumButton = document.querySelector('.btn-connect');

    ethereumButton.addEventListener('click', () => {
        //Will Start the metamask extension
        ethereum.request({ method: 'eth_requestAccounts' });
    });
});