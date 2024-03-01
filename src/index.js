import {initialCards} from './scripts/cards'
import './pages/index.css';
import {removeCard, likeCard, createCard} from './scripts/card'
import {openPopup} from './scripts/modal'

// @todo: DOM узлы
const cardList = document.querySelector('.places__list')
const page = document.querySelector('.page')

page.addEventListener('click', (evt) => {
  openPopup(evt.target)
})

initialCards.forEach(el => {
  cardList.append(createCard(el, removeCard, likeCard))
})

