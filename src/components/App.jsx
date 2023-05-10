import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import { api } from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import Authorisation from "./Authorisation";
import * as auth from '../auth.js';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddCardPopupOpen, setAddCardPopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [tooltipTitle, setTooltipTitle] = useState('');
  const [tooltipIcon, setTooltipIcon] = useState('');
  const [email, setEmail] = useState('');

  const navigate = useNavigate();

  const onHandleRegisterSubmit = (formValue) => {
    const { email, password } = formValue;
    auth.register(email, password)
      .then((res) => {
        navigate('/sign-in', {replace: true});
        onSucessedRegister();
        }
      )
      .catch(err => {
        onError();
        console.log(err)
      })
  }

  const onHandleLoginSubmit = (formValue, setFormValue) => {
    if (!formValue.email || !formValue.password) {
      return;
    }
    auth.authorize(formValue.email, formValue.password)
      .then((data) => {
        if (data.token) {
          setFormValue({email: '', password: ''});
          onHandleLogin(formValue.email);
          navigate('/', {replace: true});
        }
      })
      .catch(err => {
        onError()
        console.log(err)
      });
  }

  const onHandleLogin = (email) => {
    setIsLoggedIn(true);
    setEmail(email)
  }

  function onSignOut() {
    localStorage.removeItem('jwt');
    setIsLoggedIn(false);
    setEmail('');
    navigate("/sign-in", {replace: true})
  }

  function onSucessedRegister() {
    setTooltipIcon("success")
    setTooltipTitle('Вы успешно зарегистрировались!')
    setIsInfoTooltipPopupOpen(true)
  }

  function onError() {
    setTooltipIcon("error")
    setTooltipTitle('Что-то пошло не так! Попробуйте ещё раз.')
    setIsInfoTooltipPopupOpen(true)
  }

  const getUserDataApi = () => {
    api
      .getUserData()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  };

  const getCardsApi = () => {
    api
      .getCardsList()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  };

  useEffect(() => {
    tokenCheck();
  }, [])

  const tokenCheck = () => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.getContent(jwt).then((res) => {
        if (res) {
          setIsLoggedIn(true);
          const userData = {
            username: res.data._id,
            email: res.data.email
          }
          setUserData(userData)
          setEmail(userData.email)
          navigate("/", {replace: true})
        }
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
    }
  }

  useEffect(() => {
    if (isLoggedIn) {
      getUserDataApi();
      getCardsApi();
    }
  }, [isLoggedIn]);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    isLiked
      ? api
          .removeLikeFromCard(card._id, !isLiked)
          .then((newCard) => {
            setCards((state) =>
              state.map((c) => (c._id === card._id ? newCard : c))
            );
          })
          .catch((err) => {
            console.log(`Ошибка: ${err}`);
          })
      : api
          .putLikeOnCard(card._id, !isLiked)
          .then((newCard) => {
            setCards((state) =>
              state.map((c) => (c._id === card._id ? newCard : c))
            );
          })
          .catch((err) => {
            console.log(`Ошибка: ${err}`);
          });
  }

  function handleCardDelete(card) {
    api
      .removeCard(card._id)
      .then(() =>
        setCards((state) => state.filter((item) => item._id !== card._id))
      )
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddCardClick() {
    setAddCardPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setImagePopupOpen(true);
  }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setAddCardPopupOpen(false);
    setImagePopupOpen(false);
    setIsInfoTooltipPopupOpen(false)
  }

  function handleUpdateUser({ name, about }) {
    setIsLoading(true);
    api
      .setUserData(name, about)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateAvatar({ avatar }) {
    setIsLoading(true);
    api
      .setUserAvatar(avatar)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleAddCardSubmit(card) {
    setIsLoading(true);
    api
      .setNewCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header email={email} onSignOut={onSignOut}/>
        <Routes>
          <Route exact path="/sign-up" element={<Authorisation
            title={"Регистрация"}
            buttonTitle={"Зарегистрироваться"}
            onHandleSubmit={onHandleRegisterSubmit}/>}
          />
          <Route exact path="/sign-in" element={<Authorisation
            title={"Вход"}
            buttonTitle={"Войти"}
            onHandleSubmit={onHandleLoginSubmit} />}
          />
          <Route exact path="/" element={
            <ProtectedRoute
              exact path="/"
              isloggedIn={isLoggedIn}
              element={Main}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddCard={handleAddCardClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              cards={cards}
            />}
          />
          <Route path="*" element={<Navigate to="/sign-up"/>}/>
        </Routes>
        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />

        <AddPlacePopup
          isOpen={isAddCardPopupOpen}
          onClose={closeAllPopups}
          onAddCard={handleAddCardSubmit}
          isLoading={isLoading}
        />

        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        />

        <InfoTooltip
          title={tooltipTitle}
          tooltipIcon={tooltipIcon}
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
