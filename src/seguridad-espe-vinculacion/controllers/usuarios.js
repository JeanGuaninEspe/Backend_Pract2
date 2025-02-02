import { response } from 'express';
import models from '../models/index.js';
const { Usuario } = models;
import  bcrypt from "bcryptjs";
import  {
  enviarNotificacion,
  guardarNotificacionSOS,
} from "../helpers/enviar-notificacion.js";

export const getUsuarios = async (req, res = response) => {
  const desde = Number(req.query.desde) || 0;

  const usuarios = await Usuario.find({ _id: { $ne: req.uid } })
    .sort("-online")
    .skip(desde)
    .limit(20);

  res.json({
    ok: true,
    usuarios,
  });
};

export const actualizarUsuario = async (req, res) => {
  const uid = req.uid;
  const { nombre, email, online, password, telefono, ...resto } = req.body;

  try {
    // Busca y actualiza el usuario por su ID
    const usuario = await Usuario.findByIdAndUpdate(uid, resto, { new: true });

    res.json({
      ok: true,
      usuario,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};

export const actualizarIsOpenRoom = async (req, res) => {
  const uid = req.uid;
  const { isOpenRoom } = req.body;

  try {
    // Busca y actualiza el usuario por su ID
    const usuario = await Usuario.findByIdAndUpdate(
      uid,
      { isOpenRoom },
      { new: true }
    );

    res.json({
      ok: true,
      usuario,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};

export const actualizarTelefonoOrNombre = async (req, res) => {
  const uid = req.uid;
  const { nombre, telefono } = req.body;
  try {
    // Busca y actualiza el usuario por su ID
    const usuario = await Usuario.findByIdAndUpdate(
      uid,
      { nombre, telefono },
      { new: true }
    );

    res.json({
      ok: true,
      usuario,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};

// Controlador para agregar una nueva dirección a un usuario
export const agregarDireccion = async (req, res) => {
  const idUsuario = req.uid;
  const { latitud, longitud } = req.body;

  try {
    const usuario = await Usuario.findById(idUsuario);

    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    const nuevaDireccion = {
      latitud,
      longitud,
    };

    usuario.direcciones.push(nuevaDireccion);

    await usuario.save();

    res.status(201).json({ mensaje: "Dirección agregada", usuario });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al agregar la dirección" });
  }
};

export const ageregarTelefonos = async (req, res) => {
  const idUsuario = req.uid;

  const { telefono } = req.body;

  try {
    const usuario = await Usuario.findById(idUsuario);

    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    // Verificar si el teléfono ya está asociado al usuario
    if (usuario.telefonos.includes(telefono)) {
      return res.status(400).json({
        ok: false,
        msg: "El teléfono ya está asociado al usuario",
      });
    }

    usuario.telefonos.push(telefono);
    await usuario.save();

    res.status(201).json({ mensaje: "Teléfono agregado", usuario });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al agregar el teléfono" });
  }
};

export const eliminarTelefono = async (req, res) => {
  const idUsuario = req.uid;
  const { telefono } = req.body;

  try {
    const usuario = await Usuario.findById(idUsuario);

    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    // Verificar si el teléfono está asociado al usuario
    if (!usuario.telefonos.includes(telefono)) {
      return res.status(400).json({
        ok: false,
        msg: "El teléfono no está asociado al usuario",
      });
    }

    // Eliminar el teléfono del arreglo
    usuario.telefonos = usuario.telefonos.filter((tel) => tel !== telefono);
    await usuario.save();

    res.status(200).json({ mensaje: "Teléfono eliminado", usuario });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al eliminar el teléfono" });
  }
};

export const agregarTelefono = async (req, res) => {
  const idUsuario = req.uid;
  const { telefono } = req.body;

  try {
    const usuario = await Usuario.findById(idUsuario);

    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    usuario.telefono = telefono;
    await usuario.save();

    res.status(201).json({ mensaje: "Teléfono agregado", usuario });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al agregar el teléfono" });
  }
};

export const enviarNotificacionesArrayTelefonos = async (req, res) => {
  const idUsuario = req.uid;
  const { lat, lng } = req.body;

  try {
    const usuario = await Usuario.findById(idUsuario).populate(
      "ubicaciones",
      "latitud longitud"
    );

    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    const telefonos = usuario.telefonos; // Obtener el arreglo de teléfonos del usuario

    const usuariosConTelefono = await Usuario.find({
      telefono: { $in: telefonos },
    });
    const tokens = usuariosConTelefono.map((usuario) => usuario.tokenApp);

    const titulo = `${usuario.nombre} necesita ayuda`;
    const contenido = "Presiona para ver la ubicación";

    //TODO: Notificación SOS
    const data = {
      nombre: usuario.nombre,
      latitud: lat,
      longitud: lng,
      img: usuario.img,
      google: usuario.google,
      type: "sos",
    };

    await enviarNotificacion(tokens, titulo, contenido, data);

    for (const usuarioDestino of usuariosConTelefono) {
      await guardarNotificacionSOS(
        usuarioDestino._id,
        contenido,
        usuario.telefono,
        lat,
        lng,
        idUsuario
      );
      //TODO: Verificar si el usuario tiene la app abierta
      usuarioDestino.isNotificacionesPendiente = true;
      await usuarioDestino.save();
    }
    res
      .status(200)
      .json({ mensaje: "Notificación enviada", usuarios: usuariosConTelefono });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al enviar la notificación" });
  }
};

export const marcarPublicacionPendienteFalse = async (req, res) => {
  const idUsuario = req.uid;

  try {
    const usuario = await Usuario.findById(idUsuario);

    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }
    usuario.isPublicacionPendiente = false;
    await usuario.save();

    res.status(200).json({
      mensaje: "Campo isPublicacionPendiente actualizado a false",
      usuario,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ mensaje: "Error al actualizar el campo isPublicacionPendiente" });
  }
};

export const marcarSalaPendienteFalse = async (req, res) => {
  const idUsuario = req.uid;

  try {
    const usuario = await Usuario.findById(idUsuario);

    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    usuario.isSalasPendiente = false;
    await usuario.save();

    res
      .status(200)
      .json({ mensaje: "Campo isSalaPendiente actualizado a false", usuario });
  } catch (error) {
    console.error(error);
    res

      .status(500)
      .json({ mensaje: "Error al actualizar el campo isSalaPendiente" });
  }
};

//isNotificacionesPendiente
export const marcarNotificacionesPendienteFalse = async (req, res) => {
  const idUsuario = req.uid;

  try {
    const usuario = await Usuario.findById(idUsuario);

    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    usuario.isNotificacionesPendiente = false;
    await usuario.save();

    res.status(200).json({
      mensaje: "Campo isNotificacionesPendiente actualizado a false",
      usuario,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        mensaje: "Error al actualizar el campo isNotificacionesPendiente",
      });
  }
};

export const eliminarTokenApp = async (req, res) => {
  const uid = req.uid;

  try {
    // Busca y actualiza el usuario por su ID para eliminar el tokenApp
    const usuario = await Usuario.findByIdAndUpdate(
      uid,
      { $unset: { tokenApp: "" } },
      { new: true }
    );

    res.json({
      ok: true,
      usuario,
      msg: "El tokenApp ha sido eliminado correctamente.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};

export const cambiarContrasena = async (req, res) => {
  const { email, contrasenaActual, nuevaContrasena } = req.body;

  try {
    // Buscar al usuario por su correo electrónico
    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(404).json({
        ok: false,
        msg: "Usuario no encontrado",
      });
    }

    // Verificar si la contraseña actual es válida
    const contrasenaValida = bcrypt.compareSync(
      contrasenaActual,
      usuario.password
    );

    if (!contrasenaValida) {
      return res.status(400).json({
        ok: false,
        msg: "La contraseña actual no es válida",
      });
    }

    // Encriptar la nueva contraseña y actualizarla en la base de datos
    const salt = bcrypt.genSaltSync();
    const nuevaContrasenaEncriptada = bcrypt.hashSync(nuevaContrasena, salt);
    
    usuario.password = nuevaContrasenaEncriptada;
    await usuario.save();

    res.json({
      ok: true,
      msg: "Contraseña cambiada exitosamente",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};


export default {
  getUsuarios,
  actualizarUsuario,
  agregarDireccion,
  ageregarTelefonos,
  agregarTelefono,
  eliminarTelefono,
  enviarNotificacionesArrayTelefonos,
  actualizarTelefonoOrNombre,
  actualizarIsOpenRoom,
  marcarPublicacionPendienteFalse,
  marcarSalaPendienteFalse,
  marcarNotificacionesPendienteFalse,
  eliminarTokenApp,
  cambiarContrasena
};
