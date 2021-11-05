const express = require('express')
const router = express.Router()
const { check } = require('express-validator')
const formController = require('../controllers/form-cont')
const auth = require('../middlewares/auth-mid')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        const { originalname } = file
        cb(null, originalname)
    }
})

const upload = multer({ storage })

//subir actividad
router.post('/',
    auth,
    upload.single('archivo'),
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
router.get('/carrera',
    auth,
    formController.buscarCarrera
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