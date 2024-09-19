import express from 'express';
// const router = express.Router();
const router = express.Router();

// const encuestador = require("../controllers/encuestador.controller");
import encuestador from '../controllers/encuestador.controller.js';


router.get("/", encuestador.getEncuestador);

router.post("/", encuestador.createEncuestador);

router.get("/:id", encuestador.getEncuestadorId);

router.put("/:id", encuestador.editEncuestador);

router.delete("/:id", encuestador.deleteEncuestador);

export default router;