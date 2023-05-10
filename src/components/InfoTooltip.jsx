import usePopupClose from "../hooks/usePopupClose";
import onSuccessIcon from "../images/success.svg";
import onErrorIcon from "../images/error.svg";

export default function InfoTooltip({tooltipIcon, title, isOpen, onClose}) {

  usePopupClose(isOpen, onClose)
  return (
    <div className={`popup popup_modal_tooltip ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container-tooltip">
        <div className="popup__icon">
          {tooltipIcon === "success" && (<img src={onSuccessIcon} alt="успешно"/>)}
          {tooltipIcon === "error" && (<img src={onErrorIcon} alt="ошибка"/>)}
        </div>
        <p className="popup__title-tooltip">{title}</p>

        <button
          type="button"
          className="popup__close-btn"
          onClick={onClose}
        />
      </div>
    </div>
  );
};
