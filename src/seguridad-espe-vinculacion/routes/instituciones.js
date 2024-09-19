import { Router } from "express";
import { check } from "express-validator";
import { validarJWT } from "../middlewares/validar-jwt.js";
import {
obtenerTodasLasInstituciones,
guardarInstitucion
} from "../controllers/instituciones.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { coleccionesPermitidas } from "../helpers/db-validator.js";

const router = Router();

router.get("/", obtenerTodasLasInstituciones);

router.post("/", guardarInstitucion);

export default router;
