import {FormValidator} from "../components/FormValidator.js";
import {Card} from "../components/Card.js";
import {Section} from "../components/Section.js";
import {PopupWithImage} from "../components/PopupWithImage.js";
import {UserInfo} from "../components/UserInfo.js";
import {PopupWithForm} from "../components/PopupWithForm.js";
import {
    cardAddButton,
    cards,
    formNameElement,
    formPhotoElement,
    jobInput,
    linkInput,
    nameInput,
    openAddPopupButton,
    openEditPopupButton,
    placeInput,
    profileEditButton,
    profileJob,
    profileName,
    selectorDict
} from "../components/constants.js";


const userInfo = new UserInfo({nameSelector: '.profile__name', jobSelector: '.profile__job'})

const addNewCard = (item) => {
    const card = new Card(item, '#card', openPhotoPopup);
    const cardElement = card.createCard(open);
    document.querySelector('.photo-grid').prepend(cardElement);
}

const profileFormSubmitHandler = (evt) => {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;

}
const profileAddSubmitHandler = (evt) => {
    evt.preventDefault();
    const link = linkInput.value;
    const place = placeInput.value;
    addNewCard({link, place});
}
const cardSection = () => {
    new Section({items: cards, renderer: addNewCard}, '.photo-grid').renderItems();

}

const openPhotoPopup = (item) => {
    const popup = new PopupWithImage(item, '.popup-photo');
    popup.open()
    popup.setEventListeners()

}
const openEditPopup = () => {
    const popup = new PopupWithForm(profileFormSubmitHandler, '#edit')
    const userData = userInfo.getUserInfo()
    nameInput.value = userData.name;
    jobInput.value = userData.job;
    popup.open()
    popup.setEventListeners()

}
const openAddPopup = () => {
    const popup = new PopupWithForm(profileAddSubmitHandler, '#photo-add')
    popup.open()
    popup.setEventListeners()
}


openEditPopupButton.addEventListener('click', openEditPopup);
openAddPopupButton.addEventListener('click', openAddPopup);

new FormValidator(selectorDict, formNameElement).enableValidation(profileEditButton)
new FormValidator(selectorDict, formPhotoElement).enableValidation(cardAddButton);

cardSection()
