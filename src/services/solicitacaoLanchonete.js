const SolicitacaoLanchoneteModel = require("../models/solicitacaoLanchonete")

class SolicitacaoLanchoneteService {
    constructor(SolicitacaoLanchoneteModel) {
        this.solicitacaoLanchoneteModel = SolicitacaoLanchoneteModel
    }

    async criarSolicitacaoLanchonete(solicitacaoData) {
        try {
            const novaSolicitacao =  await SolicitacaoLanchoneteModel.create(solicitacaoData);
            return novaSolicitacao;
        } catch (error) {
            throw new Error('Erro ao criar solicitação de lanchonete: ' + error.message)
        }
    }

    async listarSolicitacoes() {
        try {
            const solicitacoes = await this.solicitacaoLanchoneteModel.findAll()
            return solicitacoes;
        } catch (error) {
            console.error("Erro ao buscar solicitacoes", error)
            throw error
        }
    }
}

module.exports = SolicitacaoLanchoneteService;