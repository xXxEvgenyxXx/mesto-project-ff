export function enableValidation(validationConfig) {
    const forms = document.querySelectorAll(validationConfig.formSelector);

    forms.forEach(form => {
        setEventListeners(form, validationConfig);
    });
}

export function clearValidation(form, validationConfig) {
    const inputs = form.querySelectorAll(validationConfig.inputSelector);
    const submitButton = form.querySelector(validationConfig.submitButtonSelector);

    inputs.forEach(input => {
        const errorElement = form.querySelector(`#${input.id}-error`);
        hideError(input, errorElement, validationConfig);
    });

    submitButton.classList.add(validationConfig.inactiveButtonClass);
    submitButton.disabled = true;
}
  
function setEventListeners(form, validationConfig) {
    const inputs = form.querySelectorAll(validationConfig.inputSelector);
    const submitButton = form.querySelector(validationConfig.submitButtonSelector);

    inputs.forEach(input => {
        input.addEventListener('input', () => {
        checkInputValidity(form, input, validationConfig);
        toggleButtonState(inputs, submitButton, validationConfig);
        });
    });
    toggleButtonState(inputs, submitButton, validationConfig);
}
  
function checkInputValidity(form, input, validationConfig) {
    const errorElement = form.querySelector(`#${input.id}-error`);
    const isValid = input.validity.valid && validateInputContent(input);

    if (!isValid) {
        showError(input, errorElement, validationConfig);
    } else {
        hideError(input, errorElement, validationConfig);
    }
}
  
function validateInputContent(input) {
    if (input.name === 'place-name' || input.name === 'name') {
        const regex = /^[a-zA-Zа-яА-Я\s-]+$/;
        return regex.test(input.value);
      }
    return true;
}

function showError(input, errorElement, validationConfig) {
    input.classList.add(validationConfig.inputErrorClass);
    errorElement.textContent = input.validationMessage || input.dataset.errorMessage;
    errorElement.classList.add(validationConfig.errorClass);
}

function hideError(input, errorElement, validationConfig) {
    input.classList.remove(validationConfig.inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(validationConfig.errorClass);
}

function toggleButtonState(inputs, submitButton, validationConfig) {
    const hasInvalidInput = Array.from(inputs).some(input => !input.validity.valid || !validateInputContent(input));

    if (hasInvalidInput) {
        submitButton.classList.add(validationConfig.inactiveButtonClass);
        submitButton.disabled = true;
    } else {
        submitButton.classList.remove(validationConfig.inactiveButtonClass);
        submitButton.disabled = false;
    }
}