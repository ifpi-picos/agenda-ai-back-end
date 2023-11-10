const express = require('express')
const router = express.Router()

const lanchoneteRoutes = require('./lanchonetes');
const authRoutes = require('./auth')
const lancheRoutes = require('./lanches')
const horarioRoutes = require('./horarioFuncionamento')
const cardapioRoutes = require('./cardapios')
const itensCardapioRoutes = require('./itensCardapio')

router.use('/lanchonetes', lanchoneteRoutes, horarioRoutes);
router.use('/auth', authRoutes)
router.use('/lanche', lancheRoutes)
router.use('/cardapio', cardapioRoutes, itensCardapioRoutes)


module.exports = router