const veryfyToken = require('../middlewares/veryfyToken')
const express = require('express');
const { AddMsg, ClearMsgs } = require('../database/databese');

const router = express.Router();

router.use(veryfyToken);

router.post("/sendMsg", (req, res) => {
    const { msg, data } = req.body;

    AddMsg(data, msg)

    res.send("Mensagem Adicionada!")
})

router.post("/clearMsgs", (req, res) => {
    ClearMsgs()

    res.send("Chat Limpo!")
})

module.exports = (app) => app.use('/system', router);