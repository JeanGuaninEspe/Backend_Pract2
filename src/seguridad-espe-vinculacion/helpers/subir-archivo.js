import { v2 as cloudinary } from 'cloudinary';
import { config } from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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

    const nombreTemp = `${carpeta}/${uuidv4()}.${extension}`;

    cloudinary.uploader.upload_stream({ folder: carpeta }, (error, result) => {
      if (error) {
        return reject(error);
      }
      resolve(result.secure_url);
    }).end(archivo.archivo.data);
  });
};

export const subirArchivoPublicacion = (
  archivo,
  extensionesValidas = ["png", "jpg", "jpeg", "gif"],
  carpeta = ""
) => {
  return new Promise((resolve, reject) => {
    const nombreCortado = archivo.name.split(".");
    const extension = nombreCortado[nombreCortado.length - 1];

    if (!extensionesValidas.includes(extension)) {
      return reject(`La extensión ${extension} no es permitida - ${extensionesValidas}`);
    }

    const nombreTemp = `${carpeta}/${uuidv4()}.${extension}`;

    cloudinary.uploader.upload_stream({ folder: carpeta }, (error, result) => {
      if (error) {
        return reject(error);
      }
      resolve(result.secure_url);
    }).end(archivo.data);
  });
};

export default {
  subirArchivoUsuario,
  subirArchivoPublicacion
};
