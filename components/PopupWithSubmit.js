import {Popup} from "./Popup";

export class PopupWithSubmit extends Popup {
    constructor(popupSelector,) {
        super(popupSelector);
        this._submitCallback = null;
    }

    setCallback(callback) {
        this._submitCallback = callback;
    }

    setEventListeners() {
        super.setEventListeners();
        this._submitButton.addEventListener('click', () => {
            this._submitCallback()
            this.close()
        })
    }
}