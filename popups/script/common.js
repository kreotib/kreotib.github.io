document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');

    if (form) {
        const formCheckbox = form.querySelector('.form__checkbox');
        if(formCheckbox){
            form.addEventListener('submit', (e) => {
                e.preventDefault();

                const formCheckboxInput = formCheckbox.querySelector('input');

                if(formCheckboxInput.checked === true){
                    form.submit()
                }else{
                    formCheckbox.classList.add('error');
                }
            });
            form.addEventListener('click',()=>{
                formCheckbox.classList.remove('error');
            });
        }
    }
});