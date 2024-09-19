import path from 'path';
import { v4 as uuidv4 } from 'uuid';

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

    const nombreTemp = uuidv4() + "." + extension;
    const uploadPath = path.join(__dirname, "../../../uploads/", carpeta, nombreTemp);

    archivo.archivo.mv(uploadPath, (err) => {
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
    const nombreCortado = archivo.name.split(".");
    const extension = nombreCortado[nombreCortado.length - 1];

    // Validar la extensionssssss
    if (!extensionesValidas.includes(extension)) {
      return reject(
        `La extensión ${extension} no es permitida - ${extensionesValidas}`
      );
    }

    const nombreTemp = uuidv4() + "." + extension;
    const uploadPath = path.join(__dirname, "../../../uploads/", carpeta, nombreTemp);

    archivo.mv(uploadPath, (err) => {
      if (err) {
        reject(err);
      }

      resolve(nombreTemp);
    });
  });
};

export default {
  subirArchivoUsuario,
  subirArchivoPublicacion
};
