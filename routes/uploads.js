const { Router } = require('express')
const { check } = require('express-validator')

// const { validarCampos } = require('../middlewares/validar-campos')

const { 
    // cargarArchivo, 
    mostrarArchivos } = require('../controllers/uploads-cont')
// const { coleccionPermitida } = require('../helpers/db-validators')


const router = Router()

// router.post('/', cargarArchivo)

router.get('/:id', [
    check('id', 'El id debe ser de mongo'),
    // check('coleccion').custom(c => coleccionPermitida(c, [imagenes])),
    // validarCampos
], mostrarArchivos)



module.exports = router