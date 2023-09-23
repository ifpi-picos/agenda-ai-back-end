class LanchoneteService {
    constructor(LanchoneteModel) {
        this.lanchoneteModel = LanchoneteModel;
    }

    async createLanchonete(nome, cnpj, idEndereco) {
        try {
            const lanchonete = await this.lanchoneteModel.create({nome: nome, cnpj: cnpj, idEndereco: idEndereco})
            return lanchonete
        } catch (error) {

        }
    }

    async selectLanchonetes() {
        try {
            const lanchonetes = await this.lanchoneteModel.findAll()

            return lanchonetes;
        } catch (error) {
            console.error("Erro ao buscar lanchonetes:", error);
            throw error;
        }
    }

    async buscaLanchonete(lanchoneteId) {
        try {
            const lanchonete = await this.lanchoneteModel.findByPk(lanchoneteId)

            /*if(!lanchonete) {
                console.log('lanchonete não encontrada')
                return
            }*/

            return lanchonete;
        } catch (error) {
            console.error("Erro ao buscar lanchonetes:", error);
            throw error;
        }
    }

    async deleteLanchonete(lanchoneteId) {
        try {
            const deletarLanchonete = await this.lanchoneteModel.destroy({
                where: {
                    id: lanchoneteId
                }
            })
            return deletarLanchonete
        } catch (error) {
            console.error("Erro ao deletar lanchonete", error)
            throw error
        }
    }
}

module.exports = LanchoneteService;