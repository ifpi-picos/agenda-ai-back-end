const { DataTypes } = require('sequelize')
const sequelize =  require('../config/db')
const LancheModel = require('./lanche')
const LanchoneteModel = require('./lanchonete')

const CardapioModel = sequelize.define('Cardapio', {
    idCardapio: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    dia: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    idLanchonete: {
        type: DataTypes.INTEGER
    },
}, {
    tableName: 'cardapios'
})

CardapioModel.belongsTo(LanchoneteModel, {foreignKey: 'idLanchonete', as: 'lanchonetes'})

async function verificarECriarTabela() {
    try {
        await sequelize.sync({ force: false });
    } catch (error) {
        console.error('Erro ao verificar/criar a tabela "cardapios":', error);
    }
}

verificarECriarTabela()

module.exports = CardapioModel