export default class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  _request(endpoint, options) {
    return fetch(`${this._baseUrl}/${endpoint}`, options).then(this._getResponseData)
  }

  getCardsList() {
    return this._request("/cards", {
      headers: this._headers,
    })
  }

  getUserData() {
    return this._request("/users/me", {
      headers: this._headers,
    })
  }

  setUserData(name, about) {
    return this._request("/users/me", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: `${name}`,
        about: `${about}`,
      }),
    })
  }

  setNewCard(data) {
    return this._request("/cards", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: `${data.name}`,
        link: `${data.link}`,
      }),
    })
  }

  removeCard(cardId) {
    return this._request(`/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    })
  }

  putLikeOnCard(cardId) {
    return this._request(`/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    })
  }

  removeLikeFromCard(cardId) {
    return this._request(`/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    })
  }

  setUserAvatar(link) {
    return this._request("/users/me/avatar", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: `${link}`,
      }),
    })
  }
}

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-62",
  headers: {
    authorization: "8badccc2-e21d-49cd-93bc-2a509575d5e5",
    "Content-Type": "application/json",
  },
});

export { api };
