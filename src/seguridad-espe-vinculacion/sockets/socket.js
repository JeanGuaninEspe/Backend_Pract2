import { enviarNotificacion } from "../helpers/enviar-notificacion.js";
import models from '../models/index.js';

const { Publicacion, Sala, Mensaje, Usuario, Comentario } = models;

export const usuarioConectado = async (uid = "") => {
  if (!uid) return null;

  const usuario = await Usuario.findById(uid);
  if (!usuario) return null;

  usuario.online = true;
  await usuario.save();
  return usuario;
};

export const usuarioDesconectado = async (uid = "") => {
  if (!uid) return null;

  const usuario = await Usuario.findById(uid);
  if (!usuario) return null;

  usuario.online = false;
  await usuario.save();
  return usuario;
};

export const grabarMensaje = async (payload) => {
  try {
    console.log(payload);
    const mensaje = new Mensaje(payload);
    await mensaje.save();
    return true;
  } catch (error) {
    return false;
  }
};

export const grabarMensajeSala = async (payload) => {
  try {
    const { mensaje, de, para } = payload;
    const newMessage = new Mensaje({ mensaje, usuario: de });
    await newMessage.save();

    const sala = await Sala.findById(para);
    sala.mensajes.push(newMessage._id);
    await sala.save();

    const usuariosEnGrupoOffline = await obtenerUsuariosSalaHelper(para, de);

    for (const usuario of usuariosEnGrupoOffline) {
      if (usuario._id.toString() === de) {
        continue;
      }

      usuario.isSalasPendiente = true;
      usuario.isNotificacionesPendiente = true;

      usuario.salas = usuario.salas.map((sala) => {
        if (sala.salaId.toString() === para) {
          sala.mensajesNoLeidos++;
          sala.ultimaVezActivo = new Date();
        }
        return sala;
      });

      await usuario.save();
    }

    const tokens = usuariosEnGrupoOffline.map((usuario) => usuario.tokenApp);
    const titulo = "Nuevo mensaje";
    const desc = `Tienes un nuevo mensaje en el grupo ${sala.nombre}`;

    const data = {
      salaId: sala._id,
      nombre: sala.nombre,
      mensajesNoLeidos: sala.mensajesNoLeidos,
      ultimaVezActivo: sala.ultimaVezActivo,
      type: "sala",
    };

    const allTokens = [].concat(...tokens);
    if (allTokens.length === 0) {
      console.log("No hay tokens");
      return false;
    }

    const response = await enviarNotificacion(allTokens, titulo, desc, data);
    if (response.failure > 0) {
      console.log("Error al enviar notificación:", response.results);
    }

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const obtenerUsuariosSalaHelper = async (salaId, usuarioId) => {
  try {
    const usuariosEnSala = await Usuario.find({
      "salas.salaId": salaId,
      "salas.isRoomOpen": false,
      _id: { $ne: usuarioId },
    });
    return usuariosEnSala;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const grabarComentarioPublicacion = async (payload) => {
  console.log(payload);
  const usuarioId = payload.de;
  try {
    const { mensaje, para } = payload;

    const publicacion = await Publicacion.findById(para);
    if (!publicacion) {
      return res.status(404).json({ error: "Publicación no encontrada" });
    }

    const comentario = new Comentario({
      contenido: mensaje,
      usuario: usuarioId,
      publicacion: para,
      estado: "publicado",
    });

    await comentario.save();

    publicacion.comentarios.push(comentario._id);
    await publicacion.save();

    return comentario._id.toString();
  } catch (error) {
    console.error(error);
    return false;
  }
};

export default {
  usuarioConectado,
  usuarioDesconectado,
  grabarMensaje,
  grabarMensajeSala,
  grabarComentarioPublicacion,
};
