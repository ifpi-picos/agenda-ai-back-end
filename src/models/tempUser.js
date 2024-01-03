const { DataTypes } = require('sequelize')
const sequelize = require('../config/db')

const UserModel = sequelize.define('TempUser', {
    cod: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
}, {
    tableName: 'tempUsers',
    hooks: {
        beforeCreate: (user) => {
            user.cod = Math.floor(100000 + Math.random() * 900000);
            const tempoExpiracao = 60 * 60 * 1000; // 1 hora
            setTimeout(() => {
                UserModel.destroy({
                    where: {
                        cod: user.cod,
                    },
                });
                console.log(`Registro com cod ${user.cod} foi excluído após o tempo de expiração.`);
            }, tempoExpiracao);
        },
    },
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