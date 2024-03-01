import {removeCard, likeCard, createCard} from './card'

// @todo: DOM узлы
const cardList = document.querySelector('.places__list')
const page = document.querySelector('.page')
const profileTitle = page.querySelector('.profile__title')
const profileDescription = page.querySelector('.profile__description')
const forms = document.forms

// @todo: Функция закрытия попапа
function closePopup(evt) {
  evt.stopPropagation()
  if(evt.target.classList.contains('popup')) {
    document.querySelector('.popup_type_edit').classList.remove('popup_is-opened');
    page.querySelector('.popup_type_new-card').classList.remove('popup_is-opened');
    page.querySelector('.popup_type_image').classList.remove('popup_is-opened');
  } else if(evt.target.classList.contains('popup__close')) {
    document.querySelector('.popup_type_edit').classList.remove('popup_is-opened');
    page.querySelector('.popup_type_new-card').classList.remove('popup_is-opened');
    page.querySelector('.popup_type_image').classList.remove('popup_is-opened');
  } else if (evt.key === 'Escape') {
    document.querySelector('.popup_type_edit').classList.remove('popup_is-opened');
    page.querySelector('.popup_type_new-card').classList.remove('popup_is-opened');
    page.querySelector('.popup_type_image').classList.remove('popup_is-opened');
  } else if(evt.target.classList.contains('popup__button')) {
    if (page.querySelector('.popup_type_edit').classList.contains('popup_is-opened') ) {
      savedData('edit')
    } else if (page.querySelector('.popup_type_new-card').classList.contains('popup_is-opened')) {
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
    document.querySelector('.popup_type_edit').classList.add('popup_is-opened');
    document.querySelector('.popup__input_type_name').value = profileTitle.textContent
    document.querySelector('.popup__input_type_description').value = profileDescription.textContent
    
  } else if (element.classList.contains('profile__add-button')) {
    document.querySelector('.popup_type_new-card').classList.add('popup_is-opened');
  } else if (element.classList.contains('card__image')) {
    document.querySelector('.popup_type_image').querySelector('.popup__content').querySelector('.popup__image').src = element.src
    document.querySelector('.popup_type_image').querySelector('.popup__content').querySelector('.popup__image').alt = element.parentNode.querySelector('.card__image').alt
    document.querySelector('.popup_type_image').querySelector('.popup__content').querySelector('.popup__caption').textContent = element.parentNode.querySelector('.card__image').alt
    document.querySelector('.popup_type_image').classList.add('popup_is-opened');
  }
}

// @todo: Функция сохранения записей при создании и при редактировании
function savedData(flag) {
  if(flag == 'edit') {
    profileTitle.textContent = document.querySelector('.popup__input_type_name').value
    profileDescription.textContent = document.querySelector('.popup__input_type_description').value
    page.querySelector('.popup_type_edit').classList.remove('popup_is-opened');
  } else if(flag == 'add'){
    if (forms.new_place.querySelector('.popup__input_type_card-name').value.length && forms.new_place.querySelector('.popup__input_type_url').value.length) {
      let card = {
        name: forms.new_place.querySelector('.popup__input_type_card-name').value,
        link: forms.new_place.querySelector('.popup__input_type_url').value
      }
      page.querySelector('.popup_type_new-card').classList.remove('popup_is-opened');
      cardList.prepend(createCard(card, removeCard, likeCard))
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

export {closePopup, openPopup}