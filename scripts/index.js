// @todo: Темплейт карточки
function setCard(card){
    const cardTemplate = document.querySelector("#card-template").content;
    const cardItem = cardTemplate.querySelector(".card").cloneNode(true);
    const deleteButton = cardItem.querySelector(".card__delete-button");
    deleteButton.addEventListener('click',function(){
        deleteCard(deleteButton);
    });
    cardItem.querySelector(".card__image").src = card.link;
    cardItem.querySelector(".card__image").alt = card.name;
    cardItem.querySelector(".card__title").textContent = card.name;
    return cardItem;
}
// @todo: DOM узлы

// @todo: Функция создания карточки
function createCard(card){
    let placesList = document.querySelector(".places__list");
    card = setCard(card);
    placesList.appendChild(card);
}
// @todo: Функция удаления карточки
function deleteCard(deleteButton){
    const card = deleteButton.closest('.card');
    card.remove();
}
// @todo: Вывести карточки на страницу
initialCards.forEach(card => {
    createCard(card);
});