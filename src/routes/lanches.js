const express = require('express')
const router = express.Router();
const LancheModel = require('../models/lanche')
const LancheService = require('../services/lanches')
const LanchoneteModel = require('../models/lanchonete')
const LanchoneteService = require('../services/lanchonetes');
const verificarToken = require('../middleware/verificarToken');

const lanchoneteService = new LanchoneteService(LanchoneteModel);

const lancheService = new LancheService(LancheModel)

router.post('/adicionarLanche', verificarToken('gerente'), async (req, res) => {
    const { nomeLanche, descricao, preco, tipo, urlImagem, idLanchonete } = req.body
    try {
        const lanchonete = await lanchoneteService.buscaLanchonete(idLanchonete)
        if (!lanchonete) {
            return res.status(404).json({ error: "Id de lanchonete não encontrado"})
        }

        const result = await lancheService.cadastrarLanche(nomeLanche, descricao, preco, tipo, urlImagem, idLanchonete)
        res.status(201).json({ message: 'Lanche adicionado com sucesso', result})
    } catch (error) {
        res.status(500).json({ error: 'Erro adicionar lanche', message: error.message });
    }
})

router.get('/:idLanchonete/listarLanches', async (req, res) => {
    const idLanchonete = req.params.idLanchonete
    console.log(`ID da lanchonete: ${idLanchonete}`);
    try {
        const lanchonete = await lanchoneteService.buscaLanchonete(idLanchonete)
        if (!lanchonete) {
            return res.status(404).json({ error: "Id de lanchonete não encontrado"})
        }
        const lanches = await lancheService.listarLanchesDeLanchonete(idLanchonete)
        if(!lanches) {
            return res.status(404).json({error: 'Lanches não encontrados'})
        }
        res.status(200).json(lanches)
    } catch (error) {
        res.status(500).json({error: 'Erro ao listar lanches', message: error.message })
    }
})

router.get('/buscar/:id', async (req, res) => {
    const idLanche = req.params.id
    try {
        const lanche = await lancheService.buscaLanche(idLanche)
        if (!lanche) {
            return res.status(404).json({error: "Lanche não encontrado"})
        }
        res.status(200).json(lanche)
    } catch (error) {
        res.status(500).json({error: 'Erro ao buscar lanche', message: error.message })
    }
})

router.put('/alterar/:id', verificarToken('gerente'), async (req, res) => {
    const idLanche = req.params.id
    const { nomeLanche, descricao, preco, tipo, urlImagem } = req.body

    try {
        const lanche = await lancheService.buscaLanche(idLanche)
        if (!lanche) {
            return res.status(404).json({ error: "Lanche não encontrado" })
        }
        const lancheAtualizado = await lancheService.alterarLanche(
            idLanche,
            nomeLanche,
            descricao,
            preco,
            tipo,
            urlImagem)
        res.status(200).json({message: 'Lanche atualizado com sucesso', lancheAtualizado})
    } catch (error) {
        console.error('Erro ao alterar lanche', error);
        res.status(500).json({ error: 'Erro interno do servidor', message: error.message });
    }
})

router.delete('/deletar/:id', verificarToken('gerente'), async (req, res) => {
    const idLanche = req.params.id
    try {
        const lanche = await lancheService.buscaLanche(idLanche)
        if (!lanche) {
            return res.status(404).json({ error: "Lanche não encontrado" })
        }
        const deletar = await lancheService.deleteLanche(idLanche)
        res.status(204).send()
    } catch (error) {
        console.error('Erro ao excluir lanche', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
})

module.exports = router