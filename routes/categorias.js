const { Router } = require('express')
// const { check } = require('express-validator')

// const { validarCampos } = require('../middlewares/validar-campos')

const { obtenerCategorias } = require('../controllers/categoria-cont')

const router = Router()

router.get('/', obtenerCategorias )

// router.get('/:id', (req, res) => {

// })


module.exports = router