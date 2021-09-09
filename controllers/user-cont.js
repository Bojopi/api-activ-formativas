const { response, request } = require("express");
const User = require("../models/user-model");
const jwt = require("jsonwebtoken");

const obtenerUser = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const usuarios = await User.find();
  // .skip(Number(desde))
  // .limit(Number(limite))

  const total = await User.countDocuments();

  res.json({
    total,
    usuarios,
  });
};

const crearUser = async (req = request, res = response) => {
  let errors = [];
  const { username, name, lastname, phone, password, confirm_password } =
    req.body;
  const { categoria = '' } = req.query;

  if (password != confirm_password) {
    errors.push({ text: "las contraseñas no coinciden" });
    res.json({
      errors,
    });
  }
  if (errors.length > 0) {
    res.status(500).json({
      msg: "Hubo un error",
    });
  } else {
    const nomusuario = await User.findOne({ username: username });
    if (nomusuario) {
      res.json({
        msg: "el usuario ya está en uso",
      });
    } else {
      if (categoria != "") {
        const newUser = new User({
          username,
          name,
          lastname,
          phone,
          password,
          categoria,
        });
        newUser.password = await newUser.encryptPassword(password);
        await newUser.save();

        //crear y firmar el JWT
        const payload = {
            usuario: {
                id: newUser.id
            }
        }

        jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 3600
        }, (error, token) => {
            if(error) throw error;

            res.json({ token })
        })

        // res.status(200).json({
        //   newUser,
        // });
      } else {
        const newUser = new User({ username, name, lastname, phone, password });
        newUser.password = await newUser.encryptPassword(password);
        await newUser.save();

        //crear y firmar el JWT
        const payload = {
            usuario: {
                id: newUser.id
            }
        }

        jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 3600
        }, (error, token) => {
            if(error) throw error;

            res.json({ token })
        })

        // res.status(200).json({
        //   newUser,
        // });
      }
    }
  }
};

module.exports = {
  obtenerUser,
  crearUser,
};
