const { DataTypes } = require('sequelize')
const sequelize = require('../config/db')

const UserModel = sequelize.define('User', {
    idUsuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nomeUsuario: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true
        }
    },
    password: {
        type: DataTypes.STRING,
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
    }
}, {
    tableName: 'users'
})

async function verificarECriarTabela() {
    try {
        await sequelize.sync({ force: false }); // force: false evita a recriação da tabela se ela já existir
        console.log('Tabela "users" verificada e, se necessário, criada com sucesso.');
    } catch (error) {
        console.error('Erro ao verificar/criar a tabela "users":', error);
    }
}

verificarECriarTabela();

module.exports = UserModel