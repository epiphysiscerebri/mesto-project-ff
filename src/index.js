import {initialCards} from './scripts/cards'
import './pages/index.css';
import {removeCard, likeCard, createCard} from './scripts/card'
import {closePopup, openPopup} from './scripts/modal'
import {enableValidation, clearValidation} from './scripts/validation'

// @todo: DOM узлы
// объект настроек для валидации
const validationSettingsObject = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

const cardList = document.querySelector('.places__list')
const forms = document.forms

const profileAddButton = document.querySelector('.profile__add-button')
const profileEditButton = document.querySelector('.profile__edit-button')


const popupTypeNewCard = document.querySelector('.popup_type_new-card')
const popupTypeEdit = document.querySelector('.popup_type_edit')

const profileTitle = document.querySelector('.profile__title')
const profileDescription = document.querySelector('.profile__description')


const openPopupBigImage = (card) => {
  document.querySelector('.popup_type_image').querySelector('.popup__content').querySelector('.popup__image').src = card.querySelector('.card__image').src
  document.querySelector('.popup_type_image').querySelector('.popup__content').querySelector('.popup__image').alt = card.querySelector('.card__image').alt
  document.querySelector('.popup_type_image').querySelector('.popup__content').querySelector('.popup__caption').textContent = card.querySelector('.card__image').alt
  openPopup(document.querySelector('.popup_type_image'))
}

const submitEdit = (evt) => {
  evt.preventDefault()
  profileTitle.textContent = popupTypeEdit.querySelector('.popup__input_type_name').value
  profileDescription.textContent = popupTypeEdit.querySelector('.popup__input_type_description').value 
  closePopup(popupTypeEdit)
} 

const submitAdd = (evt) => {
  evt.preventDefault()
  const card = {
    name: forms.new_place.querySelector('.popup__input_type_card-name').value,
    link: forms.new_place.querySelector('.popup__input_type_url').value
  }
  cardList.prepend(createCard(card, removeCard, likeCard, openPopupBigImage))
  forms.new_place.querySelector('.popup__input_type_card-name').value = ''
  forms.new_place.querySelector('.popup__input_type_url').value = ''
  closePopup(popupTypeNewCard)
} 

forms.edit_profile.addEventListener('submit', submitEdit)
forms.new_place.addEventListener('submit', submitAdd)
  
profileAddButton.addEventListener('click', () => {
  openPopup(popupTypeNewCard)
  clearValidation(popupTypeNewCard, validationSettingsObject)
  enableValidation(validationSettingsObject)
})
profileEditButton.addEventListener('click', () => {
  popupTypeEdit.querySelector('.popup__input_type_name').value = profileTitle.textContent
  popupTypeEdit.querySelector('.popup__input_type_description').value = profileDescription.textContent
  openPopup(popupTypeEdit)
  enableValidation(validationSettingsObject)
  clearValidation(popupTypeEdit, validationSettingsObject)
})


initialCards.forEach(el => {
  cardList.append(createCard(el, removeCard, likeCard, openPopupBigImage))
})