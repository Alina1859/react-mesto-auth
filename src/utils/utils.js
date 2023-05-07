const formProfile = document.querySelector(".form_modal_profile");
const formAddPlace = document.querySelector(".form_modal_place");
const nameInput = formProfile.querySelector(".form__input_profile_name");
const descriptionInput = formProfile.querySelector(
  ".form__input_profile_description"
);
const editBtn = document.querySelector(".profile__edit-btn");
const addPlaceBtn = document.querySelector(".profile__add-btn");
const cardsContainerSelector = ".elements__items";
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const profileImg = document.querySelector(".profile__img");
const trashBtn = document.querySelector(".card__trash-btn");
const avatarBtn = document.querySelector(".profile__info-avatar-btn");
const popupEditAvatar = document.querySelector(".popup_modal_update-avatar");
const formEditAvatar = document.querySelector(".form_modal_update-avatar");

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const validationConfig = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};

export {
  formProfile,
  formAddPlace,
  nameInput,
  descriptionInput,
  editBtn,
  addPlaceBtn,
  cardsContainerSelector,
  initialCards,
  validationConfig,
  profileName,
  profileDescription,
  profileImg,
  trashBtn,
  avatarBtn,
  popupEditAvatar,
  formEditAvatar,
};
