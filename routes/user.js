const { Router } = require('express')

const { obtenerUser, crearUser } = require('../controllers/user-cont')

const router = Router()

router.get('/', obtenerUser )
router.post('/', crearUser )


module.exports = router