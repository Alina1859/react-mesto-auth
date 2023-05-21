import React, { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

export default function PopupWithConfirmation({isOpen, onClose, isLoading, onConfirmDelete, cardId}) {

  function handleSubmit(e) {
    e.preventDefault();

    onConfirmDelete(cardId);
  };

  return (
    <PopupWithForm
      name="confirm-delete"
      title="Вы уверены?"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={isLoading ? 'Удаление...' : 'Удалить'}
      approveTitle={"form__title_approve-delete"}
    >
    </PopupWithForm>
  );
};
