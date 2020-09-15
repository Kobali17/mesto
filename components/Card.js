class Card {
    constructor(cardData, cardSelector, handleCardClick) {
        this._place = cardData.name;
        this._link = cardData.link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
    }

    _getTemplate() {
        return document
            .querySelector(this._cardSelector)
            .content
            .cloneNode(true).firstElementChild;
    }

    _addListeners() {
        this._likeButton = this._card.querySelector('.card__like-button');
        this._delButton = this._card.querySelector('.card__del-button');
        this._likeButton.addEventListener('click', this._toggleCardLiked)
        this._delButton.addEventListener('click', this._delCard)
        this._cardImg.addEventListener('click', () => {
            this._handleCardClick({link: this._link, place: this._place})
        })

    }

    _toggleCardLiked = () => {
        this._likeButton.classList.toggle('card_liked');
    }
    _delCard = () => {
        this._card.remove();
        this._card = null;
    }

    createCard() {
        this._card = this._getTemplate()
        this._cardImg = this._card.querySelector('.card__img');
        this._cardText = this._card.querySelector('.card__text');
        this._cardImg.src = this._link;
        this._cardImg.alt = this._place;
        this._cardText.innerText = this._place;
        this._addListeners()
        return this._card
    }

}

export {Card};