const { DataTypes } = require('sequelize')
const sequelize =  require('../config/db')
const LanchoneteModel = require('./lanchonete')

const LancheModel =  sequelize.define('Lanche', {
    idLanche: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nomeLanche: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    preco: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    tipo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    urlImagem: {
        type: DataTypes.STRING
    },
    idLanchonete: {
        type: DataTypes.INTEGER
    }
}, {
    tableName: 'lanches'
})

LancheModel.belongsTo(LanchoneteModel, {foreignKey: 'idLanchonete', as: 'lanchonete'})

async function verificarECriarTabela() {
    try {
        await sequelize.sync({ force: false }); // force: false evita a recriação da tabela se ela já existir
        console.log('Tabela "lanche" verificada e, se necessário, criada com sucesso.');
    } catch (error) {
        console.error('Erro ao verificar/criar a tabela "lanche":', error);
    }
}

verificarECriarTabela();

module.exports = LancheModel