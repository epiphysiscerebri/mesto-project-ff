// @todo: Функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove('popup_is-opened')
  document.removeEventListener('keydown', closePopupByEsc);
  popup.removeEventListener('click', closePopupByClick)
}

// @todo: Функция открытия попапа
function openPopup(popup) {
  popup.classList.add('popup_is-opened')
  document.addEventListener('keydown', closePopupByEsc);
  popup.addEventListener('click', closePopupByClick)
}

// @todo: Функция сохранения записей при создании и при редактировании
// function savedData(flag) {
//   if(flag == 'edit') {
//     profileTitle.textContent = document.querySelector('.popup__input_type_name').value
//     profileDescription.textContent = document.querySelector('.popup__input_type_description').value
//     page.querySelector('.popup_type_edit').classList.remove('popup_is-opened');
//   } else if(flag == 'add'){
//     if (forms.new_place.querySelector('.popup__input_type_card-name').value.length && forms.new_place.querySelector('.popup__input_type_url').value.length) {
//       let card = {
//         name: forms.new_place.querySelector('.popup__input_type_card-name').value,
//         link: forms.new_place.querySelector('.popup__input_type_url').value
//       }
//       page.querySelector('.popup_type_new-card').classList.remove('popup_is-opened');
//       cardList.prepend(createCard(card, removeCard, likeCard))
//     }
//   }
// }

const closePopupByEsc = (evt) => {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_is-opened'))
  }
}

const closePopupByClick = (evt) => {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
    closePopup(evt.currentTarget)
  }
}

export {closePopup, openPopup}