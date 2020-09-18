import {FormValidator} from "../../components/FormValidator.js";
import {Card} from "../../components/Card.js";
import {Section} from "../../components/Section.js";
import {PopupWithImage} from "../../components/PopupWithImage.js";
import {UserInfo} from "../../components/UserInfo.js";
import {PopupWithForm} from "../../components/PopupWithForm.js";
import {Api} from "../../components/Api";
import './index.css';
import {
    formAvatarElement,
    formNameElement,
    formPhotoElement,
    jobInput,
    nameInput,
    openAddPopupButton,
    openAvatarEditButton,
    openEditPopupButton,
    selectorDict,
} from "../utils/constants.js";
import {PopupWithSubmit} from "../../components/PopupWithSubmit";

let section
const userInfo = new UserInfo({nameSelector: '.profile__name', jobSelector: '.profile__job'}, '.profile__avatar');
const imagePopup = new PopupWithImage('.popup-photo');
const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-15',
    headers: {
        authorization: '01a4a2a9-bf87-4e89-95fb-cc046e118ab5',
        'Content-Type': 'application/json'
    }
})

const addNewCard = (result) => {
    const card = new Card({
        data: result,
        liked: result.likes.some((user) => user._id === userInfo.getUserId()),
        owned: result.owner._id === userInfo.getUserId(),
        handleCardClick,
        handleLikeClick,
        handleDelClick
    }, '#card',)
    return card.createCard(open);
}

const handleLikeClick = (card) => {
    const handleLikeResponse = (res) => {
        card.likeCounter(res.likes, res.likes.some((user) => user._id === userInfo.getUserId()))
    }
    if (!card.getCardLiked()) {
        api.takeCardLike(card.getCardId()).then(handleLikeResponse)
    } else {
        api.delCardLke(card.getCardId()).then(handleLikeResponse)
    }
}

const handleCardClick = (result) => {
    imagePopup.open(result)
}

const handleDelClick = (card) => {
    delPopup.setCallback(() => {
        delSubmitHandler(card)
    })
    delPopup.open()
}

const profileFormSubmitHandler = (values) => {
    editPopup.renderLoading(true)
    api.patchUserData(values).then((result) => {
        userInfo.setUserInfo(result.name, result.about)
        editPopup.renderLoading(false)
    })
}

const avatarSubmitHandler = (values) => {
    avatarPopup.renderLoading(true)
    api.patchUserAvatar(values).then((res) => {
        userInfo.setUserAvatar(res.avatar)
        avatarPopup.renderLoading(false)
    })
}

const profileAddSubmitHandler = (values) => {
    photoPopup.renderLoading(true)
    api.addUserCard(values).then(res => section.addItem(addNewCard(res)))
    photoPopup.renderLoading(false)
}

const delSubmitHandler = (card) => {
    api.delCard(card.getCardId()).then(() => card.delCard())
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

const openAvatarPopup = () => {
    avatarPopup.open()
}

const loadCards = () => {
    api.getInitialCards().then((result) => {
        section = new Section({items: result, renderer: addNewCard}, '.photo-grid');
        section.renderItems();
    });
}

const loadUser = () => {
    return api.getUserData().then((result) => {
        userInfo.setUserInfo(result.name, result.about)
        userInfo.setUserAvatar(result.avatar)
        userInfo.setUserId(result._id)
    });
}

const editPopup = new PopupWithForm(profileFormSubmitHandler, '#edit');
const photoPopup = new PopupWithForm(profileAddSubmitHandler, '#photo-add');
const avatarPopup = new PopupWithForm(avatarSubmitHandler, '#avatar-popup');
const delPopup = new PopupWithSubmit('#del-popup');

imagePopup.setEventListeners()
photoPopup.setEventListeners()
editPopup.setEventListeners()
avatarPopup.setEventListeners()
delPopup.setEventListeners()

openEditPopupButton.addEventListener('click', openEditPopup);
openAddPopupButton.addEventListener('click', openAddPopup);
openAvatarEditButton.addEventListener('click', openAvatarPopup);

new FormValidator(selectorDict, formNameElement).enableValidation(openEditPopupButton);
new FormValidator(selectorDict, formPhotoElement).enableValidation(openAddPopupButton);
new FormValidator(selectorDict, formAvatarElement).enableValidation(openAvatarEditButton);

loadUser().then(loadCards)





