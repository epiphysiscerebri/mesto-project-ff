// Функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove('popup_is-opened')
  document.removeEventListener('keydown', closePopupByEsc);
  popup.removeEventListener('click', closePopupByClick)
}

// Функция открытия попапа
function openPopup(popup) {
  popup.classList.add('popup_is-opened')
  document.addEventListener('keydown', closePopupByEsc);
  popup.addEventListener('click', closePopupByClick)
}

// Функция закрытия попапа по esc
const closePopupByEsc = (evt) => {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_is-opened'))
  }
}

// Функция закрытия попапа по click
const closePopupByClick = (evt) => {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
    closePopup(evt.currentTarget)
  }
}

export {closePopup, openPopup}