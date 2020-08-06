const profileEditButton = document.querySelector(".profile__edit-button");
const cardAddButton = document.querySelector(".profile__add-card-button");
const nameInput = document.querySelector('#name');
const jobInput = document.querySelector('#job');
const popupNameCloseButton = document.querySelector('#name-close');
const popupPhotoCloseButton = document.querySelector('#photo-close');
const popupAddCloseButton = document.querySelector('#card-add-close');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const formNameElement = document.querySelector('#profile-form');
const formPhotoElement = document.querySelector('#photo-form');
const popupAdd = document.querySelector('#photo-add');
const linkInput = document.querySelector('#link');
const placeInput = document.querySelector('#place');
const popupText = document.querySelector('.popup-photo__text');
const overlay = document.querySelector('.popup__overlay');
const initialCards = [
    {
        place: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        place: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        place: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        place: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        place: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        place: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const createCard = (link, place) => {
    const templateCard = document.querySelector('#card');
    const photoPopupImg = document.querySelector('.popup-photo__img');
    const startCard = templateCard.cloneNode(true).content;
    const cardImg = startCard.querySelector('.card__img');
    const cardText = startCard.querySelector('.card__text');
    const likeButton = startCard.querySelector('.card__like-button');
    const delButton = startCard.querySelector('.card__del-button');
    cardImg.src = link;
    cardImg.alt = place;
    cardText.innerText = place;
    likeButton.addEventListener('click', toggleCardLiked)
    delButton.addEventListener('click', delCard)
    cardImg.addEventListener('click', function () {
        photoPopupImg.src = link;
        popupText.innerText = place;
        togglePhotoPopup()
    })
    return startCard
}

const renderCard = (card) => {
    const photoGrid = document.querySelector('.photo-grid');
    photoGrid.appendChild(card);
}

const addNewCard = (link, place) => {
    const newCard = createCard(link, place);
    renderCard(newCard)
}

const photoSubmitHandler = (evt) => {
    evt.preventDefault();
    const link = linkInput.value;
    const place = placeInput.value;
    addNewCard(link, place);
    toggleAddPopup();
}

const toggleEditPopup = () => {
    const popupEdit = document.querySelector('#edit');
    popupEdit.classList.toggle("popup_opened");
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    overlayToggle();
    firstPopupValid(popupEdit);

}

const overlayToggle = () => {
    overlay.classList.toggle('popup_opened');
}

const toggleAddPopup = () => {
    popupAdd.classList.toggle("popup_opened");
    placeInput.value = "";
    linkInput.value = "";
    overlayToggle();
    firstPopupValid(popupAdd)

}

const togglePhotoPopup = () => {
    const photoPopup = document.querySelector('.popup-photo');
    photoPopup.classList.toggle("popup_opened");
    overlayToggle();

}

const toggleCardLiked = (evt) => {
    evt.target.classList.toggle("card_liked");
}

const profileFormSubmitHandler = (evt) => {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    toggleEditPopup();
}

const delCard = (event) => {
    const startCard = event.target.closest('.card')
    startCard.remove()
}

const startCards = () => {
    initialCards.forEach(function (item) {
        addNewCard(item.link, item.place);
    })
}

const closeOpenedPopup = () => {
    const openedPopups = document.querySelectorAll(".popup_opened");
    openedPopups.forEach(function (item) {
        item.classList.remove('popup_opened')
    })
}

const escClosePopup = (evt) => {
    if (evt.key === 'Escape') {
        closeOpenedPopup()
    }

}


startCards()

document.addEventListener('keydown', escClosePopup)
overlay.addEventListener('click', closeOpenedPopup);
formPhotoElement.addEventListener('submit', photoSubmitHandler);
formNameElement.addEventListener('submit', profileFormSubmitHandler);
profileEditButton.addEventListener('click', toggleEditPopup);
cardAddButton.addEventListener('click', toggleAddPopup);
popupNameCloseButton.addEventListener('click', toggleEditPopup);
popupPhotoCloseButton.addEventListener('click', togglePhotoPopup);
popupAddCloseButton.addEventListener('click', toggleAddPopup);