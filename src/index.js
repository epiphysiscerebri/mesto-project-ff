import {initialCards} from './scripts/cards'
import './pages/index.css';

// @todo: Темплейт карточки
const cardList = document.querySelector('.places__list')
const cardTemplate = document.querySelector('#card-template').content
// @todo: DOM узлы
const page = document.querySelector('.page')
const profileTitle = page.querySelector('.profile__title')
const profileDescription = page.querySelector('.profile__description')
const forms = document.forms

// @todo: Функция удаления карточки
function cardRemove(card) {
  card.remove()
}

// @todo: Функция лайка карточки
function likeCard(card) {
  card.querySelector('.card__like-button').classList.toggle('card__like-button_is-active')
}

// @todo: Функция создания карточки
function createCard(card, cardRemove, likeCard) {
  const cardTemplateClone = cardTemplate.querySelector('.places__item').cloneNode(true)
  cardTemplateClone.querySelector('.card__delete-button').addEventListener('click', () => cardRemove(cardTemplateClone))
  cardTemplateClone.querySelector('.card__like-button').addEventListener('click', () => likeCard(cardTemplateClone))

  cardTemplateClone.querySelector('.card__image').src = card.link
  cardTemplateClone.querySelector('.card__description').querySelector('.card__title').textContent = card.name
  cardTemplateClone.querySelector('.card__image').alt = card.name
  
  return cardTemplateClone

}

// @todo: Функция закрытия попапа
function closePopup(evt) {
  evt.stopPropagation()
  if(evt.target.classList.contains('popup')) {
    page.querySelector('.popup_type_edit').style.display = 'none'
    page.querySelector('.popup_type_new-card').style.display = 'none'
    page.querySelector('.popup_type_image').style.display = 'none'
  } else if(evt.target.classList.contains('popup__close')) {
    page.querySelector('.popup_type_edit').style.display = 'none'
    page.querySelector('.popup_type_new-card').style.display = 'none'
    page.querySelector('.popup_type_image').style.display = 'none'
  } else if (evt.key === 'Escape') {
    page.querySelector('.popup_type_edit').style.display = 'none'
    page.querySelector('.popup_type_new-card').style.display = 'none'
    page.querySelector('.popup_type_image').style.display = 'none'
  } else if(evt.target.classList.contains('popup__button')) {
    if (page.querySelector('.popup_type_edit').style.display === 'flex') {
      savedData('edit')
    } else if (page.querySelector('.popup_type_new-card').style.display === 'flex') {
      savedData('add')
    }
  }
}

// @todo: Функция открытия попапа
function openPopup(element) {
  adderListeners() 

  // Добавление обработчика при отправке на формы  
  for (let form of forms) {
    form.addEventListener('submit', function(evt) {
      evt.preventDefault()
      closePopup(evt)
    })
  }

  if (element.classList.contains('profile__edit-button')) {
    document.querySelector('.popup_type_edit').style.display = 'flex';
    document.querySelector('.popup__input_type_name').value = profileTitle.textContent
    document.querySelector('.popup__input_type_description').value = profileDescription.textContent
    
  } else if (element.classList.contains('profile__add-button')) {
    document.querySelector('.popup_type_new-card').style.display = 'flex';
  } else if (element.classList.contains('card__image')) {
    document.querySelector('.popup_type_image').querySelector('.popup__content').querySelector('.popup__image').src = element.src
    document.querySelector('.popup_type_image').querySelector('.popup__content').querySelector('.popup__image').alt = element.parentNode.querySelector('.card__image').alt
    document.querySelector('.popup_type_image').querySelector('.popup__content').querySelector('.popup__caption').textContent = element.parentNode.querySelector('.card__image').alt
    document.querySelector('.popup_type_image').style.display = 'flex';
  }
}

// @todo: Функция сохранения записей при создании и при редактировании
function savedData(flag) {
  if(flag == 'edit') {
    profileTitle.textContent = document.querySelector('.popup__input_type_name').value
    profileDescription.textContent = document.querySelector('.popup__input_type_description').value
    page.querySelector('.popup_type_edit').style.display = 'none'
  } else if(flag == 'add'){
    if (forms.new_place.querySelector('.popup__input_type_card-name').value.length && forms.new_place.querySelector('.popup__input_type_url').value.length) {
      let card = {
        name: forms.new_place.querySelector('.popup__input_type_card-name').value,
        link: forms.new_place.querySelector('.popup__input_type_url').value
      }
      page.querySelector('.popup_type_new-card').style.display = 'none'
      cardList.prepend(createCard(card, cardRemove, likeCard))
    }
  }
}

// todo: Функция навешивания слушателей событий
function adderListeners() {
  page.querySelectorAll('.popup__close').forEach((el) => {
    el.addEventListener('click', closePopup)
  })
  page.querySelectorAll('.popup').forEach((el) => {
    el.addEventListener('click', closePopup)
  })
  page.addEventListener('keydown', closePopup)
}

page.addEventListener('click', (evt) => {
  openPopup(evt.target)
})

initialCards.forEach(el => {
  cardList.append(createCard(el, cardRemove, likeCard))
})

