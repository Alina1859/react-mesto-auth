import React, { useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Main({onEditAvatar, onEditProfile, onAddCard, onCardClick, onCardLike, cards, onCardDelete}) {

  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__info-container">
          <button
            className="profile__info-avatar-btn"
            onClick={onEditAvatar}
          >
            <img src={currentUser.avatar} className="profile__img" alt="Фото профиля" />
          </button>
          <div className="profile__info">
            <div className="profile__name-container">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button
                type="button"
                className="profile__edit-btn"
                onClick={onEditProfile}
              />
            </div>
            <p className="profile__description">{currentUser.about}</p>
          </div>
        </div>
        <button
          type="button"
          className="profile__add-btn"
          onClick={onAddCard}
        />
      </section>

      <section className="elements">
        <ul className="elements__items">
          {cards.map((card, i) => (
            <Card
              key={card._id}
              name={card.name}
              alt={card.name}
              link={card.link}
              count={card.likes.length}
              card={card}
              onCardClick={onCardClick}
              onCardLike={() => onCardLike(card)}
              onCardDelete={onCardDelete}
            ></Card>
          ))}
        </ul>
      </section>
    </main>
  );
};
