const express = require('express')
const router = express.Router()

const CardapioModel = require('../models/cardapio')
const CardapioService = require('../services/cardapios')

const cardapioService = new CardapioService(CardapioModel)

router.post('/adicionar', async (req, res) => {
    const {dia, idLanchonete} = req.body
    console.log(idLanchonete)

    try {
        const result = await cardapioService.adicionarCardapio(dia, idLanchonete)
        res.status(201).json({ message: 'Cardapio adicionado com sucesso', result})
    } catch (error) {
        res.status(500).json({error: 'Erro ao adicionar cardápio', message: error.message})
    }
})

module.exports =  router