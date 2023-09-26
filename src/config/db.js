const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(process.env.PG_BANCO, process.env.PG_USUARIO, process.env.PG_SENHA, {
    host: process.env.PG_HOST,
    dialect: 'postgres',
    port: 5432,
})

module.exports = sequelize