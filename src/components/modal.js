export function openModal(modal){
    modal.classList.add('popup_is-opened');
    modal.addEventListener('keydown',handleKeyPress);
    modal.addEventListener('click',(evt)=> {
        handleOutsideModal(evt,modal);
    })
}

export function closeModal(modal){
    modal.classList.remove('popup_is-opened');
    modal.removeEventListener('keydown',handleKeyPress);
    modal.removeEventListener('click',(evt)=> {
        handleOutsideModal(evt,modal);
    })
}

export function handleKeyPress(evt){
    if(evt.key === "Escape"){
        const openPopup = document.querySelector('.popup_is-opened'); 
        closeModal(openPopup); 
    }
}
function handleOutsideModal(evt,modal){
    if (evt.target === modal) { 
        closeModal(modal); 
      } 
}