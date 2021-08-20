const { Schema, model } = require('mongoose');

const CategoriaSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre de la categoria es obligatorio']
    },
    estado: {
        type: Boolean,
        required: [true, 'El estado es obligatorio'],
        default: true
    }
})

CategoriaSchema.methods.toJSON = function() {
    const { __v, ...data } = this.toObject()
    return data
}

module.exports = model( 'Categoria', CategoriaSchema )