const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-31',
    headers: {
      authorization: '2cd377c0-3859-41d5-99fa-922ec3473d0e',
      'Content-Type': 'application/json'
    }
  }

  function checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  } 

export function getInitialCards(){
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    })
    .then(checkResponse);
}

export function updateProfile(name, about) {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: {
            authorization: '2cd377c0-3859-41d5-99fa-922ec3473d0e',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            about: about
        })
    })
    .then(checkResponse);
}

export function addCardToServer(cardData) {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: {
            authorization: '2cd377c0-3859-41d5-99fa-922ec3473d0e',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cardData)
    })
    .then(checkResponse);
}

export function updateAvatar(newAvatar) {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: {
            authorization: '2cd377c0-3859-41d5-99fa-922ec3473d0e',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            avatar: newAvatar
        })
    })
    .then(checkResponse);
}

export function addLike(cardID){
    return fetch(`${config.baseUrl}/cards/likes/${cardID}`, {
        method: 'PUT',
        headers: {
            authorization: '2cd377c0-3859-41d5-99fa-922ec3473d0e',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: cardID })
    }).then(checkResponse);
}

export function removeLike(cardID){
    return fetch(`${config.baseUrl}/cards/likes/${cardID}`, {
        method: 'DELETE',
        headers: {
            authorization: '2cd377c0-3859-41d5-99fa-922ec3473d0e',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: cardID })
    }).then(checkResponse);
}

export function getUserData(){
    return fetch(`${config.baseUrl}/users/me`,{
        headers:config.headers
    })
    .then(checkResponse);
}