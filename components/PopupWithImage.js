import {Popup} from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector)
        this._closeButton = this._popup.querySelector('.popup-photo__close-button');
        this._photoPopupImg = this._popup.querySelector('.popup-photo__img');
        this._popupText = this._popup.querySelector('.popup-photo__text');
    }

    open({link, place}) {
        super.open();
        this._photoPopupImg.src = link;
        this._popupText.innerText = place;
    }
}