let popupButton = document.querySelector(".profile__edit-button");
let popupClose = document.querySelector('.popup__close-button');
let nameInput = document.querySelector('#name');
let jobInput = document.querySelector('#job');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');
let formElement = document.querySelector('.popup__form');
let popup = document.querySelector('.popup');

function togglePopup() {
    popup.classList.toggle("popup_opened");
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;

}

function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    togglePopup();

}


formElement.addEventListener('submit', formSubmitHandler);
popupButton.addEventListener('click', togglePopup);
popupClose.addEventListener('click', togglePopup);