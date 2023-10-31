const express =  require('express')
const router = express.Router()

const ItemCardapioModel = require('../models/itemCardapio')
const ItemCardapioService = require('../services/itensCardapio')

const itemCardapioService = new ItemCardapioService(ItemCardapioModel)

const LancheModel = require('../models/lanche')
const LancheService = require('../services/lanches')

const lancheService = new LancheService(LancheModel)

const CardapioModel = require('../models/cardapio')
const CardapioService = require('../services/cardapios')

const cardapioService = new CardapioService(CardapioModel)

router.post('/adicionarItem', async (req, res) => {
    const {idLanche, idCardapio} = req.body
    try {
        const lanche = await lancheService.buscaLanche(idLanche)
        if(!lanche) {
            return res.status(404).json({message: 'Lanche não encontrado'})
        }

        const cardapio = await cardapioService.buscaCardapio(idCardapio)
        if(!cardapio) {
            return res.status(404).json({message: 'Cardápio não encontrado'})
        }

        const result = await itemCardapioService.adicionarItem(idLanche, idCardapio)
        res.status(201).json({message: 'Item adicionado ao cardápio com sucesso', result})
    } catch (error) {
        res.status(500).json({error: 'Erro ao adicionar item ao cardápio', message: error.message})
    }
})

router.delete('/deletarItem/:id', async (req, res) => {
    const idItemCardapio = req.params.id
    try {
        const item = await itemCardapioService.buscarItem(idItemCardapio)
        if(!item) {
            return res.status(404).json({error: 'Item não encontrado'})
        }

        await itemCardapioService.retirarItem(idItemCardapio)
        res.status(204).send()
    } catch (error) {
        console.error('Erro ao excluir item', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
    }
})

module.exports = router