export class UserInfo {
    constructor({nameSelector, jobSelector}, avatarSelector) {
        this._nameElem = document.querySelector(nameSelector);
        this._jobElem = document.querySelector(jobSelector);
        this._avatar = document.querySelector(avatarSelector);

    }

    getUserInfo() {
        const name = this._nameElem.textContent;
        const job = this._jobElem.textContent;
        return {name, job};
    }

    setUserInfo(newName, newJob) {
        this._nameElem.textContent = newName;
        this._jobElem.textContent = newJob;
    }

    setUserAvatar(newAvatar) {
        this._avatar.style.backgroundImage = `url('${newAvatar}')`;
    }

    setUserId(id) {
        this._userId = id;
    }

    getUserId() {
        return this._userId
    }
}