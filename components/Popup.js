export class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector)
        this._overlay = document.querySelector('.overlay')
        this._closeButton = this._popup.querySelector('.popup__close-button');
        this._submitButton = this._popup.querySelector('.popup__save-button');
    }

    _handleEscClose = (evt) => {
        if (evt.key === 'Escape') {
            this.close()
        }
    }

    renderLoading(isLoading) {
        if (isLoading) {
            this._submitButton.textContent = 'Сохранение...'
        } else {
            this._submitButton.textContent = 'Сохранить'
        }
    }

    setEventListeners() {
        this._closeButton.addEventListener('click', this.close.bind(this));
        this._overlay.addEventListener('click', this.close.bind(this));
    }

    open() {
        document.addEventListener('keydown', this._handleEscClose);
        this._overlay.classList.add("popup_opened")
        this._popup.classList.add("popup_opened");
    }

    close() {
        this._closeButton.removeEventListener('click', this.close.bind(this));
        this._overlay.removeEventListener('click', this.close.bind(this));
        document.removeEventListener('keydown', this._handleEscClose);
        this._popup.classList.remove("popup_opened");
        this._overlay.classList.remove("popup_opened")
    }
}



