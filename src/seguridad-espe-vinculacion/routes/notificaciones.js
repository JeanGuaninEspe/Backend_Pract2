import { Router } from 'express';
import { check } from "express-validator";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { obtenerNotificacionesUsuario, marcarNotificacionComoLeida, deleteAllNotifications, deleteNotificationById } from "../controllers/notificaciones.js";

const router = Router();

router.get("/", validarJWT, obtenerNotificacionesUsuario);


router.put("/:id", validarJWT, marcarNotificacionComoLeida);

router.delete("/", validarJWT, deleteAllNotifications);

router.delete("/:id", validarJWT, deleteNotificationById);
    
export default router;