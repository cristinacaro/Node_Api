const { Router } = require("express");
const { check } = require("express-validator");
const authRouter = Router();
const {
  registerUsuario,
  loginUsuario,
} = require("../controllers/authController");
const validationErrors = require("../middlewares/validationErrors");



authRouter.post(
  "/register",
  [
    check("email", "El formato es invalido").isEmail(),
    check("password", "Contraseña debe tener minimo 6 caracteres").isLength({
      min: 6,
    }),
    check("username", "El nombre de usuario es requerido").not().isEmpty(),
    validationErrors,
  ],
  registerUsuario
);
authRouter.post(
  "/login",
  [
    check("email", "El formato es invalido").isEmail(),
    check("password", "Contraseña debe tener minimo 6 caracteres").isLength({
      min: 6,
    }),
    validationErrors,
  ],
  loginUsuario
);

module.exports = authRouter;
