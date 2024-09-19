import { Router } from "express";
import { check } from"express-validator";
import { validarJWT } from"../middlewares/validar-jwt.js";
import { validarCampos } from"../middlewares/validar-campos.js";
import {
  obtenerUbicaciones,
  crearUbicacion,
  obtenerUbicacionesPorUsuario,
  agregarUbicacion,
  eliminarUbicacion,
} from "../controllers/ubicaciones.js";
import { validacionesUbicacion } from "../middlewares/express-validator.js";

const router = Router();
router.get("/", obtenerUbicaciones);

router.post("/", [validacionesUbicacion, validarCampos], crearUbicacion);

router.get("/", validarJWT, obtenerUbicacionesPorUsuario);

router.put("/:id", validarJWT, agregarUbicacion);

router.delete("/:id", validarJWT, eliminarUbicacion);
export default router;
