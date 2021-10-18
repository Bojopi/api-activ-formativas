const { Schema, model } = require('mongoose');

const CarreraSchema = Schema({
    nom_carrera: {
        type: String,
        required: [true, 'El nombre de la carrera es obligatorio']
    }
})

CarreraSchema.methods.toJSON = function() {
    const { __v, ...data } = this.toObject()
    return data
}

module.exports = model( 'Carreras', CarreraSchema )