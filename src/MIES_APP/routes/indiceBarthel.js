import express from 'express';
const router = express.Router();
import { getConnection } from '../conexion.js';

//consulta de todos los adultos mayores registrados
router.get('/consultaIndiceBarthel/', (req,res) =>{
	console.log("Consulta de todos los test realizados a los adultos mayores registrados");
	getConnection(function(err,conn){
		const {  } = req.params;
		
		if(err){
			return res.sendStatus(400);
		}
		conn.query('SELECT * FROM indice_barthel ',function(err,rows){
			if(err){
				conn.release();
				return res.sendStatus(400,'No se puede conectar a la base de datos');
			}

			res.send(rows);
			conn.release();
		});
	});
});


//Inserccion del test indice barthel a los adultos mayores
router.post('/guardarIndiceBarthel',(req, res, next) => {
	const data = {
		ef_id: req.body.ef_id,
        ib_p1_comer: req.body.ib_p1_comer,
        ib_p2_trasladarse: req.body.ib_p2_trasladarse,
        ib_p3_aseo_personal: req.body.ib_p3_aseo_personal,
        ib_p4_uso_retrete: req.body.ib_p4_uso_retrete,
        ib_p5_bañarse: req.body.ib_p5_bañarse,
        ib_p6_desplazarse: req.body.ib_p6_desplazarse,
        ib_p7_escaleras: req.body.ib_p7_escaleras,
        ib_p8_vestirse_desvertirse: req.body.ib_p8_vestirse_desvertirse,
        ib_p9_control_heces: req.body.ib_p9_control_heces,
        ib_p10_control_orina: req.body.ib_p10_control_orina,
		ib_tiempo_inicial: req.body.ib_tiempo_inicial,
		ib_tiempo_final: req.body.ib_tiempo_final,
		ib_tiempo_total: req.body.ib_tiempo_total,
		ib_estado: req.body.ib_estado,
		ib_puntaje_total: req.body.ib_puntaje_total
	};

	const query = "INSERT INTO indice_barthel (ef_id, ib_p1_comer, ib_p2_trasladarse, ib_p3_aseo_personal, ib_p4_uso_retrete, ib_p5_bañarse, ib_p6_desplazarse, ib_p7_escaleras, ib_p8_vestirse_desvertirse, ib_p9_control_heces, ib_p10_control_orina, ib_tiempo_inicial, ib_tiempo_final, ib_tiempo_total, ib_estado, ib_puntaje_total) VALUES (" + "\'" + data.ef_id + "\',\'" + data.ib_p1_comer + "\',\'" + data.ib_p2_trasladarse + "\',\'" + data.ib_p3_aseo_personal + "\',\'" + data.ib_p4_uso_retrete + "\',\'" + data.ib_p5_bañarse + "\',\'" + data.ib_p6_desplazarse + "\',\'" + data.ib_p7_escaleras + "\',\'" + data.ib_p8_vestirse_desvertirse + "\',\'" + data.ib_p9_control_heces + "\',\'" + data.ib_p10_control_orina + "\',\'" + data.ib_tiempo_inicial + "\',\'" + data.ib_tiempo_final + "\',\'" + data.ib_tiempo_total + "\',\'" + data.ib_estado + "\',\'" + data.ib_puntaje_total + "\')";

	getConnection(function (err, client) {
		if(err) {
			console.log("No se pudo conectar a la base de datos" + err);

		}
		client.query(query, function (err, result) {
			if(!err) {
				res.json({ status: 'Registro exitoso' });
				client.release();
			}else {
				console.log(err);
				client.release();
				res.status(500).json({error: 'No se realiza el insert.'});
			}
		});
	});
});

//Consultar Indice Barthel por ID
router.get('/consultaIndiceBarthelById/:ib_id', (req,res) =>{
	console.log("Se consultaron datos del test indice Barthel por Id");
	getConnection(function(err,conn){
		const { ib_id } = req.params;
		if(err){
			return res.sendStatus(400);
		}
		conn.query('SELECT * FROM indice_barthel WHERE ib_id = ?',[ib_id],function(err,rows){
			if(err){
				conn.release();
				return res.sendStatus(400,'No se puede conectar a la base de datos');
			}

			res.send(rows);
			conn.release();
		});
	});
});


//Consultar Indice Barthel por ID Adulto Mayor
router.get('/consultaIndiceBarthelByIdAm/:am_id', (req,res) =>{
	console.log("Se consultaron datos del test Indice Barthel por Id del Adulto Mayor");
	getConnection(function(err,conn){
		const { am_id } = req.params;
		if(err){
			return res.sendStatus(400);
		}
		conn.query('SELECT ib.* FROM indice_barthel ib INNER JOIN encabezado_formulario ef ON ef.ef_id = ib.ef_id WHERE ef.am_id = ?',[am_id],function(err,rows){
			if(err){
				conn.release();
				return res.sendStatus(400,'No se puede conectar a la base de datos');
			}

			res.send(rows);
			conn.release();
		});
	});
});


export default router;