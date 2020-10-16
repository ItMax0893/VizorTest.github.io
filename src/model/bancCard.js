import {GenerateID} from '../shared/generateID';
import {Storage} from '../infrastructure/storage';

let storage = new Storage('bankCards')
let generate = new GenerateID('CARD_ID_')

export class AllCards {
    getAllCards() {
        let allCards = storage.getCardInStorage()
        return allCards || []
    }
    getCardById(id) {
        let cardById = this.allCards().filter(el => el.id === id ? el : null)
        return cardById
    }
    seveCard(data) {
        let allCards = this.getAllCards()
        storage.save(allCards.concat({
            ...data,
            id: generate.getRandomId()
        }))
    }
    deleteCardById(id) {
        let allCards = this.getAllCards()
        storage.save(allCards.filter(el => el.id !== id))
    }
}