export class Storage {
    constructor(key) {
        this._key = key
    }
    save(data) {
        window.localStorage.setItem(this._key, JSON.stringify(data))
    }
    getCardInStorage() {
        let dataJson = window.localStorage[this._key]
        return dataJson ? JSON.parse(window.localStorage[this._key]) : null
    }
    
}
