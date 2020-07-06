let popupButton = document.querySelector(".profile__edit-button");
let popupClose = document.querySelector('.popup__close-button');
let nameInput = document.querySelector('.popup__input-name');
let jobInput = document.querySelector('.popup__input-job');


function popupClicked() {
    let popup = document.querySelector('.popup');
    popup.classList.toggle("popup__opened");
    nameInput.value = document.querySelector('.profile__name').textContent;
    jobInput.value = document.querySelector('.profile__job').textContent;

}

popupButton.addEventListener('click', popupClicked);
popupClose.addEventListener('click', popupClicked);


let formElement = document.querySelector('.popup__form');


function formSubmitHandler(evt) {
    evt.preventDefault();
    document.querySelector('.profile__name').textContent = nameInput.value;
    document.querySelector('.profile__job').textContent = jobInput.value;
    popupClicked();

}


formElement.addEventListener('submit', formSubmitHandler);