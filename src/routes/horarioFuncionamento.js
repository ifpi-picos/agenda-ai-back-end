const express = require('express')
const router = express.Router()
const HorarioFuncionamentoService = require('../services/horarioFuncionamento')
const HorarioFuncionamentoModel = require('../models/horarioFuncionamento')
const LanchoneteModel = require('../models/lanchonete')
const LanchoneteService = require('../services/lanchonetes');

const horarioFuncionamentoService = new HorarioFuncionamentoService(HorarioFuncionamentoModel)
const lanchoneteService = new LanchoneteService(LanchoneteModel);


router.post('/adicionarHorario', async (req, res) => {
    console.log('chegou aqui')
    const {diaSemana, horaAbertura, horaFechamento, lanchoneteId} = req.body
    try {
        const lanchonete = await lanchoneteService.buscaLanchonete(lanchoneteId)
        console.log('chegou aqui')
        if (!lanchonete) {
            return res.status(404).json({ error: "Id de lanchonete não encontrado"})
        }

        const horario = await horarioFuncionamentoService.adicionarHorario(diaSemana, horaAbertura, horaFechamento, lanchoneteId)
        res.status(201).json({ message: 'Horario adicionado com sucesso', horario})
    } catch (error) {
        res.status(500).json({ error: 'Erro adicionar horario', message: error.message });
    }
})
router.post('/buscar/:id', async (req, res) => {
    const lanchoneteId = req.params.id
    try {
        const horarios = 1
    } catch (error) {
        res.status(500).json({ error: 'Erro buscar horário', message: error.message });
    }
})

module.exports = router