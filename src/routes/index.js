const express = require('express')
const router = express.Router()

const lanchoneteRoutes = require('./lanchonetes');
const authRoutes = require('./auth')
const lancheRoutes = require('./lanches')

router.use('/lanchonetes', lanchoneteRoutes);
router.use('/auth', authRoutes)
router.use('/lanche', lancheRoutes)

module.exports = router