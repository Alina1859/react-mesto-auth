import React, { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({isOpen, onClose, onUpdateAvatar, isLoading}) {
  const avatarRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  };

  useEffect(() => {
    avatarRef.current.value = '';
  }, [isOpen]);

  return (
    <PopupWithForm
      name="update-avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={isLoading? 'Обновление...' : 'Обновить'}
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
        />
        <span className="avatar-link-input-error form__input-error"></span>
      </label>
    </PopupWithForm>
  );
};
