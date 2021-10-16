const express = require('express')
const router = express.Router()
const { check } = require('express-validator')
const formController = require('../controllers/form-cont')
const auth = require('../middlewares/auth-mid')

//subir actividad
router.post('/',
    auth,
    formController.crearActividad
)

router.get('/',
    auth,
    formController.obtenerActividad
)

router.get('/materia',
    auth,
    formController.buscarMateria
)

//obtener las actividades
router.get('/general',
    auth,
    formController.obtenerActividadPorUsuario
)

//obtener las actividades pendientes
router.get('/pendientes',
    auth,
    formController.obtenerActividadPendiente
)

//obtener las actividades aceptadas
router.get('/aceptados',
    auth,
    formController.obtenerActividadAceptada
)

//obtener las actividades rechazadas
router.get('/rechazados',
    auth,
    formController.obtenerActividadRechazada
)

//obtener las actividades observadas
router.get('/observados',
    auth,
    formController.obtenerActividadObservada
)

// actualizar el estado
router.put('/:id', [
    check('id', 'El id debe ser de mongo'),
],
    auth,
    formController.actualizarEstado
)

module.exports = router