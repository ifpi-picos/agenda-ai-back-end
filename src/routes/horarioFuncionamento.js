const express = require('express')
const router = express.Router()
const HorarioFuncionamentoService = require('../services/horarioFuncionamento')
const HorarioFuncionamentoModel = require('../models/horarioFuncionamento')
const LanchoneteModel = require('../models/lanchonete')
const LanchoneteService = require('../services/lanchonetes');
const { json } = require('sequelize')

const horarioFuncionamentoService = new HorarioFuncionamentoService(HorarioFuncionamentoModel)
const lanchoneteService = new LanchoneteService(LanchoneteModel);


router.post('/:idLanchonete/adicionarHorario', async (req, res) => {
    console.log('chegou aqui')
    const lanchoneteId = req.params.idLanchonete
    const {diaSemana, horaAbertura, horaFechamento} = req.body
    try {

        if(horaAbertura == horaFechamento) {
            return res.status(400).json({error: "Horário de abertura não deve ser o mesmo de fechamento"})
        }
        if(horaAbertura > horaFechamento) {
            return res.status(400).json({error: "Horário de abertura não deve ser maior que o de fechamento"})
        }
        const lanchonete = await lanchoneteService.buscaLanchonete(lanchoneteId)
        console.log('chegou aqui')
        if (!lanchonete) {
            return res.status(404).json({ error: "Id de lanchonete não encontrado"})
        }

        const horarios = await horarioFuncionamentoService.buscarHorariosDoDia(lanchoneteId, diaSemana)

        if (horarios) {
            const conflito = horarios.some((horario) => {
                // Verificar se o novo horário se sobrepõe a algum horário existente
                return (
                    (horaAbertura >= horario.horaAbertura && horaAbertura <= horario.horaFechamento) ||
                    (horaFechamento >= horario.horaAbertura && horaFechamento <= horario.horaFechamento) ||
                    (horaAbertura <= horario.horaAbertura && horaFechamento >= horario.horaFechamento)
                )
            })

            if (conflito) {
                return res.status(400).json({ error: "Conflito de horários. Escolha um intervalo diferente." })
            }
        }

        const horario = await horarioFuncionamentoService.adicionarHorario(diaSemana, horaAbertura, horaFechamento, lanchoneteId)
        res.status(201).json({ message: 'Horario adicionado com sucesso', horario})
    } catch (error) {
        res.status(500).json({ error: 'Erro adicionar horario', message: error.message });
    }
})
router.get('/:idLanchonete/buscarHorariosDoDia', async (req, res) => {
    const lanchoneteId = req.params.idLanchonete
    const diaSemana = req.body.diaSemana
    try {
        const horarios = await horarioFuncionamentoService.buscarHorariosDoDia(lanchoneteId, diaSemana)
        
        res.status(200).json(horarios)
    } catch (error) {
        res.status(500).json({ error: 'Erro buscar horário', message: error.message });
    }
})

module.exports = router