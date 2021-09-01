const express = require('express')
const router = express.Router()
// const { check } = require('express-validator')
const formController = require('../controllers/form-cont')
// const auth = require('../middlewares/auth-mid')

//subir actividad
router.post('/',
    formController.crearActividad
)

//obtener las actividades
router.get('/',
    formController.obtenerActividad
)

module.exports = router