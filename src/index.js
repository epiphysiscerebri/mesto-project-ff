import {initialCards} from './scripts/cards'
import './pages/index.css';
// @todo: Темплейт карточки
const cardList = document.querySelector('.places__list')
const cardTemplate = document.querySelector('#card-template').content
// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки
function cardRemove (card) {
  card.remove()
}
// @todo: Вывести карточки на страницу
function createCard(card, cardRemove) {
  const cardTemplateClone = cardTemplate.querySelector('.places__item').cloneNode(true)
  cardTemplateClone.querySelector('.card__delete-button').addEventListener('click', () => cardRemove(cardTemplateClone))

  cardTemplateClone.querySelector('.card__image').src = card.link
  cardTemplateClone.querySelector('.card__description').querySelector('.card__title').textContent = card.name
  cardTemplateClone.querySelector('.card__image').alt = card.name
  
  return cardTemplateClone

}


initialCards.forEach(el => {
  cardList.append(createCard(el, cardRemove))
})



