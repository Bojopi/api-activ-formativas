const { response, request } = require('express')
const UserWeb  = require('../models/userWeb2-model')
const jwt = require('jsonwebtoken')

const obtenerUserWebs = async(req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query
    const usuariosWeb = await UserWeb.find()
        // .skip(Number(desde))
        // .limit(Number(limite))

    const total = await UserWeb.countDocuments()

    res.json({
        total,
        usuariosWeb
    })
}

module.exports = {
    obtenerUserWebs,
}

