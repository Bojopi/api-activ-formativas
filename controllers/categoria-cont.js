const { response } = require('express')
const { Categoria } = require('../models')


const obtenerCategorias = async(req, res = response) => {
    const { limite = 5, desde = 0 } = req.query;
    const query = {estado: false}

    const [ total, categorias ] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query).skip(Number( desde )).limit(Number( limite ))
    ])

    res.json({
        total,
        categorias
    })
    console.log(total)
}


module.exports = {
    obtenerCategorias,
}