class HorarioFuncionamentoService {
    constructor(HorarioFuncionamentoModel) {
        this.horarioFuncionamentoModel = HorarioFuncionamentoModel
    }

    async adicionarHorario(diaSemana, horaAbertura, horaFechamento, lanchoneteId) {
        try {
            const horario = await this.horarioFuncionamentoModel.create({diaSemana, horaAbertura, horaFechamento, lanchoneteId})
            return horario
        } catch (error) {
            throw error
        }
    }

    async buscarHorariosDoDia(lanchoneteId, diaSemana) {
        try {
            const horarios = await this.horarioFuncionamentoModel.findAll({
                where: {
                    lanchoneteId: lanchoneteId,
                    diaSemana: diaSemana
                }
            })
            return horarios
        } catch (error) {
            throw error
        }
    }
}

module.exports = HorarioFuncionamentoService