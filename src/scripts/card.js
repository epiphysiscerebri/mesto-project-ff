import {deleteCard, changeLikesCount} from './api'
// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content
const ruleLikeButtonActive = (likeButton) => likeButton === 'card__like-button_is-active'

function hasLikeOnTheCard(card) {
  return Array.from(card.querySelector('.card__like-button').classList).some(ruleLikeButtonActive)
}

function getCardTemplate(template) {
  return template.querySelector('.places__item').cloneNode(true)
}

// @todo: Функция удаления карточки
function removeCard(cardElementDOM, cardData) {
  deleteCard(cardData).then(() => {
    cardElementDOM.remove()
  }).catch((err) => {
    console.log(err);
  })
}

// @todo: Функция лайка карточки
function likeCard(cardElementDOM, cardData) {
  changeLikesCount(cardData, hasLikeOnTheCard(cardElementDOM)).then((res) => {
    cardElementDOM.querySelector('.card__like-button').classList.toggle('card__like-button_is-active')
    cardElementDOM.querySelector('.card__counter-likes').textContent = res.likes.length
  }).catch((err) => {
    console.log(err);
  })
  
}

// @todo: Функция создания карточки
function createCard(card, removeCard, likeCard, openPopupBigImage, profileId) {
  const cardTemplateClone = getCardTemplate(cardTemplate)
  if (profileId !== card.owner._id) {
    cardTemplateClone.querySelector('.card__delete-button').style.display = 'none'
  }
  cardTemplateClone.querySelector('.card__delete-button').addEventListener('click', () => removeCard(cardTemplateClone, card))
  cardTemplateClone.querySelector('.card__like-button').addEventListener('click', () => likeCard(cardTemplateClone, card))
  cardTemplateClone.querySelector('.card__image').addEventListener('click', () => openPopupBigImage(cardTemplateClone))
  
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
