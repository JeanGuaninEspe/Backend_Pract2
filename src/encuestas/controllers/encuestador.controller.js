// const Encuestador = require("../models/encuestador.model");
import Encuestador from '../models/encuestador.model.js';

const encuestadorCtrl = {};

encuestadorCtrl.getEncuestador = async (req, res, next) => {
  const encuestador = await Encuestador.find();
  res.json(encuestador);
};

encuestadorCtrl.createEncuestador = async (req, res, next) => {
  const encuestador = new Encuestador({
    codigo: req.body.codigo,
    nombre: req.body.nombre
  });
  await encuestador.save();
  res.json({ status: "encuestador_c" });
};

encuestadorCtrl.getEncuestadorId = async (req, res, next) => {
  const { id } = req.params;
  const encuestador = await Encuestador.findById(id);
  res.json(encuestador);
};

encuestadorCtrl.editEncuestador = async (req, res, next) => {
  const { id } = req.params;
  await Encuestador.findByIdAndUpdate(id, {$set: req.body}, {new: true});
  res.json({ status: "encuestador Updated" });
};

encuestadorCtrl.deleteEncuestador = async (req, res, next) => {
  await Encuestador.findByIdAndRemove(req.params.id);
  res.json({ status: "encuestador Deleted" });
};

export default encuestadorCtrl;

