const jwt = require('jsonwebtoken');
require('dotenv').config();

const authorizeRoles = (...allowedRoles) => {
    return(req, res, next) => {
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ message: "Access denied" });
        }
        return next();
    }
}

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Token missing' });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ message: 'Invalid token' });

        req.user = decoded;
        next();
    });
}

module.exports = {
    authorizeRoles,
    verifyToken,
}