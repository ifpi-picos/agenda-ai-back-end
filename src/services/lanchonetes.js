const EnderecoModel = require("../models/endereco");
const sequelize = require('../config/db')

class LanchoneteService {
    constructor(LanchoneteModel) {
        this.lanchoneteModel = LanchoneteModel;
    }

    async createLanchonete(nome, cnpj, cep, logradouro, numero, bairro, cidade, estado) {
        try {
            return await sequelize.transaction(async (t) => {
                const endereco = await EnderecoModel.create(
                    { cep, logradouro, numero, bairro, cidade, estado },
                    { transaction: t }
                );

                const lanchonete = await this.lanchoneteModel.create(
                    { nome, cnpj, idEndereco: endereco.idEndereco },
                    { transaction: t }
                );

                return { lanchonete, endereco };
            });
        } catch (error) {
            throw error;
        }
    }

    async selectLanchonetes() {
        try {
            const lanchonetes = await this.lanchoneteModel.findAll({
                attributes: ['id', 'nome'],
                include: [
                    {
                        model: EnderecoModel,
                        as: 'endereco',
                        attributes: ['cep', 'logradouro', 'numero', 'bairro', 'cidade', 'estado'],
                    },
                ],
            })

            const lanchonetesFormatadas = lanchonetes.map((lanchonete) => {
                const endereco = lanchonete.endereco;
                const enderecoFormatado = `${endereco.logradouro}, ${endereco.numero} - ${endereco.bairro}, ${endereco.cidade}`;

                // Retorna um objeto com os atributos desejados
                return {
                    id: lanchonete.id,
                    nome: lanchonete.nome,
                    endereco: enderecoFormatado,
                };
            });

            return lanchonetesFormatadas;
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