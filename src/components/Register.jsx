import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import * as auth from '../auth.js';

export default function Register() {

  const [formValue, setFormValue] = useState({
    email: '',
    password: '',
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
      const { email, password } = formValue;
      auth.register(email, password).then((res) => {
        console.log(res)
        navigate('/sign-in', {replace: true});
        }
      );
  }

  return (
    <div className="authorization">
      <div className="authorization__container">
        <form
          className="authorization-form authorization-form_register"
          name="register"
          onSubmit={handleSubmit}
        >
          <fieldset className="authorization-form__field">
            <legend className="authorization-form__title">Регистрация</legend>
          </fieldset>
          <label
            htmlFor="register-email-input"
            className="authorization-form__label"
          >
            <input
              type="email"
              name="email"
              value={formValue.email}
              onChange={handleChange}
              placeholder="Email"
              id="register-email-input"
              className="authorization-form__input authorization-form__input_register_email"
              required
              autoComplete="off"
            />
          </label>
          <label
            htmlFor="register-password-input"
            className="authorization-form__label"
          >
            <input
              type="password"
              name="password"
              value={formValue.password}
              onChange={handleChange}
              placeholder="Пароль"
              id="register-password-input"
              className="authorization-form__input authorization-form__input_register_password"
              minLength="8"
              maxLength="20"
              required
              autoComplete="off"
            />
          </label>
          <button type="submit" className="authorization-form__btn-submit">
            Зарегистрироваться
          </button>
        </form>
        <Link to="/sign-in" className="authorization__sign-in-link">
          Уже зарегистрированы? Войти
        </Link>
      </div>
    </div>
  );
}
