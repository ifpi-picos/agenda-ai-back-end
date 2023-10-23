const { DataTypes } = require('sequelize')
const sequelize = require('../config/db');

const HorarioFuncionamentoModel = sequelize.define('HorarioFuncionamento', {
    idHorario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    diaSemana: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    horaAbertura: {
        type: DataTypes.TIME,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    horaFechamento: {
        type: DataTypes.TIME,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
});

async function verificarECriarTabela() {
    try {
        await sequelize.sync({ force: false }); // force: false evita a recriação da tabela se ela já existir
        console.log('Tabela "horarioFuncionamento" verificada e, se necessário, criada com sucesso.');
    } catch (error) {
        console.error('Erro ao verificar/criar a tabela "horarioFuncionamento":', error);
    }
}

verificarECriarTabela();


module.exports = HorarioFuncionamentoModel
