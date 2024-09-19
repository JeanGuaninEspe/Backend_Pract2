const express = require("express");
const router = express.Router();

const persona_enc = require("../controllers/persona_enc.controller");

router.get("/", persona_enc.getPersona_enc);

router.post("/", persona_enc.createPersona_enc);

router.get("/:id", persona_enc.getPersona_encId);

router.put("/:id", persona_enc.editPersona_enc);

router.delete("/:id", persona_enc.deletePersona_enc);

export default router;