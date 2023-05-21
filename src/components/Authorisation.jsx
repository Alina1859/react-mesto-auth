import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import { useFormAndValidation } from "../hooks/useFormAndValidation";

export default function Authorisation({title, buttonTitle, onHandleSubmit}) {

  const {values, handleChange, errors, isValid, setValues, resetForm} = useFormAndValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      onHandleSubmit(values, setValues);
    }
  }

  // const [formValue, setFormValue] = useState({
  //   email: '',
  //   password: '',
  // })

  // const handleChange = (e) => {
  //   const {name, value} = e.target;

  //   setFormValue({
  //     ...formValue,
  //     [name]: value
  //   });
  // }

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   onHandleSubmit(formValue, setFormValue)
  // }

  return (
    <div className="authorization">
      <div className="authorization__container">
        <form
          className="authorization-form authorization-form_login"
          name="login"
          onSubmit={handleSubmit}
          noValidate
        >
          <fieldset className="authorization-form__field">
            <legend className="authorization-form__title">{title}</legend>
          </fieldset>
          <label
            htmlFor="login-email-input"
            className="authorization-form__label"
          >
            <input
              aria-labelledby="billing login-email-input"
              type="email"
              name="email"
              placeholder="Email"
              id="login-email-input"
              className="authorization-form__input authorization-form__input_login_email"
              required
              onChange={handleChange}
              autocomplete="off"
            />
            <span
              className={` form__input-error ${isValid ? '' : 'form__input-error_active'}`}>
                {errors.email}
            </span>
          </label>
          <label
            htmlFor="login-password-input"
            className="authorization-form__label"
          >
            <input
              aria-labelledby="billing login-password-input"
              type="password"
              name="password"
              placeholder="Пароль"
              id="login-password-input"
              className="authorization-form__input authorization-form__input_login_password"
              minLength="8"
              maxLength="20"
              required
              onChange={handleChange}
              autocomplete="off"
            />
            <span
              className={` form__input-error ${isValid ? '' : 'form__input-error_active'}`}>
                {errors.password}
            </span>
          </label>
          <button type="submit" className="authorization-form__btn-submit" aria-label='Войти'>
            {buttonTitle}
          </button>
        </form>
        {title === "Регистрация" &&  (
          <Link to="/sign-in" className="authorization__sign-in-link">
            Уже зарегистрированы? Войти
          </Link>)
        }
      </div>
    </div>
  );

}
