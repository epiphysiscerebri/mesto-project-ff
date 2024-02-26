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

// todo: Функция навешивания слушателей событий
function listenersAdder() {
  document.querySelector('.page').querySelectorAll('.popup__close').forEach((el) => {
    el.addEventListener('click', popupClose)
  })
  document.querySelectorAll('.popup').forEach((el) => {
    el.addEventListener('click', popupClose)
  })
  document.addEventListener('keydown', popupClose)
}

// @todo: Функция сохранения данных в записи
function savedData(evt) {
    document.querySelector('.profile__title').textContent = document.querySelector('.popup__input_type_name').value
    document.querySelector('.profile__description').textContent = document.querySelector('.popup__input_type_description').value
}

// @todo: Функция закрытия попапа
function popupClose(evt) {
    document.querySelector('.page').querySelectorAll('.popup').forEach((el) => {
      if(evt.type === 'keydown' && evt.key == 'Escape' || evt.type === 'submit' || evt.type === 'click' && evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
        if(evt.type === 'keydown' && evt.key == 'Escape') {
          evt.target.removeEventListener('keydown', popupClose)
        } else if (evt.type === 'submit' || evt.type === 'click' && evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
          if (document.querySelector('.popup_type_edit').style.display === 'flex') {
            savedData(evt)
          }
          evt.target.removeEventListener('click', popupClose)
        }  
        for(let input of el.getElementsByTagName('input')) {
          input.value = ''
        }
        el.style.display = 'none'      
      }
    })
  }
// @todo: Функция открытия попапа
function popupOpen(popup) {
  listenersAdder()  

  // Добавление обработчика при отправке на формы  
  for (let form of document.forms) {
    form.addEventListener('submit', function(evt) {
      evt.preventDefault()
      popupClose(evt)
    })
  }

  if (popup.classList.contains('profile__edit-button')) {
    document.querySelector('.popup_type_edit').style.display = 'flex';
    document.querySelector('.popup__input_type_name').value = document.querySelector('.profile__title').textContent
    document.querySelector('.popup__input_type_description').value = document.querySelector('.profile__description').textContent
    
  } else if (popup.classList.contains('profile__add-button')) {
    document.querySelector('.popup_type_new-card').style.display = 'flex';
  } else if (popup.classList.contains('card__image')) {
    document.querySelector('.popup_type_image').querySelector('.popup__content').querySelector('.popup__image').src = popup.src
    document.querySelector('.popup_type_image').querySelector('.popup__content').querySelector('.popup__image').alt = popup.parentNode.querySelector('.card__image').alt
    document.querySelector('.popup_type_image').querySelector('.popup__content').querySelector('.popup__caption').textContent = popup.parentNode.querySelector('.card__image').alt
    document.querySelector('.popup_type_image').style.display = 'flex';
  }
}

initialCards.forEach(el => {
  cardList.append(createCard(el, cardRemove))
})



