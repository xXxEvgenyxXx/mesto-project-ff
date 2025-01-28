export function openModal(modal){
    modal.classList.add('popup_is-opened');
    document.addEventListener('keydown',handleKeyPress);
}

export function closeModal(modal){
    modal.classList.remove('popup_is-opened');
    document.removeEventListener('keydown',handleKeyPress);
}

function handleKeyPress(evt){
    if(evt.key === "Escape"){
        const openPopup = document.querySelector('.popup_is-opened'); 
        closeModal(openPopup); 
    }
}