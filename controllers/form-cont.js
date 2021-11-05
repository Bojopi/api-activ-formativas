const path = require('path')

const { response, request } = require("express");
const Actividad = require("../models/form-model");
const Materia = require("../models/materia-model");
const Carrera = require("../models/carrera-model");
const { subirArchivos } = require('../helpers');

const obtenerActividad = async (req, res = response) => {
  try {
    const actividades = await Actividad.find()
    const total = await Actividad.countDocuments()
    res.status(200).json({
      total,
      actividades
    })
  } catch (error) {
    res.status(400).json({ error })
  }
}

const obtenerActividadPorUsuario = async (req, res = response) => {
  // const { limite = 5, desde = 0 } = req.query;
  
  try {
    const actividades = await Actividad.find({ responsable: req.usuario.id });
  // .skip(Number(desde))
  // .limit(Number(limite))

    const total = await Actividad.countDocuments({ responsable: req.usuario.id });

  res.json({
    total,
    actividades,
  });
  } catch (error) {
    res.status(400).json({ error })
  }
};

const obtenerActividadPendiente = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query;

  let query = {estado: "Pendiente"}

  try {
    const actividades = await Actividad.find(query);
    // .skip(Number(desde))
    // .limit(Number(limite))
  
    const total = await Actividad.countDocuments(query);
    res.json({
      total,
      actividades,
    });
  } catch (error) {
    res.status(400).json({ error })
  }
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

const crearActividad = async (req, res = response) => {
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

  // console.log(req);
  console.log(req.file.name);
  return

  // if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
  //   res.status(400).json({
  //     msg: "No hay archivos cargados."
  //   });
  //   return;
  // }

  const date = new Date()
  // console.log(date)

  // let archivo = ''
  try {
    // const nombreArchivo = await subirArchivos(req.files)
    // archivo = nombreArchivo + ' ' + date
    const newActividad = new Actividad({fecha, responsable, semestre, modulo, area, materia, carrera, tip_actividad, desc_actividad, date})
    // newActividad.responsable = req.usuario.username
    await newActividad.save()
    res.status(200).json({
      msg: 'Actividad guardada correctamente',
      newActividad
    })
  } catch (error) {
    console.log(error)
    res.status(400).json({error, msg: 'aqui llegó el error'})
  }  
};

// const crearActividad = async (req, res = response) => {
//   const {
//     fecha,
//     responsable,
//     semestre,
//     modulo,
//     area,
//     materia,
//     carrera,
//     tip_actividad,
//     desc_actividad,
//     // archivo,
//   } = req.body;

//   // console.log(req);
//   console.log(req.file);

//   // if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
//   //   res.status(400).json({
//   //     msg: "No hay archivos cargados."
//   //   });
//   //   return;
//   // }

//   const date = new Date()
//   // console.log(date)

//   // let archivo = ''
//   try {
//     const nombreArchivo = await subirArchivos(req.files)
//     archivo = nombreArchivo + ' ' + date
//     const newActividad = new Actividad({fecha, responsable, semestre, modulo, area, materia, carrera, tip_actividad, desc_actividad, archivo, date})
//     // newActividad.responsable = req.usuario.username
//     await newActividad.save()
//     res.status(200).json({
//       msg: 'Actividad guardada correctamente',
//       newActividad
//     })
//   } catch (error) {
//     console.log(error)
//     res.status(400).json({error, msg: 'aqui llegó el error'})
//   }
//   // console.log(archivo)


//   // try {
//   //   // const newActividad = new Actividad({fecha, responsable, semestre, modulo, area, materia, carrera, tip_actividad, desc_actividad, archivo, date})
//   //   const newActividad = new Actividad({fecha, semestre, modulo, area, materia, carrera, tip_actividad, desc_actividad, archivo, date})
//   //   newActividad.responsable = req.usuario.id
//   //   await newActividad.save()
//   //   // res.status(200).json({
//   //   //   msg: 'Actividad guardada correctamente'
//   //   // })
    
//   // } catch (error) {
//   //   res.status(400).json({error})
//   // }
  
//   // const { archivo } = req.files;

//   // //validar la extensión del archivo
//   // const nomCortado = archivo.name.split('.')
//   // const extension = nomCortado[nomCortado.length - 1]

//   // const extensionValida = ['docx']
//   // if(!extensionValida.includes(extension)) {
//   //   return res.status(400).json({
//   //     msg: `La extension: ${extension} no es permitida, solo se permiten archivos ${extensionValida}`
//   //   })
//   // }

//   // res.json({extension})

//   // const uploadPath = path.join(__dirname, "../uploads/", archivo.name)

//   // archivo.mv(uploadPath, (err) => {
//   //   if (err) {
//   //     return res.status(500).json({err});
//   //   }

//   //   res.send("File uploaded to " + uploadPath);
//   // });

//   // res.json({
//   //   msg: "actividad creada",
//   // });
  
//   // console.log(req.files)
  
// };

const buscarMateria = async (req = request, res = response) => {
  let { nom_materia = '' } = req.query

  let materias = []

  try {
    const materia = await (await Materia.find({nom_materia: new RegExp(nom_materia,'i')})).forEach((mat) => {
      materias.push(mat.nom_materia)
    })
    res.json({materias})
  } catch (error) {
    res.status(400).json({error})
  }
}

const buscarCarrera = async (req = request, res = response) => {
  let { nom_carrera = '' } = req.query

  let carreras = []

  try {
    const carrera = await (await Carrera.find({nom_carrera: new RegExp(nom_carrera,'i')})).forEach((car) => {
      carreras.push(car.nom_carrera)
    })
    res.json({carreras})
  } catch (error) {
    res.status(400).json({error})
  }
}

const actualizarEstado = async (req = request, res = response) => {

  const { id } = req.params

  // let query = {estado: "Aceptado"}

  const { estado = '' } = req.query

  try {
    const actividad = await Actividad.findByIdAndUpdate(id, {estado})
    console.log(actividad)
    res.json({actividad})
  } catch (error) {
    res.status(400).json({error})
  }
};

module.exports = {
  crearActividad,
  obtenerActividad,
  obtenerActividadPorUsuario,
  obtenerActividadPendiente,
  obtenerActividadAceptada,
  obtenerActividadRechazada,
  obtenerActividadObservada,
  actualizarEstado,
  buscarMateria,
  buscarCarrera,
};
