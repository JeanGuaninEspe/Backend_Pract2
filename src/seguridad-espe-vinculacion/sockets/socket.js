import { comprobarJWT } from "../helpers/jwt.js";
import { io } from "../../app.js";
import {
  usuarioConectado,
  usuarioDesconectado,
  grabarMensajeSala,
  grabarComentarioPublicacion,
} from "../controllers/socket.js";

// Mensajes de Sockets
io.on("connection", (client) => {
  console.log("Cliente conectado");

  const token = client.handshake.headers["x-token"];
  if (!token) {
    console.log("No hay token en la solicitud");
    return client.disconnect();
  }
  console.log(`Token recibido: ${token}`);

  const [valido, uid] = comprobarJWT(token);
  if (!valido) {
    console.log("Token no válido");
    return client.disconnect();
  }

  usuarioConectado(uid);
  console.log(`Cliente autenticado: ${uid}`);

  client.on("join-room", async (payload) => {
    const { codigo } = payload;
    console.log(`Código de sala recibido: ${codigo}`);

    const [valido, uid] = comprobarJWT(client.handshake.headers["x-token"]);
    if (!valido) {
      console.log("Token inválido en join-room");
      return client.disconnect();
    } else {
      client.join(codigo);
      console.log(`Cliente ${uid} se unió a la sala ${codigo}`);
    }
  });

  client.on("mensaje-grupal", async (payload) => {
    console.log(`Mensaje grupal recibido: ${JSON.stringify(payload)}`);
    const result = await grabarMensajeSala(payload);
    if (result) {
      client.broadcast.to(payload.para).emit("mensaje-grupal", payload);
      console.log(`Mensaje grupal enviado a ${payload.para}`);
    } else {
      console.log("Error al grabar el mensaje grupal");
    }
  });

  client.on("comentario-publicacion", async (payload) => {
    console.log(`Comentario en publicación recibido: ${JSON.stringify(payload)}`);
    const result = await grabarComentarioPublicacion(payload);
    if (result) {
      client.broadcast.to(payload.para).emit("comentario-publicacion", payload);
      console.log(`Comentario en publicación enviado a ${payload.para}`);
    } else {
      console.log("Error al grabar el comentario en la publicación");
    }
  });

  client.on("disconnect", () => {
    usuarioDesconectado(uid);
    console.log(`Cliente desconectado: ${uid}`);
  });
});
