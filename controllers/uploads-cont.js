
const { response } = require('express')
const path = require('path')
const fs = require('fs')
// const { subirArchivos } = require('../helpers')

const Archivo = require('../models/form-model')

// const cargarArchivo = async(req, res = response) => {

//     if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
//         res.status(400).json({
//             msg: 'No hay archivos para subir'
//         })
//         return
//     }

//     try {
//         //imagenes
//         const nombre = await subirArchivos( req.files, undefined, 'imgs' )
    
//         res.json({ nombre })
//     } catch (msg) {
//         res.status(400).json({
//             msg
//         })
//     }
// }

const mostrarArchivos = async(req, res = response) => {
    
    const { id } = req.params

    let modelo

    modelo = await Archivo.findById(id)
    console.log(modelo)

    // switch (coleccion) {
    //     case 'imagen':
    //         modelo = await Imagen.findById(id)
    //         if (!modelo) {
    //             return res.status(400).json({
    //                 msg: `No existe una imagen con el id ${id}`
    //             })
    //         }
    //         break;
    
    //     default:
    //         return res.status(500).json({ msg: "hay que validar" })
    // }

    if (modelo.archivo) {
        const pathImagen =  path.join(__dirname, '../uploads', modelo.archivo)
        console.log(modelo.archivo)
        if (fs.existsSync(pathImagen)) {
            return res.sendFile(pathImagen)
        }
    }
}



module.exports = {
    // cargarArchivo,
    mostrarArchivos,
}