// @todo: Темплейт карточки
import '../pages/index.css';
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