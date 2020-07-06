let popupButton = document.querySelector(".profile__edit-button");
let popupClose = document.querySelector('.popup__close-button');
let nameInput = document.querySelector('.popup__input-name');
let jobInput = document.querySelector('.popup__input-job');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');
let formElement = document.querySelector('.popup__form');


function togglePopup() {
    let popup = document.querySelector('.popup');
    popup.classList.toggle("popup__opened");
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