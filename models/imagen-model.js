const { Schema, model } = require('mongoose');

const ImagenSchema = Schema({
    img: {
        type: String,
        require: [true, 'El nombre de la imagen es obligatorio']
    },
    titulo: {
        type: String,
        require: [true, 'El titulo de la imagen es obligatorio']
    },
    descripcion: {
        type: String,
        required: [true, 'La descripcion de la imagen es obligatoria']
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    }
})

ImagenSchema.methods.toJSON = function() {
    const { __v, ...data } = this.toObject()
    return data
}

module.exports = model( 'Imagen', ImagenSchema )