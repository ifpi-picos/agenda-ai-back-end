const EnderecoModel = require("../models/endereco");
const sequelize = require('../config/db')

const AuthService = require('../services/auth')
const UserModel = require('../models/user')

const authService = new AuthService(UserModel)
class LanchoneteService {
    constructor(LanchoneteModel) {
        this.lanchoneteModel = LanchoneteModel;
    }

    async createLanchonete(nomeUsuario, email, password, nomeLanchonete, cnpj, cep, logradouro, numero, bairro, cidade, estado) {
        const tipo = 'gerente'
        try {
            return await sequelize.transaction(async (t) => {
                const user = await authService.signUp(
                    {nomeUsuario, email, password, tipo}
                )
                const endereco = await EnderecoModel.create(
                    { cep, logradouro, numero, bairro, cidade, estado },
                    { transaction: t }
                );

                const lanchonete = await this.lanchoneteModel.create(
                    { nomeLanchonete, cnpj, idUsuario: user.idUsuario, idEndereco: endereco.idEndereco },
                    { transaction: t }
                );

                return { lanchonete, endereco, user };
            });
        } catch (error) {
            throw error;
        }
    }

    async selectLanchonetes() {
        try {
            const lanchonetes = await this.lanchoneteModel.findAll({
                attributes: ['id', 'nomeLanchonete'],
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
                    nomeLanchonete: lanchonete.nomeLanchonete,
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