const CardapioModel = require("../models/cardapio");

class CardapioService {
    constructor(CardapioModel) {
        this.cardapioModel = CardapioModel;
    }

    async adicionarCardapio(dia, idLanchonete) {
        console.log(dia, idLanchonete)
        try {
            const cardapio = await this.cardapioModel.create({dia, idLanchonete})
            return cardapio
        } catch (error) {
            throw error
        }
    }
    async buscaCardapio(idCardapio) {
        try {
            const cardapio = this.cardapioModel.findByPk(idCardapio)
            return cardapio
        } catch (error) {
            throw error
        }
    }
}



module.exports = CardapioService