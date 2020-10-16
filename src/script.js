import { AllCards } from './model/bancCard'
import { carsdView } from './view/viewCards'
import { BancCardController } from './controller/bancCardController'

let moduleCards = new AllCards
let cardView = new carsdView
let bancCardController = new BancCardController(moduleCards, cardView)

bancCardController.getAddDisplaiCard()
bancCardController.subscribeFormData()