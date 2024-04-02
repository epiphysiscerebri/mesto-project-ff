function renderLoading(isLoading, form) {
  if(isLoading) {
    form.querySelector('.popup__button').textContent = "Сохранение.."
  } else {
    form.querySelector('.popup__button').textContent = "Сохранить"
  }
}

export {renderLoading}