
export class carsdView {

    createCard(cardData) {
        let cardElement = document.createElement('div')
        cardElement.setAttribute('id', cardData.id)
        cardElement.className = 'card'
        let setImg = (cardNumber) => {

            if (cardNumber[0] == 5) {
                return '/assets/img/icon/master-card-colored.svg'
            }
            if (cardNumber[0] == 4) {
                return '/assets/img/icon/visa-colored.svg'
            }
        }

        cardElement.innerHTML = `
         <img class = "card_logo" src = ${setImg(cardData.cardNumber)} alt = "card"/>
            <div class = "card_info_block" >
             <p class = "card_info_block_num" > ${cardData.cardNumber}</p>  
             <p class = "card_info_block_com" > ${cardData.cardNote} </p>
            </div >
             <div class = "card_monip" >
                <img src = "/assets/img/icon/delete.svg" class = "card_monip_img card_monip_del" alt = "dellete" data-card_id = "${cardData.id}"/>
             </div>`
        return cardElement
    }

    renderCardsList(allCards = [], deleteCard) {
        let content;
        if (allCards.length) {
            content = document.createElement('div')
            content.className = 'cards'

            allCards.forEach(el => {
                content.appendChild(this.createCard(el))
            })
            content.addEventListener('click', event => {
                let target = event.target;
                let cardId = target.dataset.card_id;
                if (cardId && confirm('Удалить эту карту?')) {
                    deleteCard(cardId)
                }
            })
        } else {
            content = document.createElement('div')
            content.className = 'cards'
            content.innerHTML = '<p>У Вас пока нет сохраненных карт</p>'
        }
        let cardsContainer = document.querySelector('.cardsContainer')
        cardsContainer.innerHTML = ''
        cardsContainer.appendChild(content)
    }

}
