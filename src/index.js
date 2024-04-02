import './pages/index.css';
import {removeCard, likeCard, createCard} from './scripts/card'
import {closePopup, openPopup} from './scripts/modal'
import {enableValidation, clearValidation} from './scripts/validation'
import {getInformationProfile, getCardsList, changeInformationProfile, addCard, changeProfileImage} from './scripts/api'
import {renderLoading} from './scripts/utils'
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

let profileId = null

const informationProfile = getInformationProfile()
const cardsList = getCardsList()

function getPopapTypeImage() {
  return document.querySelector('.popup_type_image')
}


const openPopupBigImage = (card) => {
  const popupTypeImage = getPopapTypeImage()
  popupTypeImage.querySelector('.popup__content').querySelector('.popup__image').src = card.querySelector('.card__image').src
  popupTypeImage.querySelector('.popup__content').querySelector('.popup__image').alt = card.querySelector('.card__image').alt
  popupTypeImage.querySelector('.popup__content').querySelector('.popup__caption').textContent = card.querySelector('.card__image').alt
  openPopup(popupTypeImage)
}

const submitEditProfileForm = (evt) => {
  evt.preventDefault()
  renderLoading(true, popupTypeEdit)
  changeInformationProfile({
    name: popupTypeEdit.querySelector('.popup__input_type_name').value,
    about: popupTypeEdit.querySelector('.popup__input_type_description').value 
  }).then((res) => {
    profileTitle.textContent = res.name
    profileDescription.textContent = res.about
    closePopup(popupTypeEdit)
  }).catch((err) => {
    console.log(err);
  }).finally(() => {
    renderLoading(false, popupTypeEdit)
  })
} 

const submitAddCardForm = (evt) => {
  evt.preventDefault()
  renderLoading(true, popupTypeNewCard)
  const card = {
    name: popupTypeNewCard.querySelector('.popup__input_type_card-name').value,
    link: popupTypeNewCard.querySelector('.popup__input_type_url').value
  }
  addCard(card).then((res) => {
    cardList.prepend(createCard(res, removeCard, likeCard, openPopupBigImage, profileId))
    closePopup(popupTypeNewCard)
  }).catch((err) => {
    console.log(err);
  }).finally(() => {
    renderLoading(false, popupTypeNewCard)
  })
} 

const submitUpdateAvatarForm = (evt) => {
  evt.preventDefault()
  renderLoading(true, popupTypeImgProfile)
  changeProfileImage({
    avatar: popupTypeImgProfile.querySelector('.popup__input_type_url').value,
  }).then((res) => {
    profileAvatar.style.backgroundImage = `url(${res.avatar})`
    closePopup(popupTypeImgProfile)
  }).catch((err) => {
    console.log(err);
  }).finally(() => {
    renderLoading(false, popupTypeImgProfile)
  })
} 

forms.edit_profile.addEventListener('submit', submitEditProfileForm)
forms.new_place.addEventListener('submit', submitAddCardForm)
forms.img_profile.addEventListener('submit', submitUpdateAvatarForm)
  
profileAddButton.addEventListener('click', () => {
  forms.new_place.reset()
  openPopup(popupTypeNewCard)
  clearValidation(popupTypeNewCard, validationSettingsObject)
})

profileEditButton.addEventListener('click', () => {
  popupTypeEdit.querySelector('.popup__input_type_name').value = profileTitle.textContent
  popupTypeEdit.querySelector('.popup__input_type_description').value = profileDescription.textContent
  openPopup(popupTypeEdit)
  clearValidation(popupTypeEdit, validationSettingsObject)
})

profileAvatar.addEventListener('click', () => {
  forms.img_profile.reset()
  openPopup(popupTypeImgProfile)
  clearValidation(popupTypeImgProfile, validationSettingsObject)
})

Promise.all([informationProfile, cardsList]).then((res) => {
  setInformationProfile(res[0])
  setCardList(res[1])
}).catch((err) => {
  console.log(err);
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

enableValidation(validationSettingsObject)