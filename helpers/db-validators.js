const { Categoria, Imagen } = require('../models')

//Categorias
const existeCategoriaPorId = async( id ) => {
    const existeCategoria = await Categoria.findById(id)
    if (!existeCategoria) {
        throw new Error(`El id ${id} no existe`)
    }
}

//Imagenes
const existeImagenPorId = async( id ) => {
    const existeImagen = await Imagen.findById(id)
    if (!existeImagen) {
        throw new Error(`El id ${id} no existe`)
    }
}

//validar colecciones permitidas
const coleccionPermitida = (coleccion = '', colecciones = []) => {
    const incluida = colecciones.includes(coleccion)
    if (!incluida) {
        throw new Error(`La coleccion ${coleccion} no es permitida`)
    }

    return true
}

module.exports = {
    coleccionPermitida,
    existeCategoriaPorId,
    existeImagenPorId,
}