import { Router } from 'express';
import {validarJWT} from '../middlewares/validar-jwt.js';
import { getComentariosByPublicacion, createComentario, toggleLikeComentario } from '../controllers/comentarios.js';

const router = Router();

router.get("/:publicacionId", validarJWT, getComentariosByPublicacion);

router.post("/", validarJWT, createComentario);

router.put("/like/:id", validarJWT, toggleLikeComentario);

export default router;