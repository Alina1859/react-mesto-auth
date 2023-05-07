import React, { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import {useForm} from "../hooks/useForm";

export default function AddPlacePopup({ isOpen, onClose, onAddCard, isLoading }) {

  const {values, handleChange, setValues} = useForm({});

  function handleSubmit(e) {
    e.preventDefault();

    onAddCard({
      name: values.name,
      link: values.link
    });
  };

  useEffect(() => {
    setValues({name: '', link: ''});
  }, [isOpen]);

  return (
    <PopupWithForm
      name="place"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={isLoading? 'Добавление...' : 'Добавить'}
    >
      <label htmlFor="place-name-input" className="form__label">
        <input
          type="text"
          name="name"
          placeholder="Название"
          id="place-name-input"
          className="form__input form__input_place_name"
          minLength="2"
          maxLength="30"
          value={(values.name === undefined || values.name === null) ? '' : values.name} onChange={handleChange}
          required
        />
        <span className="place-name-input-error form__input-error"></span>
      </label>
      <label htmlFor="place-link-input" className="form__label">
        <input
          type="url"
          name="link"
          placeholder="Ссылка на картинку"
          id="place-link-input"
          className="form__input form__input_place_link"
          value={(values.link === undefined || values.link === null) ? '' : values.link} onChange={handleChange}
          required
        />
        <span className="place-link-input-error form__input-error"></span>
      </label>
    </PopupWithForm>
  );
};
