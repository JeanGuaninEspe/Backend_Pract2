import { Router } from 'express';

import { validarJWT } from '../middlewares/validar-jwt.js';

import  {
  actualizarUsuario,
  ageregarTelefonos,
  agregarDireccion,
  agregarTelefono,
  eliminarTelefono,
  enviarNotificacionesArrayTelefonos,
  getUsuarios,
  actualizarTelefonoOrNombre,
  actualizarIsOpenRoom,
  marcarPublicacionPendienteFalse,
  marcarSalaPendienteFalse,
  marcarNotificacionesPendienteFalse,
  eliminarTokenApp,
  cambiarContrasena
} from "../controllers/usuarios.js";

const router = Router();

router.delete("/delete-telefono", validarJWT, eliminarTelefono );
router.get("/", validarJWT, getUsuarios);
router.post("/notificacion", validarJWT, enviarNotificacionesArrayTelefonos);
router.put("/", validarJWT, actualizarUsuario);
router.put("/actualizar-is-open-room", validarJWT, actualizarIsOpenRoom);
router.put("/add-direccion", validarJWT, agregarDireccion);
router.put("/add-telefono", validarJWT, agregarTelefono );
router.put("/add-telefonos", validarJWT, ageregarTelefonos );
router.put("/add-telefono-nombre", validarJWT, actualizarTelefonoOrNombre );
router.put("/marcar-publicacion-pendiente-false", validarJWT, marcarPublicacionPendienteFalse );
router.put("/marcar-sala-pendiente-false", validarJWT, marcarSalaPendienteFalse );
router.put("/marcar-notificaciones-pendiente-false", validarJWT, marcarNotificacionesPendienteFalse );
router.delete("/delete-token-app", validarJWT, eliminarTokenApp );
router.put("/cambiar-contrasena", validarJWT, cambiarContrasena);

export default router;
