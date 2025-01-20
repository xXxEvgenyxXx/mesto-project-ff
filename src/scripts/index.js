// @todo: Темплейт карточки
import '../pages/index.css';
import {initialCards} from './cards.js';
import {openModal,closeModal} from '../components/modal.js';
function createCard(card,deleteCard){
    const cardTemplate = document.querySelector("#card-template").content;
    const cardItem = cardTemplate.querySelector(".card").cloneNode(true);
    const deleteButton = cardItem.querySelector(".card__delete-button");
    deleteButton.addEventListener('click',() =>{
        deleteCard(cardItem);
    });
    cardItem.querySelector(".card__image").src = card.link;
    cardItem.querySelector(".card__image").alt = card.name;
    cardItem.querySelector(".card__title").textContent = card.name;
    return cardItem;
}
// @todo: DOM узлы
function handleFormSubmit(evt){
    evt.preventDefault();
    const newName = editNameInput.value;
    const newDesc = editDescInput.value;
    profileDescription.textContent = newDesc;
    profileName.textContent = newName;

    closeModal(editProfileModal);
}

const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const editProfileButton = document.querySelector('.profile__edit-button');
const editProfileModal = document.querySelector('.popup_type_edit');
const editNameInput = document.querySelector('.popup__input_type_name');
const editDescInput = document.querySelector('.popup__input_type_description');
const closeEditProfileButton = document.querySelector('.popup__close');
const addCardModal = document.querySelector('.popup_type_new-card');
const addCardButton = document.querySelector('.profile__add-button')
const popupButton = document.querySelector('.popup__button');
popupButton.addEventListener('click',handleFormSubmit);
addCardButton.addEventListener('click',function(){
    openModal(addCardModal);
})
editProfileButton.addEventListener('click',function(){
    openModal(editProfileModal);
})
editProfileButton.addEventListener('keydown', evt => {
    if(evt.key === 'Escape'){
        closeModal(editProfileModal);
    }
})
closeEditProfileButton.addEventListener('click',function(){
    closeModal(editProfileModal);
})
// @todo: Функция создания карточки
function renderCard(card){
    const placesList = document.querySelector(".places__list");
    const newCard = createCard(card,deleteCard);
    placesList.appendChild(newCard);
}
// @todo: Функция удаления карточки
function deleteCard(card){
    card.remove();
}
// @todo: Вывести карточки на страницу
initialCards.forEach(card => {
    renderCard(card);
});