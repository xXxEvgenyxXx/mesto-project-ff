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

function addCard(evt){
    evt.preventDefault();
    const newCard = createCard({
        name: newCardName.value,
        link: newCardLink.value
    },deleteCard);
    console.log(newCard);
    cardList.prepend(newCard);
}

const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const editProfileButton = document.querySelector('.profile__edit-button');
const editProfileModal = document.querySelector('.popup_type_edit');
const editNameInput = document.querySelector('.popup__input_type_name');
const editDescInput = document.querySelector('.popup__input_type_description');
const addCardModal = document.querySelector('.popup_type_new-card');
const addCardButton = document.querySelector('.profile__add-button');
const newCardName = document.querySelector('.popup__input_type_card-name');
const newCardLink = document.querySelector('.popup__input_type_url');
const closeEditButton = document.querySelector('.popup__close');
const popupButton = document.querySelector('.popup__button');
const cardList = document.querySelector('.places__list');
popupButton.addEventListener('click',handleFormSubmit);
popupButton.addEventListener('click',addCard);
editProfileButton.addEventListener('click',function(){
    openModal(editProfileModal);
})
addCardButton.addEventListener('click',function(){
    openModal(addCardModal);
})
closeEditButton.addEventListener('click',function(){
    closeModal(addCardModal);
    closeModal(editProfileModal);
})
document.addEventListener('keydown', event => {
    if (event.key === "Escape"){
        closeModal(editProfileModal);
        closeModal(addCardModal);
    };
  });
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