import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const subirArchivoUsuario = (
  archivo,
  extensionesValidas = ["png", "jpg", "jpeg", "gif"],
  carpeta = ""
) => {
  return new Promise((resolve, reject) => {
    // console.log(archivo);
    const nombreCortado = archivo.archivo.name.split(".");
    console.log(nombreCortado);
    const extension = nombreCortado[nombreCortado.length - 1];

    if (!extensionesValidas.includes(extension)) {
      return reject(`La extensión ${extension} no es permitida - ${extensionesValidas}`);
    }

    const nombreTemp = uuidv4() + "." + extension;
    const uploadPath = path.join(__dirname, "../uploads/", carpeta, nombreTemp);

    archivo.mv(uploadPath, (err) => {
      if (err) {
        reject(err);
      }

      resolve(nombreTemp);
    });
  });
};

export const subirArchivoPublicacion = (
  archivo,
  extensionesValidas = ["png", "jpg", "jpeg", "gif"],
  carpeta = ""
) => {
  return new Promise((resolve, reject) => {
    // console.log(archivo);
    const nombreCortado = archivo.archivo.name.split(".");
    const extension = nombreCortado[nombreCortado.length - 1];

    if (!extensionesValidas.includes(extension)) {
      return reject(`La extensión ${extension} no es permitida - ${extensionesValidas}`);
    }

    const nombreTemp = uuidv4() + "." + extension;
    const uploadPath = path.join(__dirname, "../uploads/", carpeta, nombreTemp);

    archivo.mv(uploadPath, (err) => {
      if (err) {
        reject(err);
      }

      resolve(nombreTemp);
    });
  });
};