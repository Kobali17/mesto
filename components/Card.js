export class Card {
    constructor({data, liked, owned, handleCardClick, handleLikeClick, handleDelClick}, cardSelector) {
        this._place = data.name;
        this._link = data.link;
        this._likes = data.likes;
        this._cardId = data._id;
        this.owned = owned;
        this._liked = liked;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this.delCardClick = handleDelClick
        this._handleLikeClick = handleLikeClick;
    }

    getCardId() {
        return this._cardId
    }

    getCardLiked() {
        return this._liked
    }

    createCard() {
        this._card = this._getTemplate()
        this._cardImg = this._card.querySelector('.card__img');
        this._cardText = this._card.querySelector('.card__text');
        this._likeCount = this._card.querySelector('.card__like-data');
        this._likeCount.textContent = this._likes.length
        this._cardImg.src = this._link;
        this._cardImg.alt = this._place;
        this._cardText.innerText = this._place;
        this._addListeners()
        this._toggleCardLiked()
        if (!this.owned) {
            this._delButton.style.display = "none";
        }
        return this._card
    }

    likeCounter = (arr, liked) => {
        this._liked = liked
        this._toggleCardLiked()
        this._likes = arr;
        this._likeCount.textContent = this._likes.length;
    }

    delCard = () => {
        this._card.remove();
        this._card = null;
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
        this._likeButton.addEventListener('click', this._cardLiked)
        this._delButton.addEventListener('click', () => {
            this.delCardClick(this)
        })
        this._cardImg.addEventListener('click', () => {
            this._handleCardClick({link: this._link, place: this._place})
        })
    }

    _cardLiked = () => {
        this._handleLikeClick(this)

    }
    _toggleCardLiked = () => {
        if (this._liked) {
            this._likeButton.classList.add('card_liked');
        } else {
            this._likeButton.classList.remove('card_liked');
        }
    }
}

