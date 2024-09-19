const Persona_enc = require("../models/persona_enc.model");

const persona_encCtrl = {};

persona_encCtrl.getPersona_enc = async (req, res, next) => {
  const persona_enc = await Persona_enc.find();
  res.json(persona_enc);
};

persona_encCtrl.createPersona_enc = async (req, res, next) => {
  const persona_enc = new Persona_enc({
    codigo_persona: req.body.codigo_persona,
    nombre_persona: req.body.nombre_persona,
    dir_persona: req.body.dir_persona,
    com_persona: req.body.com_persona,
    barr_persona: req.body.barr_persona,
    jun_ag_persona: req.body.jun_ag_persona,
    edad_persona: req.body.edad_persona,
    sexo_persona: req.body.sexo_persona,
    longitud_persona: req.body.longitud_persona,
    latitud_persona: req.body.latitud_persona
  });
  await persona_enc.save();
  res.json({ status: "persona_enc_c" });
};

persona_encCtrl.getPersona_encId = async (req, res, next) => {
  const { id } = req.params;
  const persona_enc = await Persona_enc.findById(id);
  res.json(persona_enc);
};

persona_encCtrl.editPersona_enc = async (req, res, next) => {
  const { id } = req.params;
  await Persona_enc.findByIdAndUpdate(id, {$set: req.body}, {new: true});
  res.json({ status: "persona_enc Updated" });
};

persona_encCtrl.deletePersona_enc = async (req, res, next) => {
  await Persona_enc.findByIdAndRemove(req.params.id);
  res.json({ status: "persona_enc Deleted" });
};

export default persona_encCtrl;

