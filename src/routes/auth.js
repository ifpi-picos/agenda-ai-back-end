const express = require('express');
const router = express.Router();
const AuthService = require('../services/auth')
const UserModel = require('../models/user')

//const authService = require("../services/auth")
const authService = new AuthService(UserModel)

router.post('/signup', async (req, res) => {
    try {
        const { nomeUsuario, email, password, tipo } = req.body
        if (password.length < 6) {
            return res.status(400).json({ error: "A senha deve ter pelo menos 6 caracteres" })
        }
        if (!nomeUsuario) {
            return res.status(400).json({error: "Nome de usuário ausente"})
        }
        await authService.signUp({nomeUsuario, email, password, tipo})
        res.status(201).json({message: "Usuário cadastrado com sucesso"})
    } catch (error) {
        res.status(500).json({ error: 'Erro ao cadastrar usuário', message: error.message });
    }
})

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    try {
        const { token } = await authService.signIn(email, password);
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})



module.exports = router;