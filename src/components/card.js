export function createCard(card,deleteCard,likeEvent,cardEvent){
    const cardTemplate = document.querySelector("#card-template").content;
    const cardItem = cardTemplate.querySelector(".card").cloneNode(true);
    const cardImage = cardItem.querySelector('.card__image');
    const cardImageLink = card.link;
    const cardTitle = card.name;
    cardImage.src = card.link;
    cardImage.alt = card.name;
    cardItem.querySelector(".card__title").textContent = card.name;
    const deleteButton = cardItem.querySelector(".card__delete-button");
    const likeButton = cardItem.querySelector('.card__like-button');
    cardImage.addEventListener('click', () => {
        cardEvent(cardImageLink, cardTitle);
    });
    likeButton.addEventListener('click',likeEvent);
    deleteButton.addEventListener('click',() =>{
        deleteCard(cardItem);
    });
    return cardItem;
}
export function deleteCard(card){
    card.remove();
}

export function likeCard(evt){
    evt.target.classList.toggle('card__like-button_is-active');
}