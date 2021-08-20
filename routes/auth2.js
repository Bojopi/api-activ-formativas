const express = require('express')
const router = express.Router()
const { check } = require('express-validator')
const authController = require('../controllers/auth-cont2')
const auth = require('../middlewares/auth-mid')

//iniciar sesion
router.post('/',
    authController.autenticarUsuario
)

//obtener el usuario autenticado
router.get('/', 
    auth,
    authController.usuarioAutenticado
)

module.exports = router