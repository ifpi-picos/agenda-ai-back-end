const express = require('express');
const router = express.Router();

const authService = require("../services/auth")

router.post('/signup', async (req, res) => {
    const { email, password, displayName } = req.body;

    if (password.length < 6) {
        return res.status(400).json({ error: "A senha deve ter pelo menos 6 caracteres" })
    }
    if (!displayName) {
        return res.status(400).json({error: "Nome de usuário ausente"})
    }

    try {
        const user = await authService.signUp(email, password, displayName);
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await authService.signIn(email, password);
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})



module.exports = router;