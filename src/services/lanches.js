class LancheService {
    constructor(LancheModel) {
        this.lancheModel = LancheModel
    }
    async cadastrarLanche(nomeLanche, descricao, preco, tipo, urlImagem, idLanchonete) {
        try {
            const lanche = await this.lancheModel.create({ nomeLanche, descricao, preco, tipo, urlImagem, idLanchonete })
            return lanche

        } catch (error) {
            throw error
        }
    }
    async buscaLanche(idLanche) {
        try {
            const lanche = await this.lancheModel.findByPk(idLanche)
            return lanche
        } catch (error) {
            console.error("Erro ao buscar lanchonetes:", error);
            throw error;
        }
    }
    async alterarLanche(idLanche, nomeLanche, descricao, preco, tipo, urlImagem) {
        try {
            const lanche = await this.buscaLanche(idLanche)

            lanche.nomeLanche = nomeLanche
            lanche.descricao = descricao
            lanche.preco = preco
            lanche.tipo = tipo
            lanche.urlImagem = urlImagem

            await lanche.save()
            return lanche
        } catch (error) {
            console.error("Erro ao atualizar lanche", error)
            throw error;
        }
    }
    async deleteLanche(idLanche) {
        try {
            const deletarLanche = await this.lancheModel.destroy({
                where: {
                    idLanche: idLanche
                }
            })
            return deletarLanche
        } catch (error) {
            
            console.error("Erro ao deletar lanche", error)
            throw error
        }
    }

    async listarLanchesDeLanchonete(idLanchonete) {
        try {
            const lanches = await this.lancheModel.findAll({
                where: { idLanchonete: idLanchonete},
                order: [['tipo', 'ASC']],
            })
            return lanches
        } catch (error) {
            console.error("Erro ao buscar lanches", error)
            throw error
        }
    }
}

module.exports = LancheService