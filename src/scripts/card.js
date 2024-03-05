// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content

// @todo: Функция удаления карточки
function removeCard(card) {
  card.remove()
}

// @todo: Функция лайка карточки
function likeCard(card) {
  card.querySelector('.card__like-button').classList.toggle('card__like-button_is-active')
}

// @todo: Функция создания карточки
function createCard(card, removeCard, likeCard, openPopupBigImage) {
  const cardTemplateClone = cardTemplate.querySelector('.places__item').cloneNode(true)
  cardTemplateClone.querySelector('.card__delete-button').addEventListener('click', () => removeCard(cardTemplateClone))
  cardTemplateClone.querySelector('.card__like-button').addEventListener('click', () => likeCard(cardTemplateClone))
  cardTemplateClone.querySelector('.card__image').addEventListener('click', () => openPopupBigImage(cardTemplateClone))

  cardTemplateClone.querySelector('.card__image').src = card.link
  cardTemplateClone.querySelector('.card__description').querySelector('.card__title').textContent = card.name
  cardTemplateClone.querySelector('.card__image').alt = card.name


  
  return cardTemplateClone

}

export {removeCard, likeCard, createCard}
