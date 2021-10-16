const { Schema, model } = require('mongoose');

const MateriaSchema = Schema({
    nom_materia: {
        type: String,
        required: [true, 'El nombre de la materia es obligatorio']
    }
})

MateriaSchema.methods.toJSON = function() {
    const { __v, ...data } = this.toObject()
    return data
}

module.exports = model( 'Materias', MateriaSchema )