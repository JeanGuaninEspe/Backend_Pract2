// const Encuesta2 = require("../models/encuesta2.model");
import Encuesta2 from '../models/encuesta2.model.js';

const encuesta2Ctrl = {};

encuesta2Ctrl.getEncuesta2s = async (req, res, next) => {
  const encuesta2s  = await Encuesta2.find();
  res.json(encuesta2s);
};

encuesta2Ctrl.createEncuesta2 = async (req, res, next) => {
  console.log(req.body)
  const encuesta2 = new Encuesta2({
    id_encuestador: req.body.id_encuestador,
    codigo_encuesta: req.body.codigo_encuesta,
    lugar: req.body.lugar,
    longitud: req.body.longitud,
    latitud: req.body.latitud,
    fecha: req.body.fecha,
    horaInicio: req.body.horaInicio,
    horaFin: req.body.horaFin,
    horaMuestra: req.body.horaMuestra,
    nombre_persona: req.body.nombre_persona,
    direccion_persona:req.body.direccion_persona,
    comunidad: req.body.comunidad,
    barrio: req.body.barrio,
    junta: req.body.junta,
    aspecto: req.body.aspecto,
    observaciones: req.body.observaciones,
    cloroLibreResidual: req.body.cloroLibreResidual,
    pH: req.body.pH,
    monocloroaminas: req.body.monocloroaminas,
    conductividad: req.body.conductividad
  });
  await encuesta2.save();
  res.json({ status: "encuesta2_c" });
};

encuesta2Ctrl.getEncuesta2 = async (req, res, next) => {
  const { id } = req.params;
  const encuesta2 = await Encuesta2.findById(id);
  res.json(encuesta2);
};

encuesta2Ctrl.editEncuesta2 = async (req, res, next) => {
  const { id } = req.params;
  await Encuesta2.findByIdAndUpdate(id, {$set: req.body}, {new: true});
  res.json({ status: "encuesta2 Updated" });
};

encuesta2Ctrl.deleteEncuesta2 = async (req, res, next) => {
  await Encuesta2.findByIdAndRemove(req.params.id);
  res.json({ status: "encuesta2 Deleted" });
};

export default encuesta2Ctrl;

