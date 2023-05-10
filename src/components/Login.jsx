import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import * as auth from '../auth.js';

export default function Login({onHandleLogin}) {
  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  })

  const navigate = useNavigate();

  const handleChange = (e) => {
    const {name, value} = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formValue.email || !formValue.password) {
      return;
    }
    auth.authorize(formValue.email, formValue.password)
      .then((data) => {
        if (data.token) {
          setFormValue({email: '', password: ''});
          onHandleLogin();
          navigate('/', {replace: true});
        }
      })
      .catch(err => console.log(err));
  }

  return (
    <div className="authorization">
      <div className="authorization__container">
        <form
          className="authorization-form authorization-form_login"
          name="login"
          onSubmit={handleSubmit}
        >
          <fieldset className="authorization-form__field">
            <legend className="authorization-form__title">Вход</legend>
          </fieldset>
          <label
            htmlFor="login-email-input"
            className="authorization-form__label"
          >
            <input
              type="email"
              name="email"
              placeholder="Email"
              id="login-email-input"
              className="authorization-form__input authorization-form__input_login_email"
              required
              onChange={handleChange}
            />
          </label>
          <label
            htmlFor="login-password-input"
            className="authorization-form__label"
          >
            <input
              type="password"
              name="password"
              placeholder="Пароль"
              id="login-password-input"
              className="authorization-form__input authorization-form__input_login_password"
              minLength="8"
              maxLength="20"
              required
              onChange={handleChange}
            />
          </label>
          <button type="submit" className="authorization-form__btn-submit">
            Войти
          </button>
        </form>
      </div>
    </div>
  );

}
