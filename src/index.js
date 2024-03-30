import './pages/index.css';
import {removeCard, likeCard, createCard} from './scripts/card'
import {closePopup, openPopup} from './scripts/modal'
import {enableValidation, clearValidation} from './scripts/validation'
import {getInformationProfile, getCardsList, changeInformationProfile, addCard, changeProfileImage} from './scripts/api'

// @todo: DOM узлы

// Объект настроек для валидации
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
const popupTypeImgProfile = document.querySelector('.popup_type_upd_img_profile')

const profileTitle = document.querySelector('.profile__title')
const profileDescription = document.querySelector('.profile__description')
const profileAvatar = document.querySelector('.profile__image')
const profileImgEditIcon = document.querySelector('.profile__image_edit_icon')

let profileId = undefined

const informationProfile = getInformationProfile()
const cardsList = getCardsList()


const openPopupBigImage = (card) => {
  document.querySelector('.popup_type_image').querySelector('.popup__content').querySelector('.popup__image').src = card.querySelector('.card__image').src
  document.querySelector('.popup_type_image').querySelector('.popup__content').querySelector('.popup__image').alt = card.querySelector('.card__image').alt
  document.querySelector('.popup_type_image').querySelector('.popup__content').querySelector('.popup__caption').textContent = card.querySelector('.card__image').alt
  openPopup(document.querySelector('.popup_type_image'))
}

const submitEdit = (evt) => {
  evt.preventDefault()
  renderLoading(true, popupTypeEdit)
  changeInformationProfile({
    name: popupTypeEdit.querySelector('.popup__input_type_name').value,
    about: popupTypeEdit.querySelector('.popup__input_type_description').value 
  }).then((res) => {
    profileTitle.textContent = res.name
    profileDescription.textContent = res.about
  }).finally(() => {
    renderLoading(false, popupTypeEdit)
  })
  closePopup(popupTypeEdit)
} 

const submitAdd = (evt) => {
  evt.preventDefault()
  renderLoading(true, popupTypeNewCard)
  const card = {
    name: popupTypeNewCard.querySelector('.popup__input_type_card-name').value,
    link: popupTypeNewCard.querySelector('.popup__input_type_url').value
  }
  addCard(card).then((res) => {
    cardList.prepend(createCard(res, removeCard, likeCard, openPopupBigImage, profileId))
  }).finally(() => {
    renderLoading(false, popupTypeNewCard)
  })
  
  popupTypeNewCard.querySelector('.popup__input_type_card-name').value = ''
  popupTypeNewCard.querySelector('.popup__input_type_url').value = ''
  closePopup(popupTypeNewCard)
} 

const submitUpdImg = (evt) => {
  evt.preventDefault()
  renderLoading(true, popupTypeImgProfile)
  changeProfileImage({
    avatar: popupTypeImgProfile.querySelector('.popup__input_type_url').value,
  }).then((res) => {
    profileAvatar.style.backgroundImage = `url(${res.avatar})`
  }).finally(() => {
    renderLoading(false, popupTypeImgProfile)
  })
  popupTypeImgProfile.querySelector('.popup__input_type_url').value = ''
  closePopup(popupTypeImgProfile)
} 

forms.edit_profile.addEventListener('submit', submitEdit)
forms.new_place.addEventListener('submit', submitAdd)
forms.img_profile.addEventListener('submit', submitUpdImg)
  
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

profileImgEditIcon.addEventListener('click', () => {
  openPopup(popupTypeImgProfile)
  document.querySelector('.profile__image_edit_icon').style.display = 'flex'
  clearValidation(popupTypeImgProfile, validationSettingsObject)
  enableValidation(validationSettingsObject)
})

profileAvatar.addEventListener('mouseover', () => {
  document.querySelector('.profile__image_edit_icon').style.display = 'flex'
})

profileImgEditIcon.addEventListener('mouseout', () => {
  document.querySelector('.profile__image_edit_icon').style.display = 'none'
})

function renderLoading(isLoading, form) {
  if(isLoading) {
    form.querySelector('.popup__button').textContent = "Сохранение.."
  } else {
    form.querySelector('.popup__button').textContent = "Сохранить"
  }
}

Promise.all([informationProfile, cardsList]).then((res) => {
  setInformationProfile(res[0])
  setCardList(res[1])
})

function setInformationProfile(data) {
  profileId = data._id
  profileTitle.textContent = data.name
  profileDescription.textContent = data.about
  profileAvatar.style.backgroundImage = `url(${data.avatar})`
}

function setCardList(data) {
  data.forEach(el => {
    cardList.append(createCard(el, removeCard, likeCard, openPopupBigImage, profileId))
  })
}