import Encuesta from "../models/encuestaF2.model.js";

// ******************************************************************
//                  PREGUNTA INCIDENTES ECU 911
// ******************************************************************

// CONTAR LLAMADOS A ECU911 POR PARTE DE ESTUDIANTES
const countIncidents911_F2 = async (query) => {
    const encuestas = await Encuesta.find(query);
    console.log('Se realiza peticion de ecu911');

    let roboCount = 0;
    let secuestroCount = 0;
    let emergenciaMedicaCount = 0;
    let incendioCount = 0;
    let desastreNaturalCount = 0;
    let accidenteDeTraficoCount = 0;
    let violenciaParesCount = 0;
    let otrosCount = 0;
    let sinIncidentesCount = 0; // Nuevo contador para 'Sin Incidentes'

    let i = 1;


    encuestas.forEach((encuesta) => {

        // console.log(i++,' ',encuesta.encuesta.F2_S1_P3_2);
        switch (encuesta.encuesta.F2_S1_P3_2) {
            case 'Robo':
                roboCount++;
                break;
            case 'Secuestro':
                secuestroCount++;
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
            case 'Violencia entre pares':
                violenciaParesCount++;
                break;
            case 'Otro':
                otrosCount++;
                break;

            default:

                break;
        }
    });

    const totalIncidents = encuestas.length;
    sinIncidentesCount = totalIncidents - roboCount
        - secuestroCount - emergenciaMedicaCount
        - incendioCount - desastreNaturalCount
        - accidenteDeTraficoCount - violenciaParesCount
        - otrosCount;


    return {
        robo: roboCount,
        secuestro: secuestroCount,
        emergenciaMedica: emergenciaMedicaCount,
        incendio: incendioCount,
        desastreNatural: desastreNaturalCount,
        accidenteDeTrafico: accidenteDeTraficoCount,
        violenciaPares: violenciaParesCount,
        sinIncidente: sinIncidentesCount,
        otros: otrosCount,
        total: totalIncidents
    };
};

//Obtener datos de los incidentes
export const getCountTipoInciendente911_F2 = async (req, res) => {
    try {
        const result = await countIncidents911_F2({});
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ mensaje: 'Error al obtener conteo de incidentes' });
    }
};

// Obtener datos de los incidentes de ecu911 por sector
export const getCountTipoInciendenteBySector911_F2 = async (req, res) => {
    try {
        const sector = req.query.sector;
        const query = {};

        if (sector) {
            query['encuesta. F2_P2'] = sector;
        }

        const result = await countIncidents911_F2(query);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ mensaje: 'Error al obtener conteo de incidentes' });
    }
};

// Obtener datos de los incidentes de ecu911 por sector y Unidad Educativa
export const getCountTipoInciendenteBySectorAndUE911_F2 = async (req, res) => {
    try {
        const sector = req.query.sector;
        const ue = req.query.ue;
        const query = {};

        if (sector) {
            query['encuesta.F2_P2'] = sector;
        }
        if (ue) {
            query['encuesta.F2_P3'] = ue;
        }

        const result = await countIncidents911_F2(query);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ mensaje: 'Error al obtener conteo de incidentes' });
    }
};

// Obtener datos de los incidentes de ecu911 por sector y Unidad Educativa y año
export const getCountTipoInciendenteBySectorAndUEAndYear911_F2 = async (req, res) => {
    try {
        const sector = req.query.sector;
        const ue = req.query.ue;
        const year = req.query.year;
        const query = {};

        if (sector) {
            query['encuesta.F2_P2'] = sector;
        }
        if (ue) {
            query['encuesta.F2_P3'] = ue;
        }
        if (year) {
            query['encuesta.F2_S1_P3_Y'] = year;
        }

        const result = await countIncidents911_F2(query);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ mensaje: 'Error al obtener conteo de incidentes' });
    }
};

// Obtener datos de los incidentes de ecu911 por sector y Unidad Educativa y año y mes
export const getCountTipoInciendenteBySectorAndUEAndYearAndMont911_F2 = async (req, res) => {
    try {
        const sector = req.query.sector;
        const ue = req.query.ue;
        const year = req.query.year;
        const month = req.query.month;
        const query = {};

        if (sector) {
            query['encuesta.F2_P2'] = sector;
        }
        if (ue) {
            query['encuesta.F2_P3'] = ue;
        }
        if (year) {
            query['encuesta.F2_S1_P3_Y'] = year;
        }
        if (month) {
            query['encuesta.F2_S1_P3_M'] = month;
        }

        const result = await countIncidents911_F2(query);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ mensaje: 'Error al obtener conteo de incidentes' });
    }
};

//Obtener los años existentes
export const getAnios_911_F2 = async (req, res) => {
    try {
        const result = await Encuesta.distinct('encuesta. F2_S1_P3_Y', {});
        //console.log(result); // Muestra las fechas en la consola
        return res.status(200).json(result);
    } catch (error) {
        //console.error(error);
        return res.status(500).json({ mensaje: 'Error al obtener conteo de incidentes' });
    }
};

//Obtener los sectores existentes
export const getSectores_911_F2 = async (req, res) => {
    try {

        const guia = 'encuesta. F2_P2';
        const result = await Encuesta.distinct(guia, {});
        //console.log(result); // Muestra los sectores en la consola
        return res.status(200).json(result);
    } catch (error) {
        //console.error(error);
        return res.status(500).json({ mensaje: 'Error al obtener conteo de incidentes' });
    }
};

// Obtener las unidades Educativas filtradas por sector
export const getUnidadesEducativas_F2 = async (req, res) => {
    try {
        const sector = req.query.sector;
        const query = {};

        if (sector) {
            query['encuesta. F2_P2'] = sector;
        }
        const result = await Encuesta.distinct('encuesta.F2_P3', query);
        //console.log(result); // Muestra las unidades educativas en la consola
        return res.status(200).json(result);
    } catch (error) {
        //console.error(error);
        return res.status(500).json({ mensaje: 'Error al obtener conteo de incidentes de UE' });
    }
};





// ******************************************************************
//                 FIN PREGUNTA INCIDENTES ECU 911
// ******************************************************************


// ******************************************************************
//                 PREGUNTA INCIDENTES U EDUCATIVAS
// ******************************************************************
const countIncidents_UE_F2 = async (query) => {
    const encuestas = await Encuesta.find(query);
    
    //console.log(encuestas);
    console.log('Se realiza peticion de unidades educativas');

    let roboCount = 0;
    let acosoSexualCount = 0;
    let bullyngCount = 0;
    let alcoholDrogasCount = 0;
    let violenciaParesCount = 0;
    let pandillasCount = 0;
    let otrosCount = 0;
    let sinIncidentesCount = 0; // Nuevo contador para 'Sin Incidentes'

    encuestas.forEach((encuesta) => {
       // console.log(encuesta.encuesta.F2_S1_P3);
        switch (encuesta.encuesta.F2_S1_P3) {
            case 'Robo':
                roboCount++;
                break;
            case 'Acoso sexual':
                acosoSexualCount++;
                break;
            case 'Bullying ':
                bullyngCount++;
                break;
            case 'Bullying':
                bullyngCount++;
                break;
            case 'Consumo de alcohol o drogas':
                alcoholDrogasCount++;
                break;
            case 'Violencia entre pares':
                violenciaParesCount++;
                break;
            case 'Otro':
                otrosCount++;
                break;
            default:
                break;

        }
        if ((encuesta.encuesta.F2_S5_P1)==='Sí') {
            pandillasCount++;
        }
    });

    const totalIncidents = encuestas.length;



    sinIncidentesCount = totalIncidents - roboCount -
        acosoSexualCount - bullyngCount
        - alcoholDrogasCount - violenciaParesCount -
        otrosCount;
    return {
        robo: roboCount,
        acosoSexual: acosoSexualCount,
        bullyng: bullyngCount,
        alcoholDrogas: alcoholDrogasCount,
        violenciaPares: violenciaParesCount,
        otros: otrosCount,
        sinIncidente: sinIncidentesCount,
        pandillas: pandillasCount,
        total: totalIncidents

    };
};


//Obtener datos de los incidentes de las Unidades Educativas
export const getCountTipoInciendente_UE_F2 = async (req, res) => {
    try {
        const result = await countIncidents_UE_F2({});
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ mensaje: 'Error al obtener conteo de incidentes  UE' });
    }
};


// Obtener datos de los incidentes de UE por sector
export const getCountTipoInciendenteBySector_UE_F2 = async (req, res) => {
    try {
        const sector = req.query.sector;
        const query = {};

        if (sector) {
            query['encuesta. F2_P2'] = sector;
        }

        const result = await countIncidents_UE_F2(query);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ mensaje: 'Error al obtener conteo de incidentes de UE' });
    }
};

// Obtener datos de los incidentes de UE por sector y Unidad Educativa
export const getCountTipoInciendenteBySectorAndUE_UE_F2 = async (req, res) => {
    try {
        const sector = req.query.sector;
        const ue = req.query.ue;
        const query = {};

        if (sector) {
            query['encuesta. F2_P2'] = sector;
        }
        if (ue) {
            query['encuesta.F2_P3'] = ue;
        }

        const result = await countIncidents_UE_F2(query);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ mensaje: 'Error al obtener conteo de incidentes de UE' });
    }
};


// Obtener datos de los incidentes de UE por sector y Unidad Educativa y año
export const getCountTipoInciendenteByYearAndUEAndSector_UE_F2 = async (req, res) => {
    try {
        const sector = req.query.sector;
        const ue = req.query.ue;
        const year = req.query.year;
        const query = {};

        if (sector) {
            query['encuesta. F2_P2'] = sector;
        }
        if (ue) {
            query['encuesta.F2_P3'] = ue;
        }
        if (year) {
            query['encuesta. F2_S2_P2_Y'] = year;
        }

        const result = await countIncidents_UE_F2(query);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ mensaje: 'Error al obtener conteo de incidentes de UE' });
    }
};

// Obtener datos de los incidentes de UE por sector y Unidad Educativa y año y mes
export const getCountTipoInciendenteByYearAndUEAndSectorAndMonth_UE_F2 = async (req, res) => {
    try {
        const sector = req.query.sector;
        const ue = req.query.ue;
        const year = req.query.year;
        const month = req.query.month;
        const query = {};

        if (sector) {
            query['encuesta. F2_P2'] = sector;
        }
        if (ue) {
            query['encuesta.F2_P3'] = ue;
        }
        if (year) {
            query['encuesta. F2_S2_P2_Y'] = year;
        }
        if (month) {
            query['encuesta. F2_S2_P2_M'] = month;
        }

        const result = await countIncidents_UE_F2(query);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ mensaje: 'Error al obtener conteo de incidentes de UE' });
    }
};

// Obtener datos de incidentes por años
export const getCountTipoInciendenteByYear_UE_F2 = async (req, res) => {
    try {
        const year = req.query.year;
        const query = {};

        if (year) {
            query['encuesta. F2_S2_P2_Y'] = year;
        }

        const result = await countIncidents_UE_F2(query);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ mensaje: 'Error al obtener conteo de incidentes de UE' });
    }
}

//Obtener datos de incidentes por años y meses
export const getCountTipoInciendenteByYearAndMonth_UE_F2 = async (req, res) => {
    try {
        const year = req.query.year;
        const month = req.query.month;
        const query = {};

        if (year) {
            query['encuesta. F2_S2_P2_Y'] = year;
        }
        if (month) {
            query['encuesta. F2_S2_P2_M'] = month;
        }

        const result = await countIncidents_UE_F2(query);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ mensaje: 'Error al obtener conteo de incidentes de UE' });
    }
}


//Obtener los años existentes
export const getAnios_UE_F2 = async (req, res) => {
    try {
        const result = await Encuesta.distinct('encuesta. F2_S2_P2_Y', {});
        return res.status(200).json(result);
    } catch (error) {
        //console.error(error);
        return res.status(500).json({ mensaje: 'Error al obtener conteo de incidentes' });
    }
};

//Obtener los meses existentes con filtro de sector, unidad educativa y año
export const getMeses_UE_F2 = async (req, res) => {
    try {
        const sector = req.query.sector;
        const ue = req.query.ue;
        const year = req.query.year;
        const query = {};

        if (sector) {
            query['encuesta. F2_P2'] = sector;
        }
        if (ue) {
            query['encuesta.F2_P3'] = ue;
        }
        if (year) {
            query['encuesta. F2_S2_P2_Y'] = year;
        }

        const result = await Encuesta.distinct('encuesta. F2_S2_P2_M', query);
        return res.status(200).json(result);
    } catch (error) {
        //console.error(error);
        return res.status(500).json({ mensaje: 'Error al obtener conteo de incidentes' });
    }
}

