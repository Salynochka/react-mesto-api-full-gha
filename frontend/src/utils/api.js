class Api {
  constructor({ mainUrl, headers }) {
    this._mainUrl = mainUrl;
    this._headers = headers;
  }

  //Получение карточек с сервера
  async getCards() {
    const res = await fetch(`${this._mainUrl}/cards`, {
      headers: this._headers,
      credentials: "include",
    });
    return this._checkStatus(res);
  }

  //Добавление карточек
  async createNewCard(data) {
    const res = await fetch(`${this._mainUrl}/cards`, {
      method: "POST",
      credentials: "include",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    });
    return this._checkStatus(res);
  }

  //Удаление карточки
  async removeCard(cardId) {
    const res = await fetch(`${this._mainUrl}/cards/${cardId}`, {
      headers: this._headers,
      method: "DELETE",
      credentials: "include",
    });
    return this._checkStatus(res);
  }

  //Получение данных о пользователе
  async getUserInfo() {
    const res = await fetch(`${this._mainUrl}/users/me`, {
      headers: this._headers,
      credentials: "include",
    });
    return this._checkStatus(res);
  }

  //Добавление данных о пользователе
  async editProfile(data) {
    const res = await fetch(`${this._mainUrl}/users/me`, {
      method: "PATCH",
      credentials: "include",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    });
    return this._checkStatus(res);
  }

  //Редактирование фото профиля
  async editAvatarPhoto(data) {
    const res = await fetch(`${this._mainUrl}/users/me/avatar`, {
      method: "PATCH",
      credentials: "include",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    });
    return this._checkStatus(res);
  }

  //Добавление лайка
  async addLike(cardId) {
    const res = await fetch(`${this._mainUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      credentials: "include",
      headers: this._headers,
    });
    return this._checkStatus(res);
  }

  //Удаление лайка
  async deleteLike(cardId) {
    const res = await fetch(`${this._mainUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      credentials: "include",
      headers: this._headers,
    });
    return this._checkStatus(res);
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (!isLiked) {
      return api.addLike(cardId)
    } else { 
      return api.deleteLike(cardId)
    }
  }

  //Проверка ответа от сервера
  _checkStatus(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

export const api = new Api({
  mainUrl: "https://api.travel.network.nomoredomainsicu.ru",  // mesto.nomoreparties.co/v1/cohort-65
/*  headers: {
    authorization: "9783f066-fc5b-47ba-8b84-b37b6039aee0",
    "Content-Type": "application/json",
  }, */
});
