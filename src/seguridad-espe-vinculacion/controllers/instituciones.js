import InstitucionEducativa from "../models/institucion.js";

export const obtenerTodasLasInstituciones = async (req, res) => {
  try {
    const instituciones = await InstitucionEducativa.find();
    res.json({ ok : true, msg : 'Instituciones obtenidas con éxito', instituciones });
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok : false, msg : 'Error inesperado' });
  }
};

export const guardarInstitucion = async (req, res) => {
  try {
    const institucion = new InstitucionEducativa(req.body);
    await institucion.save();
    res.json({ ok : true, msg : 'Institución guardada con éxito', institucion });
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok : false, msg : 'Error inesperado' });
  }
};

export default {
    obtenerTodasLasInstituciones,
    guardarInstitucion
}
