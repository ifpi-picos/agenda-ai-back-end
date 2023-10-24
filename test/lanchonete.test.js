const request = require('supertest')
const app = require('../src/index')

afterEach((done) => {
    app.close();
    done();
});


describe('Teste para rotas de autenticação', () => {
    it('Deve listar as lanchonetes cadastradas no sistema', async () => {
        const response = await request(app).get('/lanchonetes/listar')

        expect(response.status).toBe(200)
    }, 10000)
    it('Deve cadastrar uma nova lanchonete', async () => {
        const novaLanchonete = {
            nomeUsuario: "Zé Gerente",
            email: "zegerenteyh65h3@gmail.com",
            password: "123456",
            nomeLanchonete: "Cantina IFPI",
            cnpj: "XX. XXX. XXX/5949-XX",
            cep: "64605-500",
            logradouro: "Av Pedro Marques de Medeiros",
            numero: "s/n",
            bairro: "Parque Industrial",
            cidade: "Picos",
            estado: "Piauí"
        }
        const response = await request(app).post('/lanchonetes/criar')
            .send(novaLanchonete)

        console.log('Response Status:', response.status);
        console.log('Response Body:', response.body);

        expect(response.status).toBe(201)
        expect(response.body.message).toBe('Lanchonete criada com sucesso')
    })

    it('Deve buscar uma lanchonete pelo ID', async () => {
        const lanchoneteId = 102
        const response = await request(app).get(`/lanchonetes/buscar/${lanchoneteId}`)
    
        console.log('Response Status: ', response.status)
        console.log('Response Body: ', response.body)


        if (response.status === 404) {
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error', 'Lanchonete não encontrada');
    } else {
        expect(response.status).toBe(200);
    }
    })

    it('Deve alterar uma lanchonete por ID', async () => {
        const lanchoneteId = 3;
        const dadosAtualizados = {
            nomeLanchonete: "Cantina IFPI alterada",
            cnpj: "XX. XXX. XXX/5949-XX",
            cep: "64605-500",
            logradouro: "Av S'Pedro Marques de Medeiros",
            numero: "s/n",
            bairro: "Parque Industrial",
            cidade: "Picos",
            estado: "Piauí"
        };

        const response = await request(app).put(`/lanchonetes/alterar/${lanchoneteId}`)
            .send(dadosAtualizados);

        console.log('Response Status:', response.status);
        console.log('Response Body:', response.body);

        expect(response.status).toBe(200);
    });

    it('Deve excluir uma lanchonete por ID', async () => {
        const lanchoneteId = 3;
    
        const response = await request(app).delete(`/lanchonetes/deletar/${lanchoneteId}`);
    
        console.log('Response Status:', response.status);
    
        expect(response.status).toBe(204);
      });

})