import React, { useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useFormAndValidation } from "../hooks/useFormAndValidation";

export default function EditProfilePopup({isOpen, onClose, onUpdateUser, isLoading}) {
  const currentUser = useContext(CurrentUserContext);

  const {values, handleChange, errors, isValid, setValues, resetForm} = useFormAndValidation();

  function handleSubmit(e) {
    e.preventDefault();

    if (isValid) {
      onUpdateUser({
        name: values.name,
        about: values.description
      });
    }
  };

  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }

    setValues({name: currentUser.name, description: currentUser.about});
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={isLoading? 'Сохранение...' : 'Сохранить'}
    >
      <label htmlFor="profile-name-input" className="form__label">
        <input
          type="text"
          name="name"
          value={(values.name === undefined || values.name === null) ? '' : values.name}
          onChange={handleChange}
          placeholder="Введите имя профиля"
          id="profile-name-input"
          className="form__input form__input_profile_name"
          minLength="2"
          maxLength="40"
          required
          autoComplete="off"
        />
        <span
          className={`profile-name-input-error form__input-error ${isValid ? '' : 'form__input-error_active'}`}>
            {errors.name}
        </span>
      </label>
      <label htmlFor="profile-description-input" className="form__label">
        <input
          aria-labelledby="billing profile-description-input"
          type="text"
          name="description"
          value={(values.description === undefined || values.description === null) ? '' : values.description}
          onChange={handleChange}
          placeholder="Введите описание профиля"
          id="profile-description-input"
          className="form__input form__input_profile_description"
          minLength="2"
          maxLength="200"
          required
          autoComplete="off"
        />
        <span
          className={`profile-description-input-error form__input-error ${isValid ? '' : 'form__input-error_active'}`}>
            {errors.description}
        </span>
      </label>
    </PopupWithForm>
  );
};
