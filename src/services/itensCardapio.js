class ItemCardapioService {
    constructor(ItemCardapioModel) {
        this.itemCardapioModel = ItemCardapioModel
    }

    async adicionarItem(idLanche, idCardapio) {
        try {
            const item = await this.itemCardapioModel.create({idLanche, idCardapio})
            return item
        } catch (error) {
            throw error
        }
    }

    async buscarItem(idItemCardapio) {
        try {
            const item = await this.itemCardapioModel.findByPk(idItemCardapio)
            return item
        } catch (error) {
            throw error
        }
    }

    async retirarItem(idItemCardapio) {
        try {
            return await this.itemCardapioModel.destroy({
                where: {
                    idItemCardapio: idItemCardapio
                }
            })
        } catch (error) {
            throw error
        }
    }
} 

module.exports = ItemCardapioService