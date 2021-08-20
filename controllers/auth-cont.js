const User = require('../models/user-model')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')

exports.autenticarUsuario = async(req, res) => {
    const errores = validationResult(req)
    if(!errores.isEmpty()) {
        return res.status(400).json({
            errores: errores.array()
        })
    }

    //extraer usuario y contraseña
    const { username, password } = req.body;

    try{
        //revisar que el usuario esté registrado
        let usuario = await User.findOne({username})
        if(!usuario){
            return res.status(400).json({
                msg: 'El usuario no existe'
            })
        }

        //revisar el password
        let passCorrecto = await User.findOne({password})
        if (!passCorrecto) {
            return res.status(400).json({
                msg: 'Password Incorrecto'
            })
        }

        //si todo es correcto
        //crear y firmar el jwt
        const payload = {
            usuario: {
                id: usuario.id
            }
        }

        //firmar el jwt
        jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 3600
        }, (error, token) => {
            if (error) {
                throw error
            }
            //mensaje de confirmacion
            res.json({token})
        })
    } catch(error){
        console.log(error)
    }
}

exports.usuarioAutenticado = async(req, res) => {
    try {
        const usuario = await User.findById(req.usuario.id).select('-password')
        res.json({ usuario })
        // console.log(usuario.name)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hubo un error'
        })
    }
}