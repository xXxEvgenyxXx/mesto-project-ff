import { addLike,removeLike, removeCard } from "../scripts/api";

export function createCard(card,deleteCard,likeEvent,cardEvent, likesCounter, isMyCard, cardID){
    const cardTemplate = document.querySelector("#card-template").content;
    const cardItem = cardTemplate.querySelector(".card").cloneNode(true);
    const cardImage = cardItem.querySelector('.card__image');
    const cardlikesCounter = cardItem.querySelector('.card__likes')
    const cardImageLink = card.link;
    const cardTitle = card.name;
    cardImage.src = card.link;
    cardImage.alt = card.name;
    cardlikesCounter.textContent = likesCounter;
    cardItem.querySelector(".card__title").textContent = card.name;
    const deleteButton = cardItem.querySelector(".card__delete-button");
    const likeButton = cardItem.querySelector('.card__like-button');
    cardImage.addEventListener('click', () => {
        cardEvent(cardImageLink, cardTitle);
    });
    likeButton.addEventListener('click',()=>{
        likeEvent(likeButton, cardlikesCounter, cardID)
    });
    if(isMyCard){
        deleteButton.addEventListener('click',() =>{
            removeCard(cardID)
              .then(()=>{
                deleteCard(cardItem);
              })
        });
    }
    else{
        deleteButton.classList.add('card__delete-button-disabled');
    }
    return cardItem;
}
export function deleteCard(card){
    card.remove();
}
export function likeCard(likeButton, likesCounter, cardID) {
  const isLiked = likeButton.classList.toggle('card__like-button_is-active');
  if(isLiked){
    addLike(cardID).then(data => {
        likesCounter.textContent = data.likes.length;
      })
      .catch(err => console.log(err));
  }
  else {
    removeLike(cardID).then(data => {
        likesCounter.textContent = data.likes.length;
      })
      .catch(err => console.log(err));
  }
}