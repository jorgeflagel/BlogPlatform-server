const jwt = require('jsonwebtoken')
const User = require('../models/user');

// middleware to validate token (rutas protegidas)
const verifyUser = (req, res, next) => {
    const authHeader = req.headers['authorization']
    if (!authHeader) return res.status(401).json({ message: 'Access. denied - You need to register and login as a user'})
    try {
        const token = authHeader.split(' ')[1]
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = verified
        console.log(req.user);
        next() // continuamos
    } catch (err) {
        res.status(400).json({message: err})
    }
}

const verifyAdmin = (req, res, next) => {
    User.findOne({_id: req.user.id})
    .then(user => {
        console.log(user);
        if (!req.user || user.admin !== true) return res.status(403).json({ message: 'Access denied - You need Admin credentials'})
        else next();
    })
    .catch(err => next(err));
}

module.exports = {verifyUser, verifyAdmin};