import {Popup} from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor(submitCallback, popupSelector) {
        super(popupSelector)
        this._submitCallback = submitCallback;
        this._form = this._popup.querySelector('.popup__form');
        this._allInputs = this._form.querySelectorAll('.popup__input');
    }

    _getInputValues() {
        return this._allInputs.map(function (item) {
            return item.value
        })
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', this._submitCallback);
        this._form.addEventListener('submit', this.close);
    }

    close = () => {
        super.close();
        this._form.removeEventListener('submit', this._submitCallback);
        this._form.removeEventListener('submit', this.close);
        return this._allInputs.forEach(function (item) {
            item.value = ""
        })
    }
}
