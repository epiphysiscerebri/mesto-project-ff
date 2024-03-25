let validationSettingsObject = undefined

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`); 
  inputElement.classList.add(validationSettingsObject.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationSettingsObject.errorClass);
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`); 
  inputElement.classList.remove(validationSettingsObject.inputErrorClass);
  errorElement.classList.remove(validationSettingsObject.errorClass);
  errorElement.textContent = '';
};

const isValid = (formElement, inputElement) => {

  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}; 

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(validationSettingsObject.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(validationSettingsObject.inactiveButtonClass);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(validationSettingsObject.inputSelector));
  const buttonElement = formElement.querySelector(validationSettingsObject.submitButtonSelector);
  toggleButtonState(inputList, buttonElement)
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement)
      toggleButtonState(inputList, buttonElement)
    });
  });
};

const enableValidation = (settingsObject) => {
  validationSettingsObject = settingsObject
  const formList = Array.from(document.querySelectorAll(validationSettingsObject.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
}

const clearValidation = (formElement, settingsObject) => {
  validationSettingsObject = settingsObject
  const inputList = Array.from(formElement.querySelectorAll(validationSettingsObject.inputSelector));
  inputList.forEach((formInput) => {
    formElement.querySelector(`.${formInput.id}-error`).textContent = ""
    formInput.classList.remove(validationSettingsObject.inputErrorClass)
    formElement.querySelector(validationSettingsObject.submitButtonSelector).classList.remove(validationSettingsObject.inactiveButtonClass)
  })

}

export {enableValidation, clearValidation}