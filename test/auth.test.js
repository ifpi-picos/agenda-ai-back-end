const request = require('supertest')
const app =  require('../src/index')

afterEach((done) => {
    app.close();
    done();
  });
  

describe('Teste para rotas de autenticação', () => {
    it('Deve cadastrar um novo usuário', async () => {
        const response = await request(app)
            .post('/auth/signup')
            .send({
                nomeUsuario: 'Zé Exemplo',
                email: 'zexemplo356fgd2@gmail.com',
                password: '123456',
                tipo: 'cliente'
           })
        expect(response.statusCode).toBe(201)
        expect(response.body.message).toBe('Usuário cadastrado com sucesso')
    })
    it('Deve fazer login de um usuário', async () => {
        const response = await request(app)
          .post('/auth/signin')
          .send({
            email: 'zegerente@gmail.com',
            password: '123456',
          });
    
        expect(response.statusCode).toBe(200);
        expect(response.body.token).toBeDefined();
      });
})