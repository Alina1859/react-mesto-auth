import usePopupClose from "../hooks/usePopupClose";

export default function ImagePopup({isOpen, card, onClose}) {
  usePopupClose(isOpen, onClose)
  return (
    <div
      className={`popup popup_modal_image ${isOpen ? "popup_opened" : ""}`}
    >
      <div className="popup__container-image">
        <img
          src={card.link}
          alt={card.name}
          className="popup__card-image"
          tabIndex="0"
        />
        <p className="popup__image-title">{card.name}</p>
        <button
          type="button"
          className="popup__close-btn"
          onClick={onClose}
        />
      </div>
    </div>
  );
};
