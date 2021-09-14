const path = require('path')

const { response, request } = require("express");
const Actividad = require("../models/form-model");
const { subirArchivos } = require('../helpers');

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

const obtenerActividadPendiente = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query;

  let query = {estado: "Pendiente"}

  const actividades = await Actividad.find(query);
  // .skip(Number(desde))
  // .limit(Number(limite))

  const total = await Actividad.countDocuments(query);

  res.json({
    total,
    actividades,
  });
};

const obtenerActividadAceptada = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query;

  let query = {estado: "Aceptado"}

  const actividades = await Actividad.find(query);
  // .skip(Number(desde))
  // .limit(Number(limite))

  const total = await Actividad.countDocuments(query);

  res.json({
    total,
    actividades,
  });
};

const obtenerActividadRechazada = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query;

  let query = {estado: "Rechazado"}

  const actividades = await Actividad.find(query);
  // .skip(Number(desde))
  // .limit(Number(limite))

  const total = await Actividad.countDocuments(query);

  res.json({
    total,
    actividades,
  });
};

const obtenerActividadObservada = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query;

  let query = {estado: "Observado"}

  const actividades = await Actividad.find(query);
  // .skip(Number(desde))
  // .limit(Number(limite))

  const total = await Actividad.countDocuments(query);

  res.json({
    total,
    actividades,
  });
};

const crearActividad = async (req = request, res = response) => {
  // let errors = [];
  const {
    fecha,
    // responsable,
    semestre,
    modulo,
    area,
    materia,
    carrera,
    tip_actividad,
    desc_actividad,
    // archivo,
  } = req.body;

  // console.log(req.files);

  // if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
  //   res.status(400).json({
  //     msg: "No hay archivos cargados."
  //   });
  //   return;
  // }

  const date = new Date()
  // console.log(date)

  let archivo = ''
  try {
    const nombreArchivo = await subirArchivos(req.files)
    archivo = nombreArchivo
    // res.json({
    //   nombreArchivo
    // })
  } catch (error) {
    res.status(400).json({error})
  }
  // console.log(archivo)
  try {
    // const newActividad = new Actividad({fecha, responsable, semestre, modulo, area, materia, carrera, tip_actividad, desc_actividad, archivo, date})
    const newActividad = new Actividad({fecha, semestre, modulo, area, materia, carrera, tip_actividad, desc_actividad, archivo, date})
    newActividad.responsable = req.usuario.id
    await newActividad.save()
    // res.status(200).json({
    //   msg: 'Actividad guardada correctamente'
    // })
    
  } catch (error) {
    res.status(400).json({error})
  }
  
  // const { archivo } = req.files;

  // //validar la extensión del archivo
  // const nomCortado = archivo.name.split('.')
  // const extension = nomCortado[nomCortado.length - 1]

  // const extensionValida = ['docx']
  // if(!extensionValida.includes(extension)) {
  //   return res.status(400).json({
  //     msg: `La extension: ${extension} no es permitida, solo se permiten archivos ${extensionValida}`
  //   })
  // }

  // res.json({extension})

  // const uploadPath = path.join(__dirname, "../uploads/", archivo.name)

  // archivo.mv(uploadPath, (err) => {
  //   if (err) {
  //     return res.status(500).json({err});
  //   }

  //   res.send("File uploaded to " + uploadPath);
  // });

  // res.json({
  //   msg: "actividad creada",
  // });
  
  // console.log(req.files)
  
};

const actualizarEstado = async (req = request, res = response) => {

  const { id } = req.params

  // let query = {estado: "Aceptado"}

  const { estado = '' } = req.query

  try {
    const actividad = await Actividad.findByIdAndUpdate(id, {estado})
    res.json({actividad})
  } catch (error) {
    res.status(400).json({error})
  }
};

module.exports = {
  crearActividad,
  obtenerActividad,
  obtenerActividadPendiente,
  obtenerActividadAceptada,
  obtenerActividadRechazada,
  obtenerActividadObservada,
  actualizarEstado,
};
