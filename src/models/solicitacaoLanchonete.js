const { DataTypes, INTEGER } = require("sequelize");
const sequelize = require("../config/db");
//nomeUsuario, email, password, nomeLanchonete, cnpj,
//imagem, cep, logradouro, numero, bairro, cidade, estado
const SolicitacaoLanchoneteModel = sequelize.define('SolicitacaoLanchonete', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },

    },
    nomeLanchonete: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    cnpj: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true,
        }
    },
    imagem: {
        type: DataTypes.STRING,

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
            notEmpty: true,
        }
    },
    numero: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    bairro: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    cidade: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    estado: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    status: {
        type: DataTypes.ENUM('aguardando aprovação', 'aprovado', 'recusado'),
        allowNull: false,
        defaultValue: 'aguardando aprovação'
    }

}, {
    tableName: 'solicitacaoLanchonete'
})

async function verificarECriarTabela() {
    try {
        await sequelize.sync({ force: false, alter: true });
        console.log('Tabela "solicitacaoLanchonete" verificada e, se necessário, criada com sucesso.');
    } catch (error) {
        console.error('Erro ao verificar/criar a tabela "solicitacaoLanchonete":', error);
    }
}

verificarECriarTabela();

module.exports = SolicitacaoLanchoneteModel