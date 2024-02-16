import {initialCards} from './scripts/cards'
import './pages/index.css';

// @todo: Темплейт карточки
const cardList = document.querySelector('.places__list')
const cardTemplate = document.querySelector('#card-template').content
// @todo: DOM узлы
const page = document.querySelector('.page')
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
page.addEventListener('click', (evt) => {
  popupOpen(evt.target)
})
// @todo: Функция закрытия попапа
function popupClose() {
  document.querySelector('.page').querySelectorAll('.popup__close').forEach((el) => {
    el.addEventListener('click', (evt) => {
      evt.target.parentNode.parentNode.style.display = 'none';
    })
    window.addEventListener('click', (evt) => {
      if(evt.target.classList.contains('popup')) {
        evt.target.style.display = 'none';
      }
    })
    document.addEventListener('keydown', (evt) => {
      page.querySelectorAll('.popup').forEach((el) => {
        if(evt.key == 'Escape') {
          el.style.display = 'none'
        }
      })
    })
  })
}
// @todo: Функция открытия попапа
function popupOpen(btn) {

  popupClose()

  if (btn.classList.contains('profile__edit-button')) {
    document.querySelector('.popup_type_edit').style.display = 'flex';
  } else if (btn.classList.contains('profile__add-button')) {
    document.querySelector('.popup_type_new-card').style.display = 'flex';
  } else if (btn.classList.contains('card__image')) {
    document.querySelector('.popup_type_image').querySelector('.popup__content').querySelector('.popup__image').src = btn.src
    document.querySelector('.popup_type_image').querySelector('.popup__content').querySelector('.popup__image').alt = btn.parentNode.querySelector('.card__image').alt
    document.querySelector('.popup_type_image').querySelector('.popup__content').querySelector('.popup__caption').textContent = btn.parentNode.querySelector('.card__image').alt
    document.querySelector('.popup_type_image').style.display = 'flex';
  }
}


initialCards.forEach(el => {
  cardList.append(createCard(el, cardRemove))
})



