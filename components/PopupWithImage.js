import {Popup} from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor({link, place}, popupSelector) {
        super(popupSelector)
        this._closeButton = this._popup.querySelector('.popup-photo__close-button');
        this._link = link
        this._place = place
    }


    open() {
        super.open();
        this._photoPopupImg = this._popup.querySelector('.popup-photo__img');
        this._popupText = this._popup.querySelector('.popup-photo__text');
        this._photoPopupImg.src = this._link;
        this._popupText.innerText = this._place;

    }
}