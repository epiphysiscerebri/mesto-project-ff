const showInputError = (formElement, inputElement, errorMessage, settingsObject) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`); 
  inputElement.classList.add(settingsObject.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settingsObject.errorClass);
};

const hideInputError = (formElement, inputElement, settingsObject) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`); 
  inputElement.classList.remove(settingsObject.inputErrorClass);
  errorElement.classList.remove(settingsObject.errorClass);
  errorElement.textContent = '';
};

const isValid = (formElement, inputElement, settingsObject) => {

  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, settingsObject);
  } else {
    hideInputError(formElement, inputElement, settingsObject);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}; 

const toggleButtonState = (inputList, buttonElement, settingsObject) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(settingsObject.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(settingsObject.inactiveButtonClass);
  }
};

const setEventListeners = (formElement, settingsObject) => {
  const inputList = Array.from(formElement.querySelectorAll(settingsObject.inputSelector));
  const buttonElement = formElement.querySelector(settingsObject.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, settingsObject)
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, settingsObject)
      toggleButtonState(inputList, buttonElement, settingsObject)
    });
  });
};

const enableValidation = (settingsObject) => {
  const formList = Array.from(document.querySelectorAll(settingsObject.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, settingsObject);
  });
}

const clearValidation = (formElement, settingsObject, ) => {
  const inputList = Array.from(formElement.querySelectorAll(settingsObject.inputSelector));
  if(inputList.some(input => input.validity.valid)) {
    formElement.querySelector(settingsObject.submitButtonSelector).classList.remove(settingsObject.inactiveButtonClass)
  } else {
    formElement.querySelector(settingsObject.submitButtonSelector).classList.add(settingsObject.inactiveButtonClass)
  }
  inputList.forEach((formInput) => {
    formElement.querySelector(`.${formInput.id}-error`).textContent = ""
    formInput.classList.remove(settingsObject.inputErrorClass)
  })
}

export {enableValidation, clearValidation}