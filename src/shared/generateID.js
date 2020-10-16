export class GenerateID {
    constructor(prefix = '') {
        this._prefix = prefix
    }
    _randomId() {
        return Math.random().toString().substr(5, 10)
    }
    getRandomId() {
        return `${this._prefix}${this._randomId()}`
    }
}

