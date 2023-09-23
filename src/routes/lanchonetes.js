const express = require('express');
const router = express.Router();
const LanchoneteModel = require('../models/lanchonete')
const LanchoneteService = require('../services/lanchonetes');
const EnderecoModel = require('../models/endereco')
const EnderecoService = require('../services/endereco')

const lanchoneteService = new LanchoneteService(LanchoneteModel);
const enderecoService = new EnderecoService(EnderecoModel)

router.post('/criar', async (req, res) => {
  try {
    const { nome, cnpj, cep, logradouro, numero, bairro, cidade, estado } = req.body

    const endereco = await enderecoService.createEndereco(cep, logradouro, numero, bairro, cidade, estado)

    const idEndereco = endereco.idEndereco

    const lanchonete = await lanchoneteService.createLanchonete(nome, cnpj, idEndereco);

    res.status(201).json({ message: 'Lanchonete criada com sucesso', lanchonete, endereco });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar a lanchonete', message: error.message });
  }
});

router.get('/listar', async (req, res) => {
  try {
    const lanchonetes = await lanchoneteService.selectLanchonetes();
    //const lanchonetess = await LanchoneteModel.findAll().
    res.status(200).json(lanchonetes);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar lanchonetes', message: error.message });
  }
});

router.get('/buscar/:id', async (req, res) => {
  const lanchoneteId = req.params.id
  try {
    const lanchonetes = await lanchoneteService.buscaLanchonete(lanchoneteId);
    //const lanchonetes = await LanchoneteModel.findAll();
    res.status(200).json(lanchonetes);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar lanchonetes', message: error.message });
  }
});

router.delete('/deletar/:id', async (req, res) => {
  const lanchoneteId = req.params.id
  try {
    const lanchonete = await lanchoneteService.buscaLanchonete(lanchoneteId)
    if(!lanchonete) {
      return res.status(404).json({error: "Lanchonete não encontrada"})
  }
    const deletar = await lanchoneteService.deleteLanchonete(lanchoneteId)
    res.status(204).send();
  } catch (error) {
    console.error('Erro ao excluir lanchonete', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
})

module.exports = router;

