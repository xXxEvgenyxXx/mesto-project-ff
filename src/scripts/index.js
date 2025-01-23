// @todo: Темплейт карточки
import '../pages/index.css';
import {initialCards} from './cards.js';
import {openModal,closeModal} from '../components/modal.js';
import { createCard } from './card.js';
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
        name: addCardName.value,
        link: addCardLink.value
    },deleteCard,likeCard,openImage);
    cardList.prepend(newCard);
    closeModal(addCardModal);
}

export function escapeHandler(evt){
    console.log(evt.target);
    if (evt.key === "Escape"){
        const openPopup = document.querySelector('.popup_is-opened');
        closeModal(openPopup);
    };
}

function outsideModalHandler(evt, modal) {
    if (evt.target === modal) {
      closeModal(modal);
    }
  }
  

function openImage(cardImage, cardTitle){
    popupImageModal.querySelector('.popup__image').src = cardImage;
    popupImageModal.querySelector('.popup__caption').alt = cardTitle;
    popupImageModal.querySelector('.popup__caption').textContent = cardTitle;
    openModal(popupImageModal);
}

function likeCard(evt){
    evt.target.classList.toggle('card__like-button_is-active');
}

const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

//Константы для редактирования профиля
const editProfileButton = document.querySelector('.profile__edit-button');
const editProfileModal = document.querySelector('.popup_type_edit');
const editProfileCloseButton = editProfileModal.querySelector('.popup__close');
const editNameInput = editProfileModal.querySelector('.popup__input_type_name');
const editDescInput = editProfileModal.querySelector('.popup__input_type_description');
const editProfilePopupButton = editProfileModal.querySelector('.popup__button');

//Константы для редактирования карточного списка
const cardList = document.querySelector('.places__list');
const addCardButton = document.querySelector('.profile__add-button');
const addCardModal = document.querySelector('.popup_type_new-card');
const addCardCloseButton = addCardModal.querySelector('.popup__close');
const addCardSaveButton = addCardModal.querySelector('.popup__button');
const addCardName = addCardModal.querySelector('.popup__input_type_card-name');
const addCardLink = addCardModal.querySelector('.popup__input_type_url');

//Константы для кликабельных картинок
const popupImageModal = document.querySelector('.popup_type_image');
const popupImageCloseModal = popupImageModal.querySelector('.popup__close');

//Привязки

//Для редактирования профиля
editProfilePopupButton.addEventListener('click',handleFormSubmit);
editProfileButton.addEventListener('click',function(){
    openModal(editProfileModal);
})
editProfileCloseButton.addEventListener('click',function(){
    closeModal(editProfileModal);
})
popupImageCloseModal.addEventListener('click',function(){
    closeModal(popupImageModal);
})
//Для добавления карточек
addCardButton.addEventListener('click',function(){
    openModal(addCardModal);
})
addCardCloseButton.addEventListener('click',function(){
    closeModal(addCardModal);
})
addCardSaveButton.addEventListener('click',addCard);

//Для открывания карточек

//Для лайка


//Общие
document.addEventListener('keydown', escapeHandler);
// @todo: Функция создания карточки
function renderCard(card){
    const placesList = document.querySelector(".places__list");
    const newCard = createCard(card,deleteCard,likeCard,openImage);
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