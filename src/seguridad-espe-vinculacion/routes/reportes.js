import { Router } from 'express';
import {
  obtenerCiudades,obtenerBarrios,obtenerEmergencias,obtenerReporteBarras,obtenerReportePastel,obtenerAnios,obtenerMapaCalor,obtenerDatosCards,obtenerDatosCardsF3,obtenerUnidadesEducativas
  ,obtenerCoordenadas
  ,descargarXLSX,descargarPDF,descargarCSV
} from "../controllers/reportes.js";

import { validarJWT } from "../middlewares/validar-jwt.js";

const router = Router();
router.get(
  "/obtenerCiudades",
  /* validarJWT, */
  obtenerCiudades
);

router.get(
  "/obtenerUnidadesEducativas",
/*   validarJWT, */
  obtenerUnidadesEducativas
);
router.post(
  "/obtenerBarrios",
/*   validarJWT, */
  obtenerBarrios
);
router.post(
  "/obtenerEmergencias",
/*   validarJWT, */
  obtenerEmergencias
);
router.post(
  "/obtenerReporteBarras",
/*   validarJWT, */
  obtenerReporteBarras
);
router.post(
  "/obtenerReportePastel",
/*   validarJWT, */
obtenerReportePastel
);
router.post(
  "/obtenerAnios",
/*   validarJWT, */
obtenerAnios
);
router.post(
  "/obtenerMapaCalor",
/*   validarJWT, */
obtenerMapaCalor
);
router.get(
  "/obtenerDatosCards",
/*   validarJWT, */
obtenerDatosCards
);

router.post(
  "/obtenerDatosCardsF3",
  /* validarJWT, */
  obtenerDatosCardsF3
);

router.post(
  "/obtenerCoordenadas",
/*   validarJWT, */
obtenerCoordenadas
);

router.post(
  "/descargarXLSX",
/*   validarJWT, */
descargarXLSX
);

router.post(
  "/descargarPDF",
/*   validarJWT, */
descargarPDF
);

router.post(
  "/descargarPDFV2",
// /*   validarJWT, */
// descargarPDF2V
);

router.post(
  "/descargarCSV",
/*   validarJWT, */
descargarCSV
);

export default router;
