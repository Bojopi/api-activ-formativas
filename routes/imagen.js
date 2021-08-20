const { Router } = require('express')
const { check } = require('express-validator')

const { validarJWT, validarCampos, esStaffRole } = require('../middlewares/validar-campos')

const { crearImagen, obtenerImagenPorId } = require('../controllers/imagen-cont')

const { existeCategoriaPorId, existeImagenPorId } = require('../helpers/db-validators')

const router = Router()

router.get('/:id', [
    check('id', 'No es un id de mongo'),
    check('id').custom( existeImagenPorId ),
    validarCampos,
], obtenerImagenPorId)

router.post('/', [
    check('titulo', 'El titulo de la imagen es obligatorio'),
    check('descripcion', 'La descripcion de la imagen es obligatoria'),
    check('categoria', 'No es un id de mongo'). isMongoId(),
    check('categoria').custom( existeCategoriaPorId ),
    validarCampos,
], crearImagen)


module.exports = router