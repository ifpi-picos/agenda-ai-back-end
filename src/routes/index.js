const express = require('express')
const router = express.Router()

const lanchoneteRoutes = require('./lanchonetes');
const authRoutes = require('./auth')
const lancheRoutes = require('./lanches')
const horarioRoutes = require('./horarioFuncionamento')
const cardapioRoutes = require('./cardapios')

router.use('/lanchonetes', lanchoneteRoutes);
router.use('/auth', authRoutes)
router.use('/lanche', lancheRoutes)
router.use('/horario', horarioRoutes)
router.use('/cardapio', cardapioRoutes)

module.exports = router