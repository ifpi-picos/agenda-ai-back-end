const jwt = require('jsonwebtoken');

function verificarToken(tipoUsuario) {
    return function(req, res, next) {
        const token = req.header('Authorization');
        console.log(token);
    
        if (!token) {
            console.log('Token não fornecido');
            return res.status(401).json({ error: 'Acesso não autorizado. Token não fornecido.' });
        }
    
        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            req.idUsuario = decoded;
            if (decoded.tipo !== tipoUsuario) {
                return res.status(401).json({ error: 'Acesso não autorizado'})
            }
            next();
        } catch (error) {
            console.error(error);
    
            if (error.name === 'TokenExpiredError') {
                return res.status(401).json({ error: 'Token expirado.' });
            } else if (error.name === 'JsonWebTokenError') {
                return res.status(401).json({ error: 'Token inválido.' });
            } else {
                return res.status(401).json({ error: 'Erro na verificação do token.' });
            }
        }
    }
}

module.exports = verificarToken;
