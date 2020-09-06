import {Popup} from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor(submitCallback, popupSelector) {
        super(popupSelector)
        this._submitCallback = submitCallback;
        this._form = this._popup.querySelector('.popup__form');
        this._allInputs = this._form.querySelectorAll('.popup__input');
    }

    _getInputValues() {
        const formValues = {};
        this._allInputs.forEach(input => formValues[input.name] = input.value);
        return formValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitCallback(this._getInputValues())
            this.close()
        });
    }

    close = () => {
        super.close();
        return this._allInputs.forEach(function (item) {
            item.value = ""
        })
    }
}
