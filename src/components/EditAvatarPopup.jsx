import React, { useState, useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { useFormAndValidation } from "../hooks/useFormAndValidation";

export default function EditAvatarPopup({isOpen, onClose, onUpdateAvatar, isLoading}) {
  const avatarRef = useRef();

  const {values, handleChange, errors, isValid, setValues, resetForm} = useFormAndValidation();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar ({
      avatar: avatarRef.current.value,
    })

  };

  useEffect(() => {
    avatarRef.current.value = '';

    setValues({avatar: ''});
  }, [isOpen]);

  return (
    <PopupWithForm
      name="update-avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={isLoading? 'Обновление...' : 'Обновить'}
      isLoading={isLoading}
    >
      <label htmlFor="avatar-link-input" className="form__label">
        <input
          type="url"
          name="link"
          placeholder="Ссылка на аватарку"
          id="avatar-link-input"
          className="form__input form__input_avatar_link"
          ref={avatarRef}
          required
          autoComplete="off"
          onChange={handleChange}
        />
        <span
          className={`atar-link-input-error form__input-error ${isValid ? '' : 'form__input-error_active'}`}>
            {errors.link}
        </span>
      </label>
    </PopupWithForm>
  );
};
