const EnderecoModel = require("../models/endereco");
const sequelize = require('../config/db')
const bcrypt = require('bcrypt')

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
                password = bcrypt.hashSync(password, 10)
                const user = await UserModel.create(
                    {nomeUsuario, email, password, tipo},
                    { transaction: t}
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
            const lanchonete = await this.lanchoneteModel.findByPk(lanchoneteId, {
                include: [
                    {
                        model: EnderecoModel,
                        as: 'endereco',
                        attributes: ['cep', 'logradouro', 'numero', 'bairro', 'cidade', 'estado'],
                    },
                ],
            })

            if(!lanchonete) {
                console.log('lanchonete não encontrada')
                return
            }

            return lanchonete;
        } catch (error) {
            console.error("Erro ao buscar lanchonetes:", error);
            throw error;
        }
    }

    async buscaIdLanchonete(idUsuario) {
        try {
            const lanchonete = await this.lanchoneteModel.findOne({
                where: {
                    idUsuario: idUsuario
                }
            })
            if (lanchonete) {
                return lanchonete.id
            } else {
                return null
            }
        } catch (error) {
            
        }
    }

    async alterarLanchonete(lanchoneteId, nomeLanchonete, cnpj, cep, logradouro, numero, bairro, cidade, estado) {
        try {
            const lanchonete = await this.buscaLanchonete(lanchoneteId)

            lanchonete.nomeLanchonete = nomeLanchonete
            lanchonete.cnpj = cnpj
            lanchonete.endereco.cep = cep
            lanchonete.endereco.logradouro = logradouro
            lanchonete.endereco.numero = numero
            lanchonete.endereco.bairro = bairro
            lanchonete.endereco.cidade = cidade
            lanchonete.endereco.estado = estado

            await lanchonete.save()
    
            return lanchonete;
        } catch (error) {
          console.error("Erro ao atualizar lanchonete:", error);
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