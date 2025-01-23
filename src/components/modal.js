import { escapeHandler } from "../scripts/index.js";
export function openModal(modal){
    modal.classList.add('popup_is-opened');
    document.addEventListener('keydown', escapeHandler);
}

export function closeModal(modal){
    modal.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', escapeHandler);
}