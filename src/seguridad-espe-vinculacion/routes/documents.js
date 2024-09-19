import { Router } from 'express';
// import { check } from "express-validator";
// import { validarJWT } from "../middlewares/validar-jwt.js";
// import { validarArchivoSubir } from "../middlewares/validar-archivo.js";
// import pdfTemplate from '../prueba/public/pdfTemplate.js';
const router = Router();

import {createDocument,getDocument} from '../controllers/documents.js';

router.post( "/", createDocument );

router.get( "/", getDocument );

export default router;