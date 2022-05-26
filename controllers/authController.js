const usuario = require("../models/usuario");
const usuarioModel = require("../models/usuario");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

const registerUsuario = async (req, res) => {
  const { email, password, username } = req.body;
  try {
    let usuario = await usuarioModel.findOne({ email });
    if (usuario) {
      return res.status(501).json({
        ok: false,
        msg: "Correo ya registrado",
      });
    }
    const nuevoUsuario = new usuarioModel({ email, password, username });
    const salt = bcryptjs.genSaltSync(12);
    nuevoUsuario.password = bcryptjs.hashSync(password, salt);
    await nuevoUsuario.save();
    const payload = {
      id: nuevoUsuario.id,
    };
    jwt.sign(
      payload,
      process.env.SECRETA,
      { expiresIn: 3600 },
      (error, token) => {
        res.json({
          ok: true,
          id: nuevoUsuario.id,
          username,
          msg: "Usuario Creado",
          token,
        });
      }
    );
  } catch (error) {
    res.json({
      ok: false,
      msg: "error al registrar",
    });
  }
};

const loginUsuario = async (req, res) => {
  const { email, password } = req.body;

  try {
    let usuario = await usuarioModel.findOne({ email });
    if (!usuario) {
      return res.status(401).json({
        ok: false,
        msg: "Correo o password Invalida",
      });
    }

    const passwordValido = bcryptjs.compareSync(password, usuario.password);
    if (!passwordValido) {
      return res.status(401).json({
        ok: false,
        msg: "Correo o password Invalida",
      });
    }

    const payload = {
      id: usuario.id,
    };

    jwt.sign(
      payload,
      process.env.SECRETA,
      { expiresIn: 3600 },
      (error, token) => {
        res.json({
          ok: true,
          id: usuario.id,
          username: usuario.username,
          msg: "Inicio Session",
          token,
        });
      }
    );
  } catch (error) {
    console.log(error);
    res.json({
      ok: false,
      msg: "Error al iniciar session",
    });
  }
};

module.exports = {
  loginUsuario,
  registerUsuario,
};
