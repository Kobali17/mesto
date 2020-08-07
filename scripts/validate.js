const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input_error_active'
};
const showError = (formElement, inputElement, errorMessage, conf) => {
// добавляет  стили ошибки
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(conf.errorClass);

}

const hideError = (formElement, inputElement, conf) => {
// убирает стили ошибки
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.classList.remove(conf.errorClass);
    errorElement.textContent = '';
}


const inputValidity = (formElement, inputElement, conf) => {
    // выводит ошибку если элемент не прошел валидацию и убирает если прошел
    if (!inputElement.validity.valid) {
        showError(formElement, inputElement, inputElement.validationMessage, conf);
    } else {
        hideError(formElement, inputElement, conf);
    }
};

const hasInvalidInput = (inputList) => {
    // проверяет, не прошел ли хоть один элемент валидацию
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
}


const toggleButton = (inputList, buttonElement, conf) => {
    // включает кнопку если все элементы прошли валидацию
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(conf.inactiveButtonClass);
    } else {
        buttonElement.classList.remove(conf.inactiveButtonClass);
    }
};

const setEventListeners = (popup, conf) => {
    // навешивает слушатели на массив инпутов
    // здесь же можно вставить активацию кнопки
    const inputList = Array.from(popup.querySelectorAll(conf.inputSelector));
    const buttonElement = popup.querySelector(conf.submitButtonSelector);
    toggleButton(inputList, buttonElement, conf);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            inputValidity(popup, inputElement, conf);
            toggleButton(inputList, buttonElement, conf);
        });
    });
};
const enableValidation = (conf) => {
    const formList = Array.from(document.querySelectorAll(conf.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });

        setEventListeners(formElement, conf)

    })

}
const validatePopup = (popup, conf) => {
    //проверка валидности при открытии попапа
    const formElement = popup.querySelector(conf.formSelector);
    const buttonElement = formElement.querySelector(conf.submitButtonSelector);
    const inputList = Array.from(formElement.querySelectorAll(conf.inputSelector));
    toggleButton(inputList, buttonElement, conf);
}

enableValidation(validationConfig);


