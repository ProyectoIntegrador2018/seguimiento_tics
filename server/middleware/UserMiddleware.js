JWT_KEY = process.env.JWT_KEY;

const jwt = require('jsonwebtoken');

/**
 * Function that throws a 401 (Unauthorized) error
 * @param {Object} res Response of post
 */
function denyAccess(res) {
    return res.status(401).send('Access denied.')
}

/**
 * Function that checks if the token corresponds to an admin
 * @param {Object} req Request of post
 * @param {Object} res Response of post
 * @param {Object} next Calls the next route handler match
 */
function auth(req, res, next) {
    const token = req.header('x-auth-token');
    if(!token) denyAccess(res);
    try {
        const decoded = jwt.verify(token, JWT_KEY);
        if(decoded.admin) denyAccess(res);
        req.user = decoded;
        next();
    } catch(e) {
        res.status(401).send('Invalid token');
    }
}

module.exports = auth;