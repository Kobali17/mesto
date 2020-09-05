export class UserInfo {
    constructor({nameSelector, jobSelector}) {
        this._nameElem = document.querySelector(nameSelector);
        this._jobElem = document.querySelector(jobSelector);
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
}