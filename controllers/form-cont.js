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

const crearActividad = async (req = request, res = response) => {
  // let errors = [];
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
    // archivo,
  } = req.body;

  // console.log(req.files);

  // if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
  //   res.status(400).json({
  //     msg: "No hay archivos cargados."
  //   });
  //   return;
  // }
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
  console.log(archivo)
  try {
    const newActividad = new Actividad({fecha, responsable, semestre, modulo, area, materia, carrera, tip_actividad, desc_actividad, archivo})
    await newActividad.save()
    res.status(200).json({
      msg: 'Actividad guardada correctamente'
    })
    
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

module.exports = {
  crearActividad,
  obtenerActividad,
};
