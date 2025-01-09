import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import cloudinary from '../helpers/cloudinaryConfig.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const subirArchivoUsuario = (
  archivo,
  extensionesValidas = ["png", "jpg", "jpeg", "gif"],
  carpeta = ""
) => {
  return new Promise((resolve, reject) => {
    const nombreCortado = archivo.archivo.name.split(".");
    const extension = nombreCortado[nombreCortado.length - 1];

    if (!extensionesValidas.includes(extension)) {
      return reject(`La extensión ${extension} no es permitida - ${extensionesValidas}`);
    }

    const nombreTemp = uuidv4() + "." + extension;
    const uploadPath = path.join(__dirname, "../uploads/", carpeta, nombreTemp);

    archivo.mv(uploadPath, async (err) => {
      if (err) {
        reject(err);
      }

      try {
        const result = await cloudinary.uploader.upload(uploadPath, {
          folder: carpeta,
        });
        resolve(result.secure_url);
      } catch (error) {
        reject(error);
      }
    });
  });
};

export const subirArchivoPublicacion = (
  archivo,
  extensionesValidas = ["png", "jpg", "jpeg", "gif"],
  carpeta = ""
) => {
  return new Promise((resolve, reject) => {
    const nombreCortado = archivo.archivo.name.split(".");
    const extension = nombreCortado[nombreCortado.length - 1];

    if (!extensionesValidas.includes(extension)) {
      return reject(`La extensión ${extension} no es permitida - ${extensionesValidas}`);
    }

    const nombreTemp = uuidv4() + "." + extension;
    const uploadPath = path.join(__dirname, "../uploads/", carpeta, nombreTemp);

    archivo.mv(uploadPath, async (err) => {
      if (err) {
        reject(err);
      }

      try {
        const result = await cloudinary.uploader.upload(uploadPath, {
          folder: carpeta,
        });
        resolve(result.secure_url);
      } catch (error) {
        reject(error);
      }
    });
  });
};