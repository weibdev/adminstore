const {
    AddCc,
    NewNotification,
    AddCcConsul,
    AddGift,
    AddLara,
    AddLogin
} = require('../database/databese')
const veryfyToken = require('../middlewares/veryfyToken')
const express = require('express');

const router = express.Router();

router.use(veryfyToken)

router.post("/addCc/:ccType", async (req, res) => {
    const { ccType } = req.params
    const { array, data } = req.body

    if (!ccType || !array) return res.status(400).send({msg: 'Houve um erro'})
    if (array.length === 0) return res.status(400).send({msg: 'Houve um erro'})


    await array.map((i) => {
        AddCc( ccType, i )
    })

    const msg = `[CC] Novo Lote Adicionado, ${array.length} ccs foram upadas`

    NewNotification(data, msg);

    res.send({msg: 'Itens Adicionados!'})
})

router.post("/addCcConsul/:loja", async (req, res) => {
    const { loja } = req.params
    const { array, data } = req.body

    if (!loja || !array || !data) return res.status(400).send({msg: 'Houve um erro'})
    if (array.length === 0) return res.status(400).send({msg: 'Houve um erro'})

    await array.map((i) => {
        AddCcConsul(loja, i)
    })

    const msg = `[CC Consultavel] Novo Lote Adicionado, ${array.length} ccs foram upadas`

    NewNotification(data, msg);

    res.send({msg: 'Itens Adicionados!'})
})

router.post("/addGifts/:loja", async (req, res) => {
    const { loja } = req.params
    const { obj, data } = req.body

    if (!loja || !obj || !data) return res.status(400).send({msg: 'Houve um erro'})
    if (obj.keys.length === 0) return res.status(400).send({msg: 'Houve um erro'})

    const msg = `[GIFT] Novo Lote Adicionado, ${obj.keys.length} gifts foram upadas`

    AddGift(loja, obj.value, obj.keys)

    NewNotification(data, msg);

    res.send({msg: {msg: 'Itens Adicionados!'}})
})

router.post("/addLara", async (req, res) => {
    let { array, data } = req.body

    if(!array || !data) return res.status(400).send({msg: 'Houve um erro'})
    if (array.length === 0) return res.status(400).send({msg: 'Houve um erro'})

    await array.map((i) => {
        AddLara(i)
    })

    const msg = `[LARA] Novo Lote Adicionado, ${array.length} laras foram upadas`

    NewNotification(data, msg);

    res.send({msg: 'Itens Adicionados!'})
})

router.post("/addLogin", async (req, res) => {
    const { array, data, loja } = req.body

    if(!array || !data) return res.status(400).send({msg: 'Houve um erro'})
    if (array.length === 0) return res.status(400).send({msg: 'Houve um erro'})

    AddLogin(loja, array)

    const msg = `[LOGIN] Novo Lote Adicionado, ${array.length} logins foram upadas`

    NewNotification(data, msg);

    res.send({msg: 'Itens Adicionados!'})
})

module.exports = (app) => app.use('/mods', router);