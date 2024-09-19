import { Router } from 'express';
import {
  crearSala,
  getSalas,
  unirseSala,
  obtenerSalasMensajesUsuario,
  getMensajesBySala,
  getMensajesSala,
  updateSala,
  obtenerUsuariosSala,
  deleteSala,
  deleteUserById,
  abandonarSala,
  getSalasByUser,
  obtenerSalasConMensajesNoLeidos,
  cambiarEstadoSala,
} from "../controllers/salas.js";

import { validarJWT } from "../middlewares/validar-jwt.js";

const router = Router();

router.post("/", validarJWT, crearSala);

router.get("/", getSalas);

router.put("/:salaId", updateSala);

router.delete("/:salaId", validarJWT, deleteSala);

router.post("/unir-sala", validarJWT, unirseSala);

router.get(
  "/obtener-salas-mensajes-usuario",
  validarJWT,
  obtenerSalasConMensajesNoLeidos
);

router.put("/cambiar-estado-sala/:salaId", validarJWT, cambiarEstadoSala);

router.get(
  "/obtener-salas-mensajes-usuario",
  validarJWT,
  obtenerSalasMensajesUsuario
);

router.get("/obtener-salas-usuario", validarJWT, getSalasByUser);

router.get("/get-mensajes-by-sala/:salaId", validarJWT, getMensajesBySala);

router.get("/get-mensajes-sala/:salaId", validarJWT, getMensajesSala);

router.get("/obtener-usuarios-sala/:salaId", validarJWT, obtenerUsuariosSala);

router.delete("/delete-user/:salaId/:usuarioId", validarJWT, deleteUserById);

router.delete("/abandonar-sala/:salaId", validarJWT, abandonarSala);

// router.get("/obtener-mensajes-no-leidos/:salaId", validarJWT, obtenerMensajesNoLeidosPorUsuario);

export default router;
