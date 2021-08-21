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
    const { username, name, lastname, phone, password, confirm_password } = req.body;
    // res.json({
    //     username,
    //     name,
    //     lastname,
    //     phone,
    //     password
    // })

    if(password != confirm_password) {
        errors.push({text: "las contraseñas no coinciden"})
        res.json({
            errors
        })
    }
    if(errors.length > 0) {
        res.status(500).json({
            msg:"Hubo un error"
        })
    } else {
        const email = await User.findOne({ username: username})
        if(email){
            res.json({
                msg:"el usuario ya está en uso"
            })
        } 
        else{
            const newUser = new User({username, name, lastname, phone, password})
            newUser.password = await newUser.encryptPassword(password)
            await newUser.save()
            res.status(200).json({
                newUser
            })
        }
    }
};

module.exports = {
  obtenerUser,
  crearUser
};
