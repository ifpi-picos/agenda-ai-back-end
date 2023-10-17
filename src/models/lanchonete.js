const { DataTypes } = require('sequelize')
const sequelize = require('../config/db');
const EnderecoModel = require('./endereco');
const UserModel = require('./user');


const LanchoneteModel = sequelize.define('Lanchonete', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    nomeLanchonete: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    cnpj: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true
        }
    },
    idUsuario: {
        type: DataTypes.INTEGER
    },
    idEndereco: {
        type: DataTypes.INTEGER
      },
}, {
    tableName: 'lanchonetes'
})

LanchoneteModel.belongsTo(EnderecoModel, { foreignKey: 'idEndereco', as: 'endereco' })
LanchoneteModel.belongsTo(UserModel, { foreignKey: 'idUsuario', as: 'user' })

async function verificarECriarTabela() {
    try {
        await sequelize.sync({ force: false }); // force: false evita a recriação da tabela se ela já existir
        console.log('Tabela "lanchonetes" verificada e, se necessário, criada com sucesso.');
    } catch (error) {
        console.error('Erro ao verificar/criar a tabela "lanchonetes":', error);
    }
}

//verificarECriarTabela();

module.exports = LanchoneteModel