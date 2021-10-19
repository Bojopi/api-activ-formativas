const { Schema, model } = require("mongoose");

const ActividadSchema = Schema({
  fecha: {
    type: String,
    required: true,
  },
  responsable: {
    type: String,
    required: true,
    // type: Schema.Types.ObjectId,
    // ref: 'User',
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
    required: false,
  },
  estado: {
    type: String,
    default: "Pendiente",
  },
  date: {
    type: Date,
    required: true
  },
  observacion: {
    type: String,
    required: false
  }
});

ActividadSchema.methods.toJSON = function () {
  const { __v, ...data } = this.toObject();
  return data;
};

module.exports = model("Actividades", ActividadSchema);
