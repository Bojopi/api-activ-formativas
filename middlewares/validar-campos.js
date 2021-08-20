const { validationResult } = require("express-validator")

const validarCampos = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json(errors)
    }
    next()
}

const validarJWT = (req, res, next) => {
    
}

const esStaffRole = (req, res, next) => {

}


module.exports = {
    validarCampos,
    validarJWT,
    esStaffRole,
}