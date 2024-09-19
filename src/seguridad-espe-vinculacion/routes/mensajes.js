/*
    Path: /api/mensajes
*/
import { Router } from 'express';
import { validarJWT } from '../middlewares/validar-jwt.js';

import {
  getAllMessages,
  getMensajeByUser,
  getMensajeByRoom,
} from "../controllers/mensajes.js";

const router = Router();

router.get("/", validarJWT, getAllMessages);

router.get("/get-mensaje-by-user", validarJWT, getMensajeByUser);

router.get("/get-mensaje-by-room/:salaId", validarJWT, getMensajeByRoom);

export default router;
