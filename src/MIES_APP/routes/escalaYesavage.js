import express from 'express';
const router = express.Router();
import { getConnection } from '../conexion.js';


//consulta de todos los test realizados a los adultos mayores registrados
router.get('/consultaEscalaYesavage/', (req,res) =>{
	console.log("Consulta de todos los test realizados a los adultos mayores registrados");
	getConnection(function(err,conn){
		const {  } = req.params;
		
		if(err){
			return res.sendStatus(400);
		}
		conn.query('SELECT * FROM escala_yesavage ',function(err,rows){
			if(err){
				conn.release();
				return res.sendStatus(400,'No se puede conectar a la base de datos');
			}

			res.send(rows);
			conn.release();
		});
	});
});


//Guardar EscalaYesavage
router.post('/guardarEscalaYesavage',(req, res, next) => {
	const data = {
		ef_id: req.body.ef_id,
		ey_p1_satisfecho: req.body.ey_p1_satisfecho,
		ey_p2_actividades: req.body.ey_p2_actividades,
		ey_p3_vacio: req.body.ey_p3_vacio,
		ey_p4_aburrido: req.body.ey_p4_aburrido,
        	ey_p5_animo: req.body.ey_p5_animo,
		ey_p6_preocupado: req.body.ey_p6_preocupado,
		ey_p7_feliz: req.body.ey_p7_feliz,
		ey_p8_desamparado: req.body.ey_p8_desamparado,
		ey_p9_cosas: req.body.ey_p9_cosas,
       		ey_p10_memoria: req.body.ey_p10_memoria,
		ey_p11_estar_vivo: req.body.ey_p11_estar_vivo,
		ey_p12_inutil_despreciable: req.body.ey_p12_inutil_despreciable,
		ey_p13_energia: req.body.ey_p13_energia,
		ey_p14_esperanza_actual: req.body.ey_p14_esperanza_actual,
		ey_p15_cree_mejor: req.body.ey_p15_cree_mejor,
		ey_tiempo_inicial: req.body.ey_tiempo_inicial,
		ey_tiempo_final: req.body.ey_tiempo_final,
		ey_tiempo_total: req.body.ey_tiempo_total,
		ey_estado: req.body.ey_estado,
		ey_puntaje_total: req.body.ey_puntaje_total
	};
	const query = "INSERT INTO escala_yesavage (ef_id, ey_p1_satisfecho, ey_p2_actividades, ey_p3_vacio, ey_p4_aburrido, ey_p5_animo, ey_p6_preocupado, ey_p7_feliz, ey_p8_desamparado, ey_p9_cosas, ey_p10_memoria, ey_p11_estar_vivo, ey_p12_inutil_despreciable, ey_p13_energia, ey_p14_esperanza_actual, ey_p15_cree_mejor, ey_tiempo_inicial, ey_tiempo_final, ey_tiempo_total, ey_estado, ey_puntaje_total) VALUES (" + "\'" + data.ef_id + "\',\'" + data.ey_p1_satisfecho + "\',\'" + data.ey_p2_actividades + "\',\'" + data.ey_p3_vacio + "\',\'" + data.ey_p4_aburrido + "\',\'" + data.ey_p5_animo + "\',\'" + data.ey_p6_preocupado + "\',\'" + data.ey_p7_feliz + "\',\'" + data.ey_p8_desamparado + "\',\'" + data.ey_p9_cosas + "\',\'" + data.ey_p10_memoria+ "\',\'" + data.ey_p11_estar_vivo + "\',\'" + data.ey_p12_inutil_despreciable+ "\',\'" + data.ey_p13_energia + "\',\'" + data.ey_p14_esperanza_actual + "\',\'" + data.ey_p15_cree_mejor + "\',\'" + data.ey_tiempo_inicial + "\',\'" + data.ey_tiempo_final + "\',\'" + data.ey_tiempo_total + "\',\'" + data.ey_estado + "\',\'" + data.ey_puntaje_total + "\')";

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


//Consultar EscalaYesavage por ID
router.get('/consultaEscalaYesavageById/:ey_id', (req,res) =>{
	console.log("Se consultaron datos del test escala Yesavage por Id");
	getConnection(function(err,conn){
		const { ey_id } = req.params;
		if(err){
			return res.sendStatus(400);
		}
		conn.query('SELECT * FROM escala_yesavage WHERE ey_id = ?',[ey_id],function(err,rows){
			if(err){
				conn.release();
				return res.sendStatus(400,'No se puede conectar a la base de datos');
			}

			res.send(rows);
			conn.release();
		});
	});
});


//Consultar EscalaYesavage por ID Adulto Mayor
router.get('/consultaEscalaYesavageByIdAm/:am_id', (req,res) =>{
	console.log("Se consultaron datos del test EscalaYesavage por Id del Adulto Mayor");
	getConnection(function(err,conn){
		const { am_id } = req.params;
		if(err){
			return res.sendStatus(400);
		}
		conn.query('SELECT ey.* FROM escala_yesavage ey INNER JOIN encabezado_formulario ef ON ef.ef_id = ey.ef_id WHERE ef.am_id = ?',[am_id],function(err,rows){
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