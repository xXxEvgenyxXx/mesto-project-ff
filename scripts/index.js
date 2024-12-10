// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки
function createCard(card){
    const cardTemplate = document.querySelector("#card-template").content;
    const cardItem = cardTemplate.querySelector(".card").cloneNode(true);
    cardItem.querySelector(".card__image").src = card.link;
    cardItem.querySelector(".card__image").alt = card.name;
    cardItem.querySelector(".card__title").textContent = card.name;
    return cardItem;
}
// @todo: Функция удаления карточки
function deleteCard(){

}
// @todo: Вывести карточки на страницу
console.log(createCard(
    {
        name:"Архыз",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"
    }
));