class UserService {
    constructor(UserModel) {
        this.userModel = UserModel
    }
    async getUserByEmail(email) {
        try {
            const user = await this.userModel.findOne({
                where: {
                    email: email
                }
            });
    
            if (user) {
                console.log(user.email);
                return user.email;
            } else {
                return null; // ou outra indicação de que o usuário não foi encontrado
            }
        } catch (error) {
            throw error;
        }
    }
    
}

module.exports = UserService