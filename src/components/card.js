import { addLike,removeLike, removeCard } from "../scripts/api";

export function createCard(card,deleteCard,likeEvent,cardEvent, likesCounter, isMyCard, cardID, userID){
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
    const cardLikes = card.likes;
    cardLikes.forEach(likeOwner => {
      if(likeOwner._id === userID){
        likeButton.classList.add('card__like-button_is-active');
      }
    });
    deleteButton.addEventListener('click',() =>{
      deleteCard(cardItem,cardID)
    });
    cardImage.addEventListener('click', () => {
        cardEvent(cardImageLink, cardTitle);
    });
    likeButton.addEventListener('click',()=>{
        likeEvent(likeButton, cardlikesCounter, cardID)
    });
    if(!isMyCard){
      deleteButton.classList.add('card__delete-button-disabled');
    }
    return cardItem;
}
export function deleteCard(card, cardID){
  removeCard(cardID)
    .then(()=>{
      card.remove();
    })
    .catch(err => console.log(err));
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