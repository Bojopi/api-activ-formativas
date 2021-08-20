const { Router } = require('express')

const { obtenerUserWebs } = require('../controllers/userWeb-cont2')

const router = Router()

router.get('/', obtenerUserWebs )


module.exports = router