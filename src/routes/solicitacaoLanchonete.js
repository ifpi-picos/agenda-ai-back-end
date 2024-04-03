const express = require('express')
const router = express.Router();

const SolicitacaoLanchoneteModel = require('../models/solicitacaoLanchonete')
const SolicitacaoLanchoneteService = require('../services/solicitacaoLanchonete')

const solicitacaoLanchoneteService = new SolicitacaoLanchoneteService(SolicitacaoLanchoneteModel);

router.post('/solicitacaoCadastroLanchonete', async (req, res) => {
    try {
        const {
            email,
            nomeLanchonete,
            cnpj,
            imagem,
            cep,
            logradouro,
            numero,
            bairro,
            cidade,
            estado
        } = req.body
    
        const novaSolicitacao = await solicitacaoLanchoneteService.criarSolicitacaoLanchonete({
            email,
            nomeLanchonete,
            cnpj,
            imagem,
            cep,
            logradouro,
            numero,
            bairro,
            cidade,
            estado
        })
        res.status(201).json({ message: 'Solicitação de lanchonete enviada com sucesso', data: novaSolicitacao })
    } catch (error) {
        console.error('Erro ao criar solicitação de lanchonete:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
})

router.get('/solicitacaoCadastroLanchonete', async (req, res) => {
    try {
        const solicitacoes = await solicitacaoLanchoneteService.listarSolicitacoes();
        res.status(200).json(solicitacoes)
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar solicitacoes', message: error.message})
    }
})

module.exports = router