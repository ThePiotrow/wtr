const jwt = require('jsonwebtoken');

exports.makeToken = ({id, email, isConfirmed}) => {
    const payload = {
        id,
        email,
        isConfirmed
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '2d'});
    return token;
};

exports.checkToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET, {ignoreExpiration: false});
    } catch {
        return false;
    }
}