import usePopupClose from "../hooks/usePopupClose";

export default function PopupWithForm({name, isOpen, title, onClose, children, onSubmit, buttonText}) {
  usePopupClose(isOpen, onClose)
  return (
    <div className={`popup popup_modal_${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <form
          className={`form form_${name}`}
          name={`${name}-form`}
          onSubmit={onSubmit}
        >
          <fieldset className="form__field">
            <legend className="form__title">{`${title}`}</legend>
            {children}
          </fieldset>
          <button type="submit" className="popup__submit">
            {buttonText}
          </button>
        </form>
        <button
          type="button"
          className="popup__close-btn"
          onClick={onClose}
        />
      </div>
    </div>
  );
};
