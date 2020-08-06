const showError = (formElement, inputElement, errorMessage) => {
// добавляет  стили ошибки
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__input_error_active');

}

const hideError = (formElement, inputElement) => {
// убирает стили ошибки
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.classList.remove('popup__input_error_active');
    errorElement.textContent = '';
}


const inputValidity = (formElement, inputElement) => {
    // выводит ошибку если элемент не прошел валидацию и убирает если прошел
    if (!inputElement.validity.valid) {
        showError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideError(formElement, inputElement);
    }
};

const hasInvalidInput = (inputList) => {
    // проверяет, не прошел ли хоть один элемент валидацию
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
}


const toggleButton = (inputList, buttonElement) => {
    // включает кнопку если все элементы прошли валидацию

    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add('popup__save-button_inactive');
    } else {
        buttonElement.classList.remove('popup__save-button_inactive');
    }
};

const setEventListeners = (formElement) => {
    // навешивает слушатели на массив инпутов
    // здесь же можно вставить активацию кнопки
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const buttonElement = formElement.querySelector('.popup__save-button');
    toggleButton(inputList, buttonElement);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            inputValidity(formElement, inputElement);
            toggleButton(inputList, buttonElement);
        });
    });
};
const enableValidation = () => {
    //убирает стандартное поведение формы
    const formList = Array.from(document.querySelectorAll('.popup__form'));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });

        setEventListeners(formElement)

    })

}
const firstPopupValid = (popup) => {
    //проверка валидности при открытии попапа
    const formElement = popup.querySelector('.popup__form');
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const buttonElement = formElement.querySelector('.popup__save-button');
    toggleButton(inputList, buttonElement);
}
enableValidation();



