import {FormValidator} from "../../components/FormValidator.js";
import {Card} from "../../components/Card.js";
import {Section} from "../../components/Section.js";
import {PopupWithImage} from "../../components/PopupWithImage.js";
import {UserInfo} from "../../components/UserInfo.js";
import {PopupWithForm} from "../../components/PopupWithForm.js";
import './index.css';
import {
    cardAddButton,
    cards,
    formNameElement,
    formPhotoElement,
    jobInput,
    nameInput,
    openAddPopupButton,
    openEditPopupButton,
    profileEditButton,
    selectorDict
} from "../utils/constants.js";

const userInfo = new UserInfo({nameSelector: '.profile__name', jobSelector: '.profile__job'});
const imagePopup = new PopupWithImage('.popup-photo');


const addNewCard = (item) => {
    const card = new Card(item, '#card', openPhotoPopup);
    return card.createCard(open);
}

const profileFormSubmitHandler = (values) => {
    userInfo.setUserInfo(values.name, values.job);
}

const profileAddSubmitHandler = (values) => {
    const link = values.link;
    const place = values.place;
    section.addItem(addNewCard({link, place}))
}

const openPhotoPopup = (item) => {
    imagePopup.open(item)
}

const openEditPopup = () => {
    const userData = userInfo.getUserInfo()
    nameInput.value = userData.name;
    jobInput.value = userData.job;
    editPopup.open()
}

const openAddPopup = () => {
    photoPopup.open()
}
const editPopup = new PopupWithForm(profileFormSubmitHandler, '#edit');
const photoPopup = new PopupWithForm(profileAddSubmitHandler, '#photo-add');

imagePopup.setEventListeners()
photoPopup.setEventListeners()
editPopup.setEventListeners()

openEditPopupButton.addEventListener('click', openEditPopup);
openAddPopupButton.addEventListener('click', openAddPopup);

new FormValidator(selectorDict, formNameElement).enableValidation(profileEditButton)
new FormValidator(selectorDict, formPhotoElement).enableValidation(cardAddButton);
const section = new Section({items: cards, renderer: addNewCard}, '.photo-grid');
section.renderItems();