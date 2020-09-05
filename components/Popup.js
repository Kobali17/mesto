export class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector)
        this._overlay = document.querySelector('.overlay')
        this._closeButton = this._popup.querySelector('.popup__close-button');

    }

    _handleEscClose = (evt) => {
        if (evt.key === 'Escape') {
            this.close()
            document.removeEventListener('keydown', this._handleEscClose)
        }
    }


    setEventListeners() {
        this._closeButton.addEventListener('click', this.close.bind(this));
        this._overlay.addEventListener('click', this.close.bind(this)
        );
        document.addEventListener('keydown', this._handleEscClose);

    }

    open() {
        this._overlay.classList.add("popup_opened")
        this._popup.classList.add("popup_opened");

    }

    close() {
        this._closeButton.removeEventListener('click', this.close.bind(this));
        this._overlay.removeEventListener('click', this.close.bind(this)
        );
        this._popup.classList.remove("popup_opened");
        this._overlay.classList.remove("popup_opened")

    }

}



