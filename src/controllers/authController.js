const { Login } = require('../database/databese')
const { secret } = require("../config/auth.json")
const express = require('express');
const jtw = require("jsonwebtoken")

const router = express.Router();

router.post('/login', async (req, res) => {
    const { pass } = req.body;
    
    if (!pass) return res.status(400).send({ error: true, message: "Bad Request" })
    
    const resp = await Login(pass);

    if (resp.error) return res.status(401).send(resp)
    
    res.send(resp)
})

router.get('/checkToken/:token', async (req, res) => {
    const { token } = req.params;
    
    if (!token) return res.status(400).send({ error: true, message: "Bad Request" })
    
    jtw.verify(token, secret, (err, decode) => {
        if (err) return res.status(401).send({error: true})
        
        return res.status(200).send({error: false})
    })
})

module.exports = (app) => app.use('/auth', router);