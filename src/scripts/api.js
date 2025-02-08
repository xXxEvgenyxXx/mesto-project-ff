const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-31',
    headers: {
      authorization: '2cd377c0-3859-41d5-99fa-922ec3473d0e',
      'Content-Type': 'application/json'
    }
  }

export function getInitialCards(){
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    })
    .then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    });
}

export function getUserData(){
    return fetch(`${config.baseUrl}/users/me`,{
        headers:config.headers
    })
    .then(res => {
        if(res.ok){
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
}