class Card {
    constructor(cardData, cardSelector) {
        this._place = cardData.place;
        this._link = cardData.link;
        this._cardSelector = cardSelector;
        this._card = this._getTemplate()
        this._cardImg = this._card.querySelector('.card__img');
        this._cardText = this._card.querySelector('.card__text');

    }

    _getTemplate() {
        return document
            .querySelector(this._cardSelector)
            .content
            .cloneNode(true).firstElementChild;

    }

    _addListeners(clickCallback) {
        this._likeButton = this._card.querySelector('.card__like-button');
        this._delButton = this._card.querySelector('.card__del-button');
        this._likeButton.addEventListener('click', this._toggleCardLiked)
        this._delButton.addEventListener('click', this._delCard)
        this._cardImg.addEventListener('click', () => {
            clickCallback(this._link, this._place)
        })
    }

    _toggleCardLiked = () => {
        this._likeButton.classList.toggle("card_liked");
    }
    _delCard = () => {
        this._card.remove()
    }

    createCard(clickCallback) {
        this._cardImg.src = this._link;
        this._cardImg.alt = this._place;
        this._cardText.innerText = this._place;
        this._addListeners(clickCallback)
        return this._card
    }

}
export {Card};