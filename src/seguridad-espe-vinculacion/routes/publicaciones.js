import { Router } from 'express';
// import { check } from 'express-validator.js';
import { validarJWT } from '../middlewares/validar-jwt.js';
import {
  obtenerPublicacionesUsuario,
  guardarPublicacion,
  getPublicacionesPorUnidadEducativa,
  updatePublicacion,
  likePublicacion,
  guardarListArchivo,
  isPublicacionFinalizada,
  deletePublicacion,
  actualizarDescripcion,
} from "../controllers/publicaciones.js";
import { validarCampos } from "../middlewares/validar-campos.js";

import { validacionesCrearPublicacion } from "../middlewares/express-validator.js" ;

const router = Router();

router.get("/", validarJWT, obtenerPublicacionesUsuario);

router.get("/cercanas", validarJWT, getPublicacionesPorUnidadEducativa);

router.put("/like2/:id", validarJWT, likePublicacion);

router.post("/", [...validacionesCrearPublicacion, validarCampos, validarJWT], guardarPublicacion);

router.put("/:id", validarJWT, updatePublicacion);

router.post("/listaArchivos/:uid/:titulo",validarCampos, guardarListArchivo);

router.put("/like", validarJWT, updatePublicacion);

router.put("/marcar-publicacion-pendiente-false/:publicacionId", validarJWT, isPublicacionFinalizada);

//deletePublicacion
router.delete("/:id", validarJWT, deletePublicacion);



router.put("/actualizarDescripcion/:id", validarJWT, actualizarDescripcion);

export default router;
