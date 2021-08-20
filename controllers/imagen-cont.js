const { response } = require("express");

const { Imagen } = require("../models");

const crearImagen = async(req, res = response) => {
  const {...body} = req.body

  const imagenDB = await Imagen.findOne({img: body.img})

  if (imagenDB) {
    return res.status(400).json({
      msg: `La imagen ${imagenDB.img} ya existe`
    })
  }

  const data = {
    ...body,
    titulo: body.titulo.toUpperCase()
  }

  const imagen = new Imagen( data )

  //guardar en la DB
  await imagen.save()

  res.status(201).json(imagen)
}

const obtenerImagenPorId = async (req, res = response) => {
  const { id } = req.params;
  const imagen = await Imagen.findById(id).populate(
    "img",
    "descripcion",
    "categoria"
  );

  res.json(imagen);
};

module.exports = {
  obtenerImagenPorId,
  crearImagen,
};
