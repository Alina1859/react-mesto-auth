export const BASE_URL = 'https://auth.nomoreparties.co';

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
  .then((response) => {
    console.log(response)
    try {
      if (response.status === 200){
        return response.json();
      }
    } catch(e) {
      console.log(e)
      return (e)
    }
  })
  .then((res) => {
    console.log(res)
    return res;
  })
  .catch((err) => console.log(err));
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
  .then((response => response.json()))
  .then((data) => {
    console.log(data)
    if (data.jwt){
      localStorage.setItem('jwt', data.jwt);
      return data;
    }
  })
  .catch(err => console.log(err))
};
