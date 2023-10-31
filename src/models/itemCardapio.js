const { DataTypes } =require('sequelize')
const sequelize = require('../config/db')
const CardapioModel = require('./cardapio')
const LancheModel = require('./lanche')

const ItensCardapioModel = sequelize.define('ItemCardapio', {
    idItemCardapio: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idLanche: {
        type: DataTypes.INTEGER
    },
    idCardapio: {
        type: DataTypes.INTEGER
    }
}, {
    tableName: 'itensCardapio'
})

ItensCardapioModel.belongsTo(CardapioModel, {foreignKey: 'idCardapio', as: 'cardapios'})
ItensCardapioModel.belongsTo(LancheModel, {foreignKey: 'idLanche', as: 'lanches'})

async function verificarECriarTabela() {
    try {
        await sequelize.sync({ force: false });
    } catch (error) {
        console.error('Erro ao verificar/criar a tabela "itensCardapio":', error);
    }
}

verificarECriarTabela()

module.exports = ItensCardapioModel