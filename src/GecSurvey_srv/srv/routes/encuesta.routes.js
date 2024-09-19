import { Router } from "express";
import * as EncuestaCtrl from '../controllers/encuesta.controller.js'

const router = Router();

router.post('/', EncuestaCtrl.registrarEncuesta);

export default router;