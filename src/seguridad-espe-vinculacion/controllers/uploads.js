import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { subirArchivoPublicacion } from '../helpers/subir-archivo.js';
import Publicacion from '../models/publicacion.js';
import Usuario from '../models/usuario.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const cargarArchivo = async (req, res) => {
  try {
    const { id } = req.params;

    // Verifica que se haya proporcionado un archivo
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
      return res.status(400).json({ msg: 'No se ha proporcionado un archivo.' });
    }

    // Encuentra la publicación por ID
    const publicacion = await Publicacion.findById(id);

    if (!publicacion) {
      return res.status(404).json({ msg: 'Publicación no encontrada.' });
    }

    // Sube el archivo a la subcarpeta correspondiente
    const nombreArchivo = await subirArchivoPublicacion(req.files.archivo, ["png", "jpg", "jpeg", "gif"], publicacion.categoria);

    // Agrega el nombre del archivo al array de imágenes
    publicacion.imagenes.push(nombreArchivo);
    await publicacion.save(); // Guarda los cambios en la base de datos

    res.json(publicacion); // Devuelve la publicación actualizada
  } catch (error) {
    res.status(500).json({ msg: 'Error al cargar el archivo.', error: error.message });
  }
};

export const mostrarImagen = async (req, res) => {
  const { id, coleccion } = req.params;

  let modelo;

  // Asignación de `modelo` dependiendo de la colección
  switch (coleccion) {
    case 'usuarios':
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un usuario con el id ${id}`
        });
      }
      break;

    case 'publicaciones':
      modelo = await Publicacion.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe una publicación con el id ${id}`
        });
      }
      break;

    default:
      return res.status(500).json({ msg: 'Se me olvidó validar esto' });
  }

  // Verifica si hay imágenes en el array
  const imagen = modelo.imagenes && modelo.imagenes.length > 0 ? modelo.imagenes[0] : 'no-image.jpg';

  // Construcción de la ruta de la imagen, incluyendo la subcarpeta
const categoriasValidas = ['Acososexual', 'Alcoholydrogas', 'Bullying', 'Maltratoescolar', 'Robo', 'Violenciapopares'];
const subcarpeta = categoriasValidas.includes(modelo.categoria) ? modelo.categoria : 'default';
const pathImagen = imagen
console.log(`Ruta de la imagen: ${subcarpeta}`); // Agrega este console.log para ver la ruta

if (fs.existsSync(pathImagen)) {
  return res.sendFile(pathImagen);
}

// Envío de la imagen por defecto si la imagen no existe
const pathImagenDefault = path.join(__dirname, '../assets/no-image.jpg');
console.log(`Ruta de la imagen por defecto: ${pathImagenDefault}`); // Agrega este console.log para ver la ruta por defecto
res.sendFile(pathImagenDefault);
};

export const mostrarAllImagenes = async (req, res) => {
  const { id, coleccion } = req.params;
 
  let modelo;

  switch (coleccion) {
    case 'usuarios':
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return res.status(400).json({ msg: `No existe usuario con id ${id}` });
      }
      break;
    
    case 'publicaciones':
      modelo = await Publicacion.findById(id);
      if (!modelo) {
        return res.status(400).json({ msg: `No existe publicación con id ${id}` });
      }
      // Si existe el modelo y tiene imágenes, devolver el array de imágenes
      if (modelo.imagenes && modelo.imagenes.length > 0) {
        return res.json({
          ok: true,
          imagenes: modelo.imagenes
        });
      }
      break;

    default:
      return res.status(500).json({ msg: 'Colección no válida' });
  }

  // Si no hay imágenes, devolver la imagen por defecto
  const pathImagenDefault = path.join(__dirname, '../assets/no-image.jpg');
  return res.sendFile(pathImagenDefault);
};
export const mostrarImagenUsuario = async (req, res) => {
  const { id, coleccion } = req.params;

  let modelo;

  switch (coleccion) {
    case "usuarios":
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un usuario con el id ${id}`,
        });
      }

      break;

    default:
      return res.status(500).json({ msg: "Se me olvidó validar esto" });
  }

  // Limpiar imágenes previas
  if (modelo.img) {
    // Hay que borrar la imagen del servidor
    const pathImagen = path.join(
      __dirname,
      "../../../uploads",
      coleccion,
      modelo.img
    );
    
    if (fs.existsSync(pathImagen)) {
      return res.sendFile(pathImagen);
    }
  }

  const pathImagenDefault = path.join(__dirname, "../assets/no-image.jpg");
  res.sendFile(pathImagenDefault);
};

export const actualizarImagen = async (req, res) => {
  const { id, coleccion } = req.params;

  let modelo;

  switch (coleccion) {
    case "usuarios":
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un usuario con el id ${id}`,
        });
      }

      break;

    case "publicaciones":
      modelo = await Publicacion.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe una publicación con el id ${id}`,
        });
      }

      break;

    default:
      return res.status(500).json({ msg: "Se me olvidó validar esto" });
  }

  if (modelo.img) {
    // Hay que borrar la imagen del servidor
    const pathImagen = path.join(
      __dirname,
      "../../../uploads",
      coleccion,
      modelo.img
    );
    if (fs.existsSync(pathImagen)) {
      fs.unlinkSync(pathImagen);
    }
  }

  const nombre = await subirArchivoUsuario(req.files, undefined, coleccion);
  modelo.img = nombre;

  await modelo.save();

  res.json(modelo);
};

export default {
  cargarArchivo,
  mostrarImagen,
  mostrarAllImagenes,
  actualizarImagen,
  mostrarImagenUsuario,
};