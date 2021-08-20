const { Schema, model } = require('mongoose');

const UserWebSchema = Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    name: {
        type: String
    },
    lastname: {
        type: String
    },
    phone: {
        type: Number
    },
    career: {
        type: String
    },
    horario: {
        type: String
    },
    Agenda: {
        type: Number
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    Materia: {
        type: String
    },
    grupo: {
        type: String
    },
    fecha: {
        type: Date
    },
    codigo: {
        type: Number
    }
})

UserWebSchema.methods.toJSON = function () { 
    const {__v, password, ...data} = this.toObject()
    return data
 }

module.exports = model( 'UserWeb2', UserWebSchema )