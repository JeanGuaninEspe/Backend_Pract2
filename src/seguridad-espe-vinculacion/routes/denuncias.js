import { Router } from 'express';
import { check } from "express-validator";
import { validarJWT } from "../middlewares/validar-jwt.js";

const router = Router();

import { validarCampos } from "../middlewares/validar-campos.js";
import { guardarDenuncia } from "../controllers/denuncias.js";

router.post( "/", [
    check("publicacionId", "El id de la publicación es obligatorio").not().isEmpty(),
    check("motivo", "El motivo es obligatorio").not().isEmpty(),
    validarCampos,
    validarJWT,
], guardarDenuncia );

export default router;