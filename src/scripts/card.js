import {deleteCard, changeLikesCount} from './api'
// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content
const ruleLikeButtonActive = (likeButton) => likeButton === 'card__like-button_is-active'

function hasLikeOnTheCard(card) {
  return Array.from(card.querySelector('.card__like-button').classList).some(ruleLikeButtonActive)
}

// @todo: Функция удаления карточки
function removeCard(cardElementDOM, cardData) {
  cardElementDOM.remove()
  deleteCard(cardData)
}

// @todo: Функция лайка карточки
function likeCard(cardElementDOM, cardData) {
  cardElementDOM.querySelector('.card__like-button').classList.toggle('card__like-button_is-active')
  changeLikesCount(cardData, hasLikeOnTheCard(cardElementDOM)).then((res) => {
    cardElementDOM.querySelector('.card__counter-likes').textContent = res.likes.length
  })
  
}

// @todo: Функция создания карточки
function createCard(card, removeCard, likeCard, openPopupBigImage, profileId) {
  const cardTemplateClone = cardTemplate.querySelector('.places__item').cloneNode(true)
  if (profileId === card.owner._id) {
    cardTemplateClone.querySelector('.card__delete-button').addEventListener('click', () => removeCard(cardTemplateClone, card))
    cardTemplateClone.querySelector('.card__like-button').addEventListener('click', () => likeCard(cardTemplateClone, card))
    cardTemplateClone.querySelector('.card__image').addEventListener('click', () => openPopupBigImage(cardTemplateClone))
  } else {
    cardTemplateClone.querySelector('.card__like-button').addEventListener('click', () => likeCard(cardTemplateClone, card))
    cardTemplateClone.querySelector('.card__image').addEventListener('click', () => openPopupBigImage(cardTemplateClone))
    cardTemplateClone.querySelector('.card__delete-button').style.display = 'none'
  }
  
  card.likes.forEach((like) => {
    if (profileId === like._id) {
      cardTemplateClone.querySelector('.card__like-button').classList.add('card__like-button_is-active')
    }
  })

  cardTemplateClone.querySelector('.card__counter-likes').textContent = card.likes.length
  cardTemplateClone.querySelector('.card__image').src = card.link
  cardTemplateClone.querySelector('.card__description').querySelector('.card__title').textContent = card.name
  cardTemplateClone.querySelector('.card__image').alt = card.name

  return cardTemplateClone

}



export {removeCard, likeCard, createCard}
