import { response } from "express";


export const validarArchivoSubir = (req, res = response, next ) => {

    //obtenr nomber del body
   
    console.log(req.body);

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo ) {
        return res.status(400).json({
            msg: 'No hay archivos que subir - validarArchivoSubir'
        });
    }

    next();

}


export default {
    validarArchivoSubir
}