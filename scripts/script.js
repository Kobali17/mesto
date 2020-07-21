const profileEditButton = document.querySelector(".profile__edit-button");
const cardAddButton = document.querySelector(".profile__add-card-button");
const popupNameCloseButton = document.querySelector('#name-close');
const popupPhotoCloseButton = document.querySelector('#photo-close');
const popupAddCloseButton = document.querySelector('#card-add-close');
const nameInput = document.querySelector('#name');
const jobInput = document.querySelector('#job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const formNameElement = document.querySelector('#profile-form');
const formPhotoElement = document.querySelector('#photo-form');
const popupAdd = document.querySelector('#photo-add');
const popupEdit = document.querySelector('#edit');
const photoPopup = document.querySelector('.popup-photo');
const templateCard = document.querySelector('#card');
const photoGrid = document.querySelector('.photo-grid');
const linkInput = document.querySelector('#link');
const placeInput = document.querySelector('#place');
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

function AddNewCard(link, place) {
    const startCard = templateCard.cloneNode(true).content;
    const cardImg = startCard.querySelector('.card__img');
    const cardText = startCard.querySelector('.card__text');
    const likeButton = startCard.querySelector('.card__like-button');
    const delButton = startCard.querySelector('.card__del-button');
    cardImg.style.backgroundImage = `url(${link}) `;
    cardText.innerText = place;
    likeButton.addEventListener('click', toggleCardLiked)
    delButton.addEventListener('click', delCard)
    cardImg.addEventListener('click', function () {
        let photoPopupImg = document.querySelector('.popup-photo__img');
        photoPopupImg.src = link;
        let popupText = document.querySelector('.popup-photo__text');
        popupText.innerText = place;
        photoPopup.classList.toggle("popup_opened");
    })
    photoGrid.appendChild(startCard);
}

function photoSubmitHandler(evt) {
    evt.preventDefault();
    let link = linkInput.value;
    let place = placeInput.value;
    AddNewCard(link, place);
    toggleAddPopup();

}

function toggleEditPopup() {
    popupEdit.classList.toggle("popup_opened");
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;

}

function toggleAddPopup() {
    popupAdd.classList.toggle("popup_opened");
    placeInput.value = "";
    linkInput.value = "";

}

function togglePhotoPopup() {
    photoPopup.classList.toggle("popup_opened");
}

function toggleCardLiked(event) {
    event.target.classList.toggle("card_liked");
}

function profileFormSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    toggleEditPopup();
}

function delCard(event) {
    let startCard = event.target.closest('.card')
    startCard.remove()
}

function startCards() {
    initialCards.forEach(function (item) {
        AddNewCard(item.link, item.place);
    })
}

startCards()
formPhotoElement.addEventListener('submit', photoSubmitHandler)
formNameElement.addEventListener('submit', profileFormSubmitHandler);
profileEditButton.addEventListener('click', toggleEditPopup);
cardAddButton.addEventListener('click', toggleAddPopup);
popupNameCloseButton.addEventListener('click', toggleEditPopup);
popupPhotoCloseButton.addEventListener('click', togglePhotoPopup);
popupAddCloseButton.addEventListener('click', toggleAddPopup);