// @todo: Темплейт карточки
const cardList = document.querySelector('.places__list')
const cardTemplate = document.querySelector('#card-template').content
// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки
function cardRemove (e) {
  e.target.parentElement.remove()
}
// @todo: Вывести карточки на страницу
function loadingCards(card, cardRemove) {
  const cardTemplateClone = cardTemplate.querySelector('.places__item').cloneNode(true)
  cardTemplateClone.querySelector('.card__delete-button').addEventListener('click', cardRemove)

  cardTemplateClone.querySelector('.card__image').src = card.link
  cardTemplateClone.querySelector('.card__description').querySelector('.card__title').textContent = card.name
  
  cardList.append(cardTemplateClone)

}

initialCards.forEach(el => {
  loadingCards(el, cardRemove)
})



