export const BASE_URL = "https://api.travel.network.nomoredomainsicu.ru"; // auth.nomoreparties.co
export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      password: password,
      email: email
    }),
  })
    .then(checkStatus)
}

export const login = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      password: password,
      email: email
    }),
  })
    .then(checkStatus)
}

export const checkToken = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })
    .then(checkStatus)
    .then((data) => data);
}

function checkStatus(res){
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}