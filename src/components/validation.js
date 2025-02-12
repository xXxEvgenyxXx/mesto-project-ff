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
    const errorMessage = input.dataset.errorMessage;
    const errorSpan = document.getElementById(`${input.id}-error`);

    if (input.validity.patternMismatch) {
        errorSpan.textContent = errorMessage;
        errorSpan.classList.add('popup__error_visible');
        return false;
    } else {
        errorSpan.textContent = '';
        errorSpan.classList.remove('popup__error_visible');
        return true;
    }
}

function showError(input, errorElement, validationConfig) {
    input.classList.add(validationConfig.inputErrorClass);
    console.log(input.validity.patternMismatch);
    //errorElement.textContent = input.validationMessage || input.dataset.errorMessage ;
    if(input.validity.patternMismatch){
        errorElement.textContent = input.dataset.errorMessage
    }
    else {
        errorElement.textContent = input.validationMessage;
    }
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