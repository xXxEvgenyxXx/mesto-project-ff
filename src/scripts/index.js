// @todo: Темплейт карточки
import '../pages/index.css';
//import {initialCards} from './cards.js';
import {openModal,closeModal} from '../components/modal.js';
import { createCard, deleteCard, likeCard } from '../components/card.js';
import { enableValidation, clearValidation } from '../components/validation.js';
import { getInitialCards,getUserData,updateProfile, updateAvatar, addCardToServer } from './api.js';

let userID;
// @todo: DOM узлы
function handleEditProfileForm(evt) {
    evt.preventDefault();
    
    // Отображаем индикатор загрузки
    const submitButton = evt.target.querySelector('button[type="submit"]');
    const initialButtonText = submitButton.textContent;
    submitButton.textContent = 'Сохранение...';
    
    const newName = editNameInput.value;
    const newDesc = editDescInput.value;

    updateProfile(newName, newDesc)
        .then(() => {
            // Если запрос успешен, обновляем информацию на странице
            profileDescription.textContent = newDesc;
            profileName.textContent = newName;
            closeModal(editProfileModal); // Закрываем попап
        })
        .catch(err => {
            console.error(err);
            // Здесь можно добавить уведомление пользователю о том, что произошла ошибка
        })
        .finally(() => {
            // В любом случае возвращаем текст кнопки на начальный
            submitButton.textContent = initialButtonText;
        });
}

function handleEditAvatarForm(evt){
    evt.preventDefault();
    const newAvatar = editAvatarInput.value;
    profileAvatar.style.backgroundImage = `url(${newAvatar})`;
    updateAvatar(newAvatar)
        .then(() => closeModal(popupEditAvatar))
        .catch(err => console.error(err));
}

function addCard(evt){
    evt.preventDefault();
    
    const cardData = {
        name: addCardName.value,
        link: addCardLink.value
    };

    const newCard = createCard(cardData, deleteCard, likeCard, openImage);
    cardList.prepend(newCard);

    addCardToServer(cardData)
        .then(() => {
            closeModal(addCardModal);
            evt.target.reset();
        })
        .catch(err => console.error(err));
}
  

function openImage(cardImage, cardTitle){
    popupImage.src = cardImage;
    popupImageCaption.alt = cardTitle;
    popupImageCaption.textContent = cardTitle;
    openModal(popupImageModal);
}
const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  }

const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileAvatar = document.querySelector('.profile__image');

//Константы для редактирования профиля
const editProfileButton = document.querySelector('.profile__edit-button');
const editProfileModal = document.querySelector('.popup_type_edit');
const editProfileCloseButton = editProfileModal.querySelector('.popup__close');
const editNameInput = editProfileModal.querySelector('.popup__input_type_name');
const editDescInput = editProfileModal.querySelector('.popup__input_type_description');
const editProfileForm = editProfileModal.querySelector('.popup__form');

//Константы для редактирования карточного списка
const cardList = document.querySelector('.places__list');
const addCardButton = document.querySelector('.profile__add-button');
const addCardModal = document.querySelector('.popup_type_new-card');
const addCardCloseButton = addCardModal.querySelector('.popup__close');
const addCardForm = addCardModal.querySelector('.popup__form');
const addCardName = addCardModal.querySelector('.popup__input_type_card-name');
const addCardLink = addCardModal.querySelector('.popup__input_type_url');

//Константы для кликабельных картинок
const popupImageModal = document.querySelector('.popup_type_image');
const popupImage = popupImageModal.querySelector('.popup__image');
const popupImageCaption = popupImageModal.querySelector('.popup__caption')
const popupImageCloseModal = popupImageModal.querySelector('.popup__close');

const popups = document.querySelectorAll('.popup');

//Константы для редактирования авы
const popupEditAvatar = document.querySelector('.popup_type_avatar-edit');
const editAvatarButton = document.querySelector('.profile__image')
const editAvatarCloseModal = popupEditAvatar.querySelector('.popup__close');
const editAvatarInput = popupEditAvatar.querySelector('.popup__input');
const editAvatarForm = popupEditAvatar.querySelector('.popup__form');

//Для редактирования профиля
editProfileForm.addEventListener('submit',(event)=>{
    handleEditProfileForm(event);
});
editAvatarForm.addEventListener('submit',handleEditAvatarForm);
editProfileButton.addEventListener('click',function(){
    editNameInput.value = profileName.textContent;
    editDescInput.value = profileDescription.textContent;
    clearValidation(editProfileForm,validationConfig);
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
    clearValidation(addCardForm,validationConfig);
    openModal(addCardModal);
})
addCardCloseButton.addEventListener('click',function(){
    closeModal(addCardModal);
})
addCardForm.addEventListener('submit',addCard);

//Для редактирования авы
editAvatarButton.addEventListener('click',function(){
    openModal(popupEditAvatar);
})
editAvatarCloseModal.addEventListener('click',function(){
    closeModal(popupEditAvatar);
})


enableValidation(validationConfig); 

popups.forEach(popup => {
    popup.addEventListener('click',(evt)=>{
        if(evt.target.classList.contains('popup')){
            closeModal(popup);
        }
    })
});

// @todo: Функция создания карточки
function renderCard(card, likesCounter, isMyCard, cardID){
    const placesList = document.querySelector(".places__list");
    const newCard = createCard(card,deleteCard,likeCard,openImage,likesCounter, isMyCard,cardID);
    placesList.appendChild(newCard);
}
// @todo: Вывести карточки на страницу

Promise.all([getUserData(), getInitialCards()])
    .then(([userData, cardsArray]) => {
        userID = userData._id
        // Обработка данных пользователя
        profileName.textContent = userData.name;
        profileDescription.textContent = userData.about;
        profileAvatar.style.backgroundImage = `url(${userData.avatar})`;
        cardsArray.forEach(cardElement => {
            renderCard({
                name: cardElement.name,
                link: cardElement.link,
            }, cardElement.likes.length, cardElement.owner._id === userID, cardElement._id);
        });
    })
    .catch((err) => {
        console.log(err); // выводим ошибку в консоль
    });