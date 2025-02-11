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
    .then(res => {
        checkResponse(res);
    });
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
    .then(res =>{
        checkResponse(res)
    });
}

export function updateAvatar(newAvatar) {
    return fetch('https://nomoreparties.co/v1/wff-cohort-31/users/me/avatar', {
        method: 'PATCH',
        headers: {
            authorization: '2cd377c0-3859-41d5-99fa-922ec3473d0e',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            avatar: newAvatar
        })
    })
    .then(res =>{
        checkResponse(res)
    });
}

export function getUserData(){
    return fetch(`${config.baseUrl}/users/me`,{
        headers:config.headers
    })
    .then(res =>{
        checkResponse(res)
    })
}