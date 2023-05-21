import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card({link, alt, name, count, card, onCardClick, onCardLike, onConfirmCardId}) {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);

  const cardLikeButtonClassName = (
    `card__like-btn ${isLiked && 'card__like-btn_active'}`
  );

  function handleClick() {
    onCardClick(card);
  };

  function handleLikeClick() {
    onCardLike(card);
  };

  function handleConfirmDeleteClick() {
    onConfirmCardId(card._id)
  };

  return (
    <li className="card">
      <img
        src={link}
        alt={alt}
        className="card__img"
        onClick={handleClick}
      />
      <div className="card__info-container">
        <h2 className="card__name">{name}</h2>
        <div className="card__like-container">
          <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick} aria-label="Поставить лайк"/>
          <p className="card__like-count">{count}</p>
        </div>
      </div>
      {isOwn && <button className='card__trash-btn' onClick={handleConfirmDeleteClick} aria-label="Удалить карточку"/>}
    </li>
  );
};
