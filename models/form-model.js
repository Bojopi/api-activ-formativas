const { Schema, model } = require("mongoose");

const ActividadSchema = Schema({
  fecha: {
    type: String,
    required: true,
  },
  responsable: {
    type: String,
    required: true,
  },
  semestre: {
    type: String,
    required: true,
  },
  modulo: {
    type: String,
    required: true,
  },
  area: {
    type: String,
    required: true,
  },
  materia: {
    type: String,
    required: false,
  },
  carrera: {
    type: String,
    required: false,
  },
  tip_actividad: {
    type: String,
    required: true,
  },
  desc_actividad: {
    type: String,
    required: true,
  },
  archivo: {
    type: String,
    required: true,
  },
  estado: {
    type: Boolean,
    default: false,
  },
});

ActividadSchema.methods.toJSON = function () {
  const { __v, ...data } = this.toObject();
  return data;
};

module.exports = model("Actividad", ActividadSchema);
