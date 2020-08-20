import {FormValidator} from "./FormValidator.js";
import {Card} from "./Card.js";
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
const overlay = document.querySelector('.overlay');
const popupEdit = document.querySelector('#edit');
const photoPopup = document.querySelector('.popup-photo');
const selectorDict = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input_error_active'
};
const cards = [
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


const photoSubmitHandler = (evt) => {
    evt.preventDefault();
    const link = linkInput.value;
    const place = placeInput.value;
    addNewCard({link, place});
    toggleAddPopup();
}

const toggleEditPopup = () => {
    popupEdit.classList.toggle("popup_opened");
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    overlayToggle();
}

const overlayToggle = () => {
    overlay.classList.toggle('popup_opened');
    document.addEventListener('keydown', escClosePopup);
}

const toggleAddPopup = () => {
    popupAdd.classList.toggle("popup_opened");
    placeInput.value = "";
    linkInput.value = "";
    overlayToggle();
}

const togglePhotoPopup = () => {
    photoPopup.classList.toggle("popup_opened");
    overlayToggle();
}


const profileFormSubmitHandler = (evt) => {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    toggleEditPopup();
}


const closeOpenedPopup = () => {
    const openedPopups = document.querySelectorAll(".popup_opened");
    openedPopups.forEach(function (item) {
        item.classList.remove('popup_opened')
    })
    document.removeEventListener('keydown', escClosePopup)
}

const escClosePopup = (evt) => {
    if (evt.key === 'Escape') {
        closeOpenedPopup()
    }
}
const openPhotoPopup = (link, place) => {
    const photoPopupImg = document.querySelector('.popup-photo__img');
    const popupText = document.querySelector('.popup-photo__text');
    photoPopupImg.src = link;
    popupText.innerText = place;
    togglePhotoPopup();

}
const addNewCard = (item) => {
    const card = new Card(item, '#card');
    const cardElement = card.createCard(openPhotoPopup);
    document.querySelector('.photo-grid').prepend(cardElement);
}

overlay.addEventListener('click', closeOpenedPopup);
formPhotoElement.addEventListener('submit', photoSubmitHandler);
formNameElement.addEventListener('submit', profileFormSubmitHandler);
profileEditButton.addEventListener('click', toggleEditPopup);
cardAddButton.addEventListener('click', toggleAddPopup);
popupNameCloseButton.addEventListener('click', toggleEditPopup);
popupPhotoCloseButton.addEventListener('click', togglePhotoPopup);
popupAddCloseButton.addEventListener('click', toggleAddPopup);


new FormValidator(selectorDict, formNameElement).enableValidation(profileEditButton)
new FormValidator(selectorDict, formPhotoElement).enableValidation(cardAddButton)


cards.forEach((item) => {
    addNewCard(item)
});
