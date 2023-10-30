class CardapioService {
    constructor(CardapioModel) {
        this.cardapioModel = CardapioModel;
    }

    async adicionarCardapio(dia, idLanchonete) {
        console.log(dia, idLanchonete)
        try {
            const cardapio = await this.cardapioModel.create({dia, idLanchonete})
            
    console.log(cardapio)
            return cardapio
        } catch (error) {
            throw error
        }
    }
}



module.exports = CardapioService