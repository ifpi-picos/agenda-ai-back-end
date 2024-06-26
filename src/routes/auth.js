const express = require('express');
const router = express.Router();

const AuthService = require('../services/auth')
const UserService = require('../services/users')

const UserModel = require('../models/user')
const TempUserModel = require('../models/tempUser')
const LanchoneteModel = require('../models/lanchonete')

const LanchoneteService = require('../services/lanchonetes');

const TempAuthService = require('../services/authTemp')
const authService = new AuthService(UserModel)
const tempAuthService = new TempAuthService(TempUserModel)
const userService = new UserService(UserModel)



const lanchoneteService = new LanchoneteService(LanchoneteModel);

router.post('/signup', async (req, res) => {
    try {
        const { nomeUsuario, email, password, confirmPassword, tipo } = req.body

        const tempUser = await tempAuthService.buscarUsuarioTemporarioPorEmail(email)

        if (tempUser) {
            console.log('tempUser true')
            return res.status(200).json({ message: "email encontrado" }) // Adicionado o "return" aqui
        }

        const userEmail = await userService.getUserByEmail(email)
        if (userEmail === email) {
            console.log('email cadastrado')
            return res.status(400).json({error: "Email já cadastrado"})
        }
        if (password.length < 6) { 
            return res.status(400).json({ error: "A senha deve ter pelo menos 6 caracteres" })
        }
        if (password != confirmPassword) {
            return res.status(400).json({ error: "Senha e confirmação de senha devem ser iguais" })
        }
        if (!nomeUsuario) {
            return res.status(400).json({ error: "Nome de usuário ausente" })
        }
        console.log('chegou aqui')
        await tempAuthService.signUp(email)
        //await authService.signUp( nomeUsuario, email, password, tipo )
        res.status(201).json({ message: "Solicitação enviada com sucesso" })
    } catch (error) {
        res.status(500).json({ error: 'Erro ao cadastrar usuário', message: error.message });
    }
})


router.post('/confirmSignup', async (req, res) => {
    try {
        console.log('entrou na confirmação')
        const {cod, nomeUsuario, email, password} =  req.body
        const tipo = 'cliente'
        console.log(`cod: ${cod}, email: ${email}`)
        const user = await tempAuthService.buscarUsuarioTemporario(cod)
        console.log(user)
        if(!user) {
            return res.status(404).json({error: "Código de confirmação inválido"})
        } else if (cod == user.cod && email == user.email) {
            await authService.signUp(nomeUsuario, email, password, tipo)
        }
        res.status(201).json({ message: "Usuário cadastrado com sucesso" })

    } catch (error) {
        res.status(500).json({ error: 'Erro ao cadastrar usuário', message: error.message });
    }
})

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    try {
        const { token, tipo, idUsuario } = await authService.signIn(email, password);
        console.log(token, tipo)
        if (tipo === 'cliente') {
            return res.json({ token, tipo });
        } else if (tipo === 'gerente') {
            const idLanchonete = await lanchoneteService.buscaIdLanchonete(idUsuario)
            if(!idLanchonete) {
                return res.status(404).json({error: 'idLanchonete não encontrado'})
            }
            return res.json({token, tipo, idLanchonete})
        }
    } catch (error) {
        if (error.message === 'Usuário não encontrado' || error.message === 'Email ou senha inválido!') {
            console.log('entrou aqui')
            return res.status(401).json({ error: 'credenciais inválidas' })
        }
        res.status(500).json({ error: error.message });
    }
})



module.exports = router;