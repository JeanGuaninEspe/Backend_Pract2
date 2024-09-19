import Encuesta from '../models/encuesta.model.js'

export const registrarEncuesta = async (req, res) => {
    if (req.body.usuario == "") {
        return res.status(200).send();
    };

    const encuestado = {
        "nombre": req.body.nombre,
        "cedula": req.body.cedula,
        "telefono": req.body.telefono,
        "direccion": req.body.direccion,
        "fNac": req.body.fNac,
        "correo": req.body.correo
    }

    delete req.body.nombre,
    delete req.body.cedula,
    delete req.body.telefono,
    delete req.body.direccion,
    delete req.body.fNac,
    delete req.body.correo

    const usuario = req.body.usuario;

    delete req.body.usuario;

    const encuestaN = req.body;
    
    const encuesta = new Encuesta({"usuario":usuario,
    "encuestado":encuestado, "encuesta":encuestaN});
    //const encuesta = await Encuesta.insertMany({"usuario":usuario,
    //"encuestado":encuestado, "encuesta":encuestaN});

    await encuesta.save();

    if (!encuesta) {
        return res.status(200).send();
    } else {
        return res.status(200).json({ status: 1 });
    }
}