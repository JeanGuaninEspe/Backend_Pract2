// const express = require("express");
import express from 'express';
const router = express.Router();

// const encuesta1 = require("../controllers/encuesta1.controller.js");
import encuesta1 from '../controllers/encuesta1.controller.js';

router.get("/", encuesta1.getEncuesta1s);

router.post("/", encuesta1.createEncuesta1);

router.get("/:id", encuesta1.getEncuesta1);

router.put("/:id", encuesta1.editEncuesta1);

router.delete("/:id", encuesta1.deleteEncuesta1);

export default router;