export function openModal(modal){ //Добавляем сюда класс .popup_is-opened
    modal.classList.add('popup_is-opened')
}

export function closeModal(modal){
    modal.classList.remove('popup_is-opened')
}