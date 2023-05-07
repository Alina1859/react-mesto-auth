import React, { useState, useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import {useForm} from "../hooks/useForm";

export default function EditProfilePopup({isOpen, onClose, onUpdateUser, isLoading}) {
  const currentUser = useContext(CurrentUserContext);

  const {values, handleChange, setValues} = useForm({});

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name: values.name,
      about: values.description
    });
  };

  useEffect(() => {
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
        />
        <span className="profile-name-input-error form__input-error"></span>
      </label>
      <label htmlFor="profile-description-input" className="form__label">
        <input
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
        />
        <span className="profile-description-input-error form__input-error"></span>
      </label>
    </PopupWithForm>
  );
};
