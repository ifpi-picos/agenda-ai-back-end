const { DataTypes } = require('sequelize')
const sequelize = require('../config/db')

const EnderecoModel = sequelize.define('Endereco', {
    idEndereco: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    cep: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    logradouro: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    numero: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    bairro: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    cidade: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    estado: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
}, {
    tableName: 'endereco'
})

async function verificarECriarTabela() {
    try {
        await sequelize.sync({ force: false });
        console.log('Tabela "endereco" verificada e, se necessário, criada com sucesso.');
    } catch (error) {
        console.error('Erro ao verificar/criar a tabela "endereco":', error);
    }
}

verificarECriarTabela();


module.exports = EnderecoModel