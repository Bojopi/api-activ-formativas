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

//obtener las actividades pendientes
router.get('/pendientes',
    formController.obtenerActividadPendiente
)

//obtener las actividades aceptadas
router.get('/aceptados',
    formController.obtenerActividadAceptada
)

//obtener las actividades rechazadas
router.get('/rechazados',
    formController.obtenerActividadRechazada
)

//obtener las actividades observadas
router.get('/observados',
    formController.obtenerActividadObservada
)

//actualizar el estado
// router.put('/',
//     formController.
// )

module.exports = router