const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

class AuthService {
    constructor(UserModel) {
        this.userModel = UserModel
    }
    async signUp(user) {
        try {
            user.password = bcrypt.hashSync(user.password, 10)
            return await this.userModel.create(user)
        } catch (error) {

        }
    }

    async signIn(email, password) {
        try {
            const user = await this.userModel.findOne({
                where: {
                    email: email
                }
            })
            if (!user) {
                throw new Error('Usuário não encontrado')
            }
            const senhaValida = bcrypt.compareSync(password, user.password)
            if (!user || !senhaValida) {
                console.log('null')
                throw new Error('Email ou senha inválido!')
            }
            const token = jwt.sign({id: user.id}, process.env.SECRET_KEY, {expiresIn: '1h'})
            return { token }
        } catch (error) {
            throw error
        }
    }

    /*async function signIn(email, password) {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log('logado')
        } catch (error) {
            return error.message
        }
    }*/
}


module.exports = AuthService