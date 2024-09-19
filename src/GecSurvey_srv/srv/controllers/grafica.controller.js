import Encuesta1 from "../models/encuesta.model.js"; 

//=================================================================================================
const countIncidents = async (query) => {
  const encuestas = await Encuesta1.find(query);
  console.log('muestra enuestas de fase1');
  let roboCount = 0;
  let emergenciaMedicaCount = 0;
  let incendioCount = 0;
  let desastreNaturalCount = 0;
  let accidenteDeTraficoCount = 0;
  let sinIncidentesCount = 0; // Nuevo contador para 'Sin Incidentes'

  encuestas.forEach((encuesta) => {
    console.log(encuesta.encuesta.P1_S1_P1);
    switch (encuesta.encuesta.P1_S1_P1) {
      case 'Robo':
        roboCount++;
        break;
      case 'Emergencia médica':
        emergenciaMedicaCount++;
        break;
      case 'Incendio':
        incendioCount++;
        break;
      case 'Desastre natural':
        desastreNaturalCount++;
        break;
      case 'Accidente de tráfico':
        accidenteDeTraficoCount++;
        break;
      default:
        if (encuesta.encuesta.P1_S1_P1_N) {
          sinIncidentesCount++;
        }
        break;
    }
  });

  const totalIncidents = encuestas.length;
  const otrosCount = totalIncidents - 
                     roboCount -
                     emergenciaMedicaCount -
                     incendioCount -
                     desastreNaturalCount -
                     accidenteDeTraficoCount -
                     sinIncidentesCount;

  return {
    robo: roboCount,
    emergenciaMedica: emergenciaMedicaCount,
    incendio: incendioCount,
    desastreNatural: desastreNaturalCount,
    accidenteDeTrafico: accidenteDeTraficoCount,
    sinIncidente: sinIncidentesCount,
    otros: otrosCount,
  };
};

//Obtener datos de los incidentes
export const getCountTipoInciendente = async (req, res) => {
  try {
    const result = await countIncidents({});
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al obtener conteo de incidentes' });
  }
};

// Obtener datos de los incidentes por sector
export const getCountTipoInciendenteBySector = async (req, res) => {
  try {
    const sector = req.query.sector;
    const query = {};

    if (sector) {
      query['encuestado.direccion'] = sector;
    }

    const result = await countIncidents(query);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al obtener conteo de incidentes' });
  }
};

//=================================================================================================

// Obtener datos de los incidentes por Sector y año
export const getCountTipoInciendenteByYearAndSector = async (req, res) => {
  try {
    const year = req.query.year; // Obtener el año desde la URL
    const sector = req.query.sector; // Obtener el sector desde la URL

    const query = {};

    if (year) {
      const startDate = new Date(`${year}-01-01`);
      const endDate = new Date(`${year}-12-31`);

      // Agregar el filtro por año a la consulta
      query["encuesta.fechaEnc"] = { $gte: startDate, $lte: endDate };
    }

    if (sector) {
      // Agregar el filtro por sector a la consulta
      query["encuestado.direccion"] = sector;
    }

    const result = await countIncidents(query);

    return res.status(200).json(result);
  } catch (error) {
    //console.error(error);
    return res.status(500).json({ mensaje: 'Error al obtener conteo de incidentes' });
  }
};

//=================================================================================================

// Obtener datos de los incidentes por Sector, año y mes
export const getCountTipoInciendenteByYearAndMonthAndSector = async (req, res) => {
  try {
    const year = req.query.year; // Obtener el año desde la URL
    const month = req.query.month; // Obtener el mes desde la URL
    const sector = req.query.sector; // Obtener el sector desde la URL

    const query = {};

    if (year && month) {
      const startDate = new Date(`${year}-${month}-01`);
      const endDate = new Date(`${year}-${month}-31`);

      // Agregar el filtro por año y mes a la consulta
      query["encuesta.fechaEnc"] = { $gte: startDate, $lte: endDate };
    }

    if (sector) {
      // Agregar el filtro por sector a la consulta
      query["encuestado.direccion"] = sector;
    }

    const result = await countIncidents(query);

    return res.status(200).json(result);
  } catch (error) {
    //console.error(error);
    return res.status(500).json({ mensaje: 'Error al obtener conteo de incidentes' });
  }
};

//=================================================================================================

// Obtener datos de los incidentes por Sector, año, mes y dia
export const getCountTipoInciendenteByYearAndMonthAndDayAndSector = async (req, res) => {
  try {
    const year = req.query.year; // Obtener el año desde la URL
    const month = req.query.month; // Obtener el mes desde la URL
    const day = req.query.day; // Obtener el día desde la URL
    const sector = req.query.sector; // Obtener el sector desde la URL

    const query = {};

    if (year && month && day) {
      const startDate = new Date(`${year}-${month}-${day}`);
      const endDate = new Date(`${year}-${month}-${day}`);

      // Agregar el filtro por año, mes y día a la consulta
      query["encuesta.fechaEnc"] = { $gte: startDate, $lte: endDate };
    }

    if (sector) {
      // Agregar el filtro por sector a la consulta
      query["encuestado.direccion"] = sector;
    }

    const result = await countIncidents(query);

    return res.status(200).json(result);
  } catch (error) {
    //console.error(error);
    return res.status(500).json({ mensaje: 'Error al obtener conteo de incidentes' });
  }
};

//=================================================================================================

// Obtener datos de los incidentes por año
export const getCountTipoInciendenteByYear = async (req, res) => {
  try {
    const year = req.query.year; // Obtener el año desde la URL

    const query = {};

    if (year) {
      const startDate = new Date(`${year}-01-01`);
      const endDate = new Date(`${year}-12-31`);

      // Agregar el filtro por año a la consulta
      query["encuesta.fechaEnc"] = { $gte: startDate, $lte: endDate };
    }

    const result = await countIncidents(query);

    return res.status(200).json(result);
  } catch (error) {
    //console.error(error);
    return res.status(500).json({ mensaje: 'Error al obtener conteo de incidentes' });
  }
};

//=================================================================================================

// Obtener datos de los incidentes por año y mes
export const getCountTipoInciendenteByYearAndMonth = async (req, res) => {
  try {
    const year = req.query.year; // Obtener el año desde la URL
    const month = req.query.month; // Obtener el mes desde la URL

    const query = {};

    if (year && month) {
      const startDate = new Date(`${year}-${month}-01`);
      const endDate = new Date(`${year}-${month}-31`);

      // Agregar el filtro por año y mes a la consulta
      query["encuesta.fechaEnc"] = { $gte: startDate, $lte: endDate };
    }

    const result = await countIncidents(query);

    return res.status(200).json(result);
  } catch (error) {
    //console.error(error);
    return res.status(500).json({ mensaje: 'Error al obtener conteo de incidentes' });
  }
};

//=================================================================================================

// Obtener datos de los incidentes por año, mes y dia
export const getCountTipoInciendenteByYearAndMonthAndDay = async (req, res) => {
  try {
    const year = req.query.year; // Obtener el año desde la URL
    const month = req.query.month; // Obtener el mes desde la URL
    const day = req.query.day; // Obtener el día desde la URL

    const query = {};

    if (year && month && day) {
      const startDate = new Date(`${year}-${month}-${day}`);
      const endDate = new Date(`${year}-${month}-${day}`);

      // Agregar el filtro por año, mes y día a la consulta
      query["encuesta.fechaEnc"] = { $gte: startDate, $lte: endDate };
    }

    const result = await countIncidents(query);

    return res.status(200).json(result);
  } catch (error) {
    //console.error(error);
    return res.status(500).json({ mensaje: 'Error al obtener conteo de incidentes' });
  }
};

//=================================================================================================

//Obtener los años existentes
export const getAnios = async (req, res) => {
  try {
    const result = await Encuesta1.distinct('encuesta.fechaEnc', {});
    //console.log(result); // Muestra las fechas en la consola

    const years = [...new Set(result.map(date => new Date(date).getFullYear()))];
    //console.log(years); // Muestra los años distintos en la consola

    return res.status(200).json(years);
  } catch (error) {
    //console.error(error);
    return res.status(500).json({ mensaje: 'Error al obtener conteo de incidentes' });
  }
};

//=================================================================================================

//Obtener los sectores existentes
export const getSector = async (req, res) => {
  try {
    const result = await Encuesta1.distinct('encuestado.direccion', {});
    const uniqueSectors = Array.from(new Set(result)); // Eliminar elementos duplicados
    console.log(uniqueSectors); // Mostrar los sectores únicos en la consola

    return res.status(200).json(uniqueSectors);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: 'Error al obtener conteo de incidentes' });
  }
};

//=================================================================================================