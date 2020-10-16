(function () {
    'use strict';

    class GenerateID {
        constructor(prefix = '') {
            this._prefix = prefix;
        }
        _randomId() {
            return Math.random().toString().substr(5, 10)
        }
        getRandomId() {
            return `${this._prefix}${this._randomId()}`
        }
    }

    class Storage {
        constructor(key) {
            this._key = key;
        }
        save(data) {
            window.localStorage.setItem(this._key, JSON.stringify(data));
        }
        getCardInStorage() {
            let dataJson = window.localStorage[this._key];
            return dataJson ? JSON.parse(window.localStorage[this._key]) : null
        }
        remuveCardInStorage() {
            window.localStorage.removeItem(this._key);
        }
    }

    let storage = new Storage('bankCards');
    let generate = new GenerateID('CARD_ID_');

    class AllCards {
        getAllCards() {
            let allCards = storage.getCardInStorage();
            return allCards || []
        }
        getCardById(id) {
            let cardById = this.allCards().filter(el => el.id === id ? el : null);
            return cardById
        }
        seveCard(data) {
            let allCards = this.getAllCards();
            storage.save(allCards.concat({
                ...data,
                id: generate.getRandomId()
            }));
        }
        deleteCardById(id) {
            let allCards = this.getAllCards();
            storage.save(allCards.filter(el => el.id !== id));
        }
    }

    class carsdView {

        createCard(cardData) {
            let cardElement = document.createElement('div');
            cardElement.setAttribute('id', cardData.id);
            cardElement.className = 'card';
            let setImg = (cardNumber) => {

                if (cardNumber[0] == 5) {
                    return 'assets/img/icon/master-card-colored.svg'
                }
                if (cardNumber[0] == 4) {
                    return 'assets/img/icon/visa-colored.svg'
                }
            };

            cardElement.innerHTML = `
         <img class = "card_logo" src = ${setImg(cardData.cardNumber)} alt = "card"/>
            <div class = "card_info_block" >
             <p class = "card_info_block_num" > ${cardData.cardNumber}</p>  
             <p class = "card_info_block_com" > ${cardData.cardNote} </p>
            </div >
             <div class = "card_monip" >
                <img src = "assets/img/icon/delete.svg" class = "card_monip_img card_monip_del" alt = "dellete" data-card_id = "${cardData.id}"/>
             </div>`;
            return cardElement
        }

        renderCardsList(allCards = [], deleteCard) {
            let content;
            if (allCards.length) {
                content = document.createElement('div');
                content.className = 'cards';

                allCards.forEach(el => {
                    content.appendChild(this.createCard(el));
                });
                content.addEventListener('click', event => {
                    let target = event.target;
                    let cardId = target.dataset.card_id;
                    if (cardId && confirm('Удалить эту карту?')) {
                        deleteCard(cardId);
                    }
                });
            } else {
                content = document.createElement('div');
                content.className = 'cards';
                content.innerHTML = '<p>У Вас пока нет сохраненных карт</p>';
            }
            let cardsContainer = document.querySelector('.cardsContainer');
            cardsContainer.innerHTML = '';
            cardsContainer.appendChild(content);
        }

    }

    class BancCardController {
        constructor(modul, view) {
            this._modul = modul;
            this._veiw = view;
        }
        getAddDisplaiCard() {
            let allCards = this._modul.getAllCards();
            this._veiw.renderCardsList(allCards, this.deleteCard.bind(this));
        }
        createCard(cardData) {

            let visaRegEx = /^4[0-9]{12}(?:[0-9]{3})?$/;
            let masterRegEx = /^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/;
            if (masterRegEx.test(cardData.cardNumber) === true || visaRegEx.test(cardData.cardNumber) === true) {
                this._modul.seveCard(cardData);
                this.getAddDisplaiCard();
            } else {
                alert('не верный номер карты');
            }
        }
        deleteCard(cardID) {
            this._modul.deleteCardById(cardID);
            this.getAddDisplaiCard();
        }
        subscribeFormData() {
            let cardForm = document.getElementById('bankCardForm');
            cardForm.addEventListener('submit', (event) => {
                event.preventDefault();
                this.createCard({
                    cardNumber: cardForm.cardNumber.value,
                    cardNote: cardForm.cardNote.value
                });
                cardForm.reset();
            });
        }
    }

    let moduleCards = new AllCards;
    let cardView = new carsdView;
    let bancCardController = new BancCardController(moduleCards, cardView);

    bancCardController.getAddDisplaiCard();
    bancCardController.subscribeFormData();

}());
