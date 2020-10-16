export class BancCardController {
    constructor(modul, view) {
        this._modul = modul
        this._veiw = view
    }
    getAddDisplaiCard() {
        let allCards = this._modul.getAllCards()
        this._veiw.renderCardsList(allCards, this.deleteCard.bind(this))
    }
    createCard(cardData) {

        let visaRegEx = /^4[0-9]{12}(?:[0-9]{3})?$/
        let masterRegEx = /^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/
        if (masterRegEx.test(cardData.cardNumber) === true || visaRegEx.test(cardData.cardNumber) === true) {
            this._modul.seveCard(cardData)
            this.getAddDisplaiCard()
        } else {
            alert('не верный номер карты')
        }
    }
    deleteCard(cardID) {
        this._modul.deleteCardById(cardID)
        this.getAddDisplaiCard()
    }
    subscribeFormData() {
        let cardForm = document.getElementById('bankCardForm')
        cardForm.addEventListener('submit', (event) => {
            event.preventDefault();
            this.createCard({
                cardNumber: cardForm.cardNumber.value,
                cardNote: cardForm.cardNote.value
            })
            cardForm.reset()
        })
    }
}