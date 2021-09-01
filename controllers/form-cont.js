const { response, request } = require("express");
const Actividad = require("../models/form-model");

const obtenerActividad = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const actividades = await Actividad.find();
  // .skip(Number(desde))
  // .limit(Number(limite))

  const total = await Actividad.countDocuments();

  res.json({
    total,
    actividades,
  });
};

const crearActividad = async (req = request, res = response) => {
  let errors = [];
  const {
    fecha,
    responsable,
    semestre,
    modulo,
    area,
    materia,
    carrera,
    tip_actividad,
    desc_actividad,
    archivo,
  } = req.body;

  console.log(req.files);

  if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    res.status(400).json({
      msg: "No hay archivos cargados."
    });
    return;
  }

  sampleFile = req.files.archivo;

  uploadPath = __dirname + "/uploads/" + sampleFile.name;

  sampleFile.mv(uploadPath, function (err) {
    if (err) {
      return res.status(500).send(err);
    }

    res.send("File uploaded to " + uploadPath);
  });

  res.json({
    msg: "actividad creada",
  });
};

module.exports = {
  crearActividad,
  obtenerActividad,
};
