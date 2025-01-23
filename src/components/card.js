export function createCard(card,deleteCard,likeEvent,cardEvent){
    const cardTemplate = document.querySelector("#card-template").content;
    const cardItem = cardTemplate.querySelector(".card").cloneNode(true);
    const cardImage = card.link;
    const cardTitle = card.name;
    cardItem.querySelector(".card__image").src = card.link;
    cardItem.querySelector(".card__image").alt = card.name;
    cardItem.querySelector(".card__title").textContent = card.name;
    const deleteButton = cardItem.querySelector(".card__delete-button");
    const likeButton = cardItem.querySelector('.card__like-button');
    cardItem.addEventListener('click', () => {
        cardEvent(cardImage, cardTitle);
    });
    likeButton.addEventListener('click',likeEvent);
    deleteButton.addEventListener('click',() =>{
        deleteCard(cardItem);
    });
    return cardItem;
}