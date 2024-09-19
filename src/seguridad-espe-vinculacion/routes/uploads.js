import { Router } from 'express';
import { check } from 'express-validator';
import { validarJWT } from '../middlewares/validar-jwt.js';

import { validarArchivoSubir } from "../middlewares/validar-archivo.js";
import {
  cargarArchivo,
  mostrarImagen,
  mostrarAllImagenes,
  actualizarImagen,
  mostrarImagenUsuario,
} from "../controllers/uploads.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { coleccionesPermitidas } from "../helpers/db-validator.js";

const router = Router();

router.post("/", validarArchivoSubir, cargarArchivo);

router.get(
  "/:coleccion/:id",
  [
    check("id", "El id debe de ser de mongo").isMongoId(),
    // check('coleccion').custom( c => coleccionesPermitidas( c, ['usuarios','publicaciones'] ) ),
    validarCampos,
  ],
  mostrarImagen
);

router.get(
  "/usuario/:coleccion/:id",
  [
    check("id", "El id debe de ser de mongo").isMongoId(),
    // check('coleccion').custom( c => coleccionesPermitidas( c, ['usuarios','publicaciones'] ) ),
    validarCampos,
  ],
  mostrarImagenUsuario
);


router.get("/imagenes/:coleccion/:id", mostrarImagen);

router.put('/:coleccion/:id', [
    validarArchivoSubir,
    check('id','El id debe de ser de mongo').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas( c, ['usuarios','publicaciones'] ) ),
    validarCampos
], actualizarImagen  )

export default router;
