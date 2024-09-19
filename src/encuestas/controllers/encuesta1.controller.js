// const Encuesta1 = require("../models/encuesta1.model");

import Encuesta1 from '../models/encuesta1.model.js';

const encuesta1Ctrl = {};

encuesta1Ctrl.getEncuesta1s = async (req, res, next) => {
  console.log("llega")
  const encuesta1s = await Encuesta1.find({},{foto:0});
  //const encuesta1s = await Encuesta1.find();
  res.json(encuesta1s);
};

encuesta1Ctrl.createEncuesta1 = async (req, res, next) => {
  const encuesta1 = new Encuesta1({
    codigo_encuesta: req.body.codigo_per,
    codigo_encuestador:req.body.codigo_encuestador,
    codigo_per: req.body.codigo_encuesta,
    fecha: req.body.fecha,
    horaInicio: req.body.horaInicio,
    horaFin: req.body.horaFin,
    foto: req.body.foto,
    tipoVivienda: req.body.tipoVivienda,
    otroTipoVivienda: req.body.otroTipoVivienda,
    numeroPisos: req.body.numeroPisos,
    techo: req.body.techo,
    paredes: req.body.paredes,
    piso: req.body.piso,
    vivienda: req.body.vivienda,
    numeroPersonas: req.body.numeroPersonas,
    problemasEstomacales: req.body.problemasEstomacales,
    tipoProblemasEstomacales: req.body.tipoProblemasEstomacales,
    otroProblemasEstomacales: req.body.otroProblemasEstomacales,
    enfermedadPiel: req.body.enfermedadPiel,
    tipoEnfermedadPiel: req.body.tipoEnfermedadPiel,
    otraEnfermedadPiel: req.body.otraEnfermedadPiel,
    abastecimientoAgua: req.body.abastecimientoAgua,
    nombreRio: req.body.nombreRio,
    otroAbastecimientoAgua: req.body.otroAbastecimientoAgua,
    sisternaTanque: req.body.sisternaTanque,
    desdeDondeLlegaAgua:req.body.desdeDondeLlegaAgua,
    origenAguaBeber: req.body.origenAguaBeber,
    tratamientoOrigenAgua: req.body.tratamientoOrigenAgua,
    usoAgua: req.body.usoAgua,  
    capacidadTanque: req.body.capacidadTanque,  
    capacidadSisterna: req.body.capacidadSisterna,  
    frecuenciaLimpieza: req.body.frecuenciaLimpieza,
    frecuenciaCloracion: req.body.frecuenciaCloracion,
    otroFrecuenciaCloracion: req.body.otroFrecuenciaCloracion,
    dosisCloracion: req.body.dosisCloracion,
    otroDosisCloracion: req.body.otroDosisCloracion,
    mascotas_animal: req.body.mascotas_animal,
    consumo_animal: req.body.consumo_animal,
    venta_animal: req.body.venta_animal,
    ornamentales_riego: req.body.ornamentales_riego,
    consumo_riego: req.body.consumo_riego,
    venta_riego: req.body.venta_riego,
    cantHombres: req.body.cantHombres,
    cantMujeres: req.body.cantMujeres,
    cantNinos: req.body.cantNinos,
    cantDiscapacidad: req.body.cantDiscapacidad,
    nombre_persona: req.body.nombre_persona,
    dir_persona: req.body.dir_persona,
    com_persona: req.body.com_persona,
    barr_persona: req.body.barr_persona,
    jun_ag_persona: req.body.jun_ag_persona,
    edad_persona: req.body.edad_persona,
    sexo_persona: req.body.sexo_persona,
    longitud_persona: req.body.longitud_persona,
    latitud_persona: req.body.latitud_persona,
  });
  await encuesta1.save();
  res.json({ status: "encuesta1_c" });
};

encuesta1Ctrl.getEncuesta1 = async (req, res, next) => {
  const { id } = req.params;
  const encuesta1 = await Encuesta1.findById(id);
  res.json(encuesta1);
};

encuesta1Ctrl.editEncuesta1 = async (req, res, next) => {
  const { id } = req.params;
  await Encuesta1.findByIdAndUpdate(id, {$set: req.body}, {new: true});
  res.json({ status: "encuesta1 Updated" });
};

encuesta1Ctrl.deleteEncuesta1 = async (req, res, next) => {
  await Encuesta1.findByIdAndRemove(req.params.id);
  res.json({ status: "encuesta1 Deleted" });
};

export default encuesta1Ctrl;

