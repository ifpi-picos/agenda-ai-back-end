
const nodemailer = require('nodemailer')

class TempAuthService {
    constructor(TempUserModel) {
        this.tempUserModel = TempUserModel
    }
    async signUp(email) {
        try {
            const user = await this.tempUserModel.create({ email });
            await this.sendEmail(user.cod, email)

            return user
        } catch (error) {
            throw error;
        }
    }
    async confirmSignup(email) {
        try {

        } catch (error) {

        }
    }

    async buscarUsuarioTemporario(cod) {
        try {
            const user = await this.tempUserModel.findOne({
                where: { cod: cod },
            });

            if (user) {
                return user;
            } else {
                return null;
            }
        } catch (error) {

        }
    }

    async buscarUsuarioTemporarioPorEmail(email) {
        try {
            const user = await this.tempUserModel.findOne({
                where: { email: email }
            })
            if (user) {
                return user;
            } else {
                return null;
            }
        } catch (error) {
        }
    }

    async sendEmail(cod, userEmail) {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.SENHA_EMAIL
                
            },
            /*tls: {
                rejectUnauthorized: false, // Ignora a verificação do certificado (apenas para desenvolvimento)
            },*/
        })
        const mailOptions = {
            from: `Agenda Aí <${process.env.EMAIL}>`,
            to: userEmail,
            subject: 'Código de confirmação de cadastro',
            //text: `Seu código é ${cod}`,
            html: `
                <div style="background-color: #f5f5f5; padding: 20px; border-radius: 10px;">
                    <p>Olá, seu código de confirmação é </p>
                    <p><strong>${cod}</strong>.</p>
                    <p>Obrigado!</p>
                </div>
            `
        }
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Erro ao enviar email: ', error)
            } else {
                console.log('Email enviado:', info.response)
            }
        })
    }
}

module.exports = TempAuthService