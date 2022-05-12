document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const formCheckbox = form.querySelector('.form__checkbox'),
                formCheckboxInput = formCheckbox.querySelector('input');


            if(formCheckboxInput.checked === true){
                form.submit()
            }else{
                formCheckbox.classList.add('error');
            }
        });

        form.addEventListener('click',()=>{
            const formCheckbox = form.querySelector('.form__checkbox');

            formCheckbox.classList.remove('error');
        });
    }
});