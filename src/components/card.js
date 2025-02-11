import { addLike,removeLike } from "../scripts/api";

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
            deleteCard(cardItem);
            fetch(`https://nomoreparties.co/v1/wff-cohort-31/cards/${cardID}`, {
                method: 'DELETE',
                headers: {
                  authorization: '2cd377c0-3859-41d5-99fa-922ec3473d0e',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  id:cardID
                })
              }); 
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

  const fetchLike = isLiked ? addLike(cardID) : removeLike(cardID);

  fetchLike
      .then(data => {
          // Обновляем счетчик лайков на основе ответа от сервера
          likesCounter.textContent = data.likes.length; // Предполагаем, что сервер возвращает обновленный массив лайков
      })
      .catch(err => console.log(err));
}