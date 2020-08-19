class FormValidator {
    constructor(validSelector, element) {
        this.formSelector = validSelector.formSelector;
        this.inputSelector = validSelector.inputSelector;
        this.submitButtonSelector = validSelector.submitButtonSelector;
        this.inactiveButtonClass = validSelector.inactiveButtonClass;
        this.inputErrorClass = validSelector.inputErrorClass;
        this.errorClass = validSelector.errorClass;
        this.element = element;
    }

    enableValidation(openButton) {
        this.element.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
        this._setEventListeners(this.element, openButton)
    }

    _setEventListeners(popup, openButton) {
        // навешивает слушатели на массив инпутов
        // здесь же можно вставить активацию кнопки
        const inputList = Array.from(popup.querySelectorAll(this.inputSelector));
        const buttonElement = popup.querySelector(this.submitButtonSelector);
        openButton.addEventListener('click', () => {
            this._validatePopup(popup)
        })
        this._toggleButton(inputList, buttonElement);
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._inputValidity(popup, inputElement);
                this._toggleButton(inputList, buttonElement);
            });
        });
    };

    _validatePopup(popup) {
        //проверка валидности при открытии попапа
        const buttonElement = popup.querySelector(this.submitButtonSelector);
        const inputList = Array.from(popup.querySelectorAll(this.inputSelector));
        this._toggleButton(inputList, buttonElement);

    }

    _toggleButton = (inputList, buttonElement) => {
        // включает кнопку если все элементы прошли валидацию
        if (this._hasInvalidInput(inputList)) {
            buttonElement.classList.add(this.inactiveButtonClass);
        } else {
            buttonElement.classList.remove(this.inactiveButtonClass);
        }
    };

    _showError(formElement, inputElement, errorMessage) {
        // добавляет стили ошибки
        const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this.errorClass);

    }

    _hideError(formElement, inputElement) {
        // убирает стили ошибки
        const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
        errorElement.classList.remove(this.errorClass);
        errorElement.textContent = '';
    }

    _inputValidity = (formElement, inputElement) => {
        // выводит ошибку если элемент не прошел валидацию и убирает если прошел
        if (!inputElement.validity.valid) {
            this._showError(formElement, inputElement, inputElement.validationMessage);
        } else {
            this._hideError(formElement, inputElement);
        }
    };

    _hasInvalidInput = (inputList) => {
        // проверяет, не прошел ли хоть один элемент валидацию
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }
}

export {FormValidator}