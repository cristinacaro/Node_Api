const { Router } = require("express");
const { check } = require("express-validator");
const {
  createTarea,
  readTarea,
  updateTarea,
  deleteTarea,
} = require("../controllers/TareaController");
const verifyToken = require("../middlewares/verifyToken");
const validationErrors = require("../middlewares/validationErrors");

const router = Router();

router.post(
  "/create",
  [
    check("nombre", "Nombre del proyecto es requerido").not().isEmpty(),
    validationErrors,
    verifyToken,
  ],
  createTarea
);

router.get("/read", [verifyToken], readTarea);

router.put(
  "/update/:id",
  [
    check("nombre", "Nombre del proyecto es requerido").not().isEmpty(),
    validationErrors,
    verifyToken,
    
  ],
  updateTarea
);

router.delete("/delete/:id", [verifyToken], deleteTarea);

module.exports = router;
