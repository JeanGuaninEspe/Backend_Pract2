import { Router } from "express";
import * as GraficaCtrl from '../controllers/grafica.controller.js'
import * as GraficaCtrl_F2 from '../controllers/graficaF2.controller.js'

const router = Router();

router.get('/incidentes', GraficaCtrl.getCountTipoInciendente);
router.get('/incidentesPorSector', GraficaCtrl.getCountTipoInciendenteBySector); // Nueva ruta para filtrar por sector
router.get('/incidentesPorSectorYAnio', GraficaCtrl.getCountTipoInciendenteByYearAndSector); // Nueva ruta para filtrar por sector y año
router.get('/incidentesPorSectorYAnioYMes', GraficaCtrl.getCountTipoInciendenteByYearAndMonthAndSector); // Nueva ruta para filtrar por sector, año y mes
router.get('/incidentesPorSectorYAnioYMesYDia', GraficaCtrl.getCountTipoInciendenteByYearAndMonthAndDayAndSector); // Nueva ruta para filtrar por sector, año, mes y dia
router.get('/incidentesPorAnio', GraficaCtrl.getCountTipoInciendenteByYear); // Nueva ruta para filtrar por año
router.get('/incidentesPorAnioYMes', GraficaCtrl.getCountTipoInciendenteByYearAndMonth); // Nueva ruta para filtrar por año y mes
router.get('/incidentesPorAnioYMesYDia', GraficaCtrl.getCountTipoInciendenteByYearAndMonthAndDay); // Nueva ruta para filtrar por año, mes y día
router.get('/anios', GraficaCtrl.getAnios); // Obtener años existentes
router.get('/sectores', GraficaCtrl.getSector); // Obtener sectores existentes


// ********************************************************************************************************************
//    RUTAS FASE 2
// ********************************************************************************************************************

router.get('/sectores_911_F2', GraficaCtrl_F2.getSectores_911_F2); // Obtener sectores existentes
router.get('/unidadesEducativas', GraficaCtrl_F2.getUnidadesEducativas_F2); // Obtener sectores existentes

router.get('/anios_UE_F2', GraficaCtrl_F2.getAnios_UE_F2); // Obtener años existentes UE
router.get('/anios_911_F2', GraficaCtrl_F2.getAnios_911_F2);// Obtener años existentes eCU911

router.get('/meses_UE_F2?', GraficaCtrl_F2.getMeses_UE_F2); // Obtener meses existentes UE

router.get('/incidentes_F2', GraficaCtrl_F2.getCountTipoInciendente911_F2); // Ruta para obtener los incidentes en unidades educativas
router.get('/incidentesUE_F2', GraficaCtrl_F2.getCountTipoInciendente_UE_F2); // Ruta para obtener los incidentes en unidades educativas

router.get('/incidentesPorSector_911_F2', GraficaCtrl_F2.getCountTipoInciendenteBySector911_F2); // Nueva ruta para filtrar por sector
router.get('/incidentesPorSector_UE_F2', GraficaCtrl_F2.getCountTipoInciendenteBySector_UE_F2); // Nueva ruta para filtrar por sector

router.get('/incidentesPorSectorYuE_UE_F2', GraficaCtrl_F2.getCountTipoInciendenteBySectorAndUE_UE_F2); // Filtro: Sector: Unidad Educativa 
router.get('/incidentesPorSectorYuEYAnio_UE_F2', GraficaCtrl_F2.getCountTipoInciendenteByYearAndUEAndSector_UE_F2); // Filtro: Sector: Unidad Educativa: Año
router.get('/incidentesPorSectorYuEYAnioYMes_UE_F2', GraficaCtrl_F2.getCountTipoInciendenteByYearAndUEAndSectorAndMonth_UE_F2); // Filtro: Sector: Unidad Educativa: Año: Mes
router.get('/incidentesPorAnio_UE_F2', GraficaCtrl_F2.getCountTipoInciendenteByYear_UE_F2); // Nueva ruta para filtrar por año
router.get('/incidentesPorAnioYMes_UE_F2', GraficaCtrl_F2.getCountTipoInciendenteByYearAndMonth_UE_F2); // Nueva ruta para filtrar por año y mes


export default router;

