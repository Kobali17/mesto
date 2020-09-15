import {FormValidator} from "../../components/FormValidator.js";
import {Card} from "../../components/Card.js";
import {Section} from "../../components/Section.js";
import {PopupWithImage} from "../../components/PopupWithImage.js";
import {UserInfo} from "../../components/UserInfo.js";
import {PopupWithForm} from "../../components/PopupWithForm.js";
import './index.css';
import {
    cardAddButton,
    formNameElement,
    formPhotoElement,
    jobInput,
    nameInput,
    openAddPopupButton,
    openEditPopupButton,
    profileEditButton,
    selectorDict
} from "../utils/constants.js";

let section;

fetch('https://mesto.nomoreparties.co/v1/cohort-15/cards', {
    headers: {
        authorization: '01a4a2a9-bf87-4e89-95fb-cc046e118ab5'
    }
})
    .then(res => res.json())
    .then((result) => {
        section = new Section({items: result, renderer: addNewCard}, '.photo-grid');
        section.renderItems();
    });

const userInfo = new UserInfo({nameSelector: '.profile__name', jobSelector: '.profile__job'});
const imagePopup = new PopupWithImage('.popup-photo');

fetch('https://mesto.nomoreparties.co/v1/cohort-15/users/me', {
    headers: {
        authorization: '01a4a2a9-bf87-4e89-95fb-cc046e118ab5'
    }
})
    .then(res => res.json())
    .then((result) => {
        userInfo.setUserInfo(result.name, result.about)
    });


const addNewCard = (item) => {
    const card = new Card(item, '#card', openPhotoPopup);
    return card.createCard(open);
}

const profileFormSubmitHandler = (values) => {
    fetch('https://mesto.nomoreparties.co/v1/cohort-15/users/me', {
        method: 'PATCH',
        headers: {
            authorization: '01a4a2a9-bf87-4e89-95fb-cc046e118ab5',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: values.name,
            about: values.job
        })
    }).then(res => res.json())
        .then((res) => userInfo.setUserInfo(res.name, res.about));
}

const profileAddSubmitHandler = (values) => {
    fetch('https://mesto.nomoreparties.co/v1/cohort-15/cards', {
        method: 'POST',
        headers: {
            authorization: '01a4a2a9-bf87-4e89-95fb-cc046e118ab5',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: values.place,
            link: values.link
        })
    }).then(res => res.json())
        .then(res => section.addItem(addNewCard({link:res.link,name:res.name})))
        .catch(res=>console.log(res));
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








