const jtw = require('jsonwebtoken')
const { secret }  = require('../config/auth.json')

module.exports = (req, res, next) => {
    const tokenAuth = req.headers.authorization;

    if(!tokenAuth) return res.status(401).send()

    let parts = tokenAuth.split(' ');

    if(parts.length !== 2) return res.status(401).send()

    let [scheme, token] = parts;

    jtw.verify(token, secret, (err, decode) => {
        if (err) return res.status(401).send()
        
        return next()
    })
}