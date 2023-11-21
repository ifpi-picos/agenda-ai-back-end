const express = require('express');
const router = express.Router();
const verificarToken = require('../middleware/verificarToken');

const LanchoneteModel = require('../models/lanchonete')
const LanchoneteService = require('../services/lanchonetes');
const EnderecoModel = require('../models/endereco')
const EnderecoService = require('../services/endereco')

const lanchoneteService = new LanchoneteService(LanchoneteModel);
const enderecoService = new EnderecoService(EnderecoModel)

router.post('/criar', async (req, res) => {
  const { nomeUsuario, email, password, nomeLanchonete, cnpj, imagem, cep, logradouro, numero, bairro, cidade, estado } = req.body
  try {
    const result = await lanchoneteService.createLanchonete(nomeUsuario, email, password, nomeLanchonete, cnpj, imagem, cep, logradouro, numero, bairro, cidade, estado);

    res.status(201).json({ message: 'Lanchonete criada com sucesso', lanchonete: result.lanchonete, endereco: result.endereco, user: result.user });
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
    if (!lanchonetes) {
      return res.status(404).json({ error: 'Lanchonete não encontrada' })
    }
    res.status(200).json(lanchonetes);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar lanchonete', message: error.message });
  }
});

router.get('/buscarIdLanchonete/:idUsuario', async (req, res) => {
  const idUsuario = req.params.idUsuario
  try {
    const idLanchonete = await lanchoneteService.buscaIdLanchonete(idUsuario)
    if (!idLanchonete) {
      return res.status(404).json({ error: 'Lanchonete não encontrada' })
    }
    res.status(200).json(idLanchonete)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar lanchonete', message: error.message });
  }
})

router.put('/alterar/:id', verificarToken('gerente'), async (req, res) => {
  const lanchoneteId = req.params.id
  const { nomeLanchonete, cnpj, imagem, cep, logradouro, numero, bairro, cidade, estado } = req.body;

  try {
    const lanchonete = await lanchoneteService.buscaLanchonete(lanchoneteId)
    if (!lanchonete) {
      return res.status(404).json({ error: "Lanchonete não encontrada" })
    }
    const lanchoneteAtualizada = await lanchoneteService.alterarLanchonete(
      lanchoneteId,
      nomeLanchonete,
      cnpj,
      imagem,
      cep,
      logradouro,
      numero,
      bairro,
      cidade,
      estado)
    res.status(200).json({ message: 'Lanchonete alterada com sucesso', lanchoneteAtualizada })
  } catch (error) {
    console.error('Erro ao alterar lanchonete', error);
    res.status(500).json({ error: 'Erro interno do servidor', message: error.message });
  }
})

router.delete('/deletar/:id', verificarToken('gerente'), async (req, res) => {
  const lanchoneteId = req.params.id
  try {
    const lanchonete = await lanchoneteService.buscaLanchonete(lanchoneteId)
    if (!lanchonete) {
      return res.status(404).json({ error: "Lanchonete não encontrada" })
    }
    const deletar = await lanchoneteService.deleteLanchonete(lanchoneteId)
    res.status(204).send();
  } catch (error) {
    console.error('Erro ao excluir lanchonete', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
})

module.exports = router;

