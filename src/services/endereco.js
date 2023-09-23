class EnderecoService {
    constructor(EnderecoModel) {
        this.enderecoModel = EnderecoModel
    }

    async createEndereco(cep, logradouro, numero, bairro, cidade, estado) {
        try {
            const endereco = await this.enderecoModel.create({
                cep: cep,
                logradouro: logradouro,
                numero: numero,
                bairro: bairro,
                cidade: cidade,
                estado: estado
            })
            return endereco
        } catch (error) {

        }
    }
}

module.exports = EnderecoService