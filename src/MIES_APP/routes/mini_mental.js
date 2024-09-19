import express from 'express';
const router = express.Router();
import { getConnection } from '../conexion.js';

//Consultar todos los puntajes de mimi_mental
router.get('/consultaMiniMental/', (req,res) =>{
	console.log("Se consultaron todos los datos del MiniMental");
	getConnection(function(err,conn){
		if(err){
			return res.sendStatus(400);
		}
		conn.query('SELECT * FROM mini_mental',function(err,rows){
			if(err){
				conn.release();
				return res.sendStatus(400,'No se puede conectar a la base de datos');
			}

			res.send(rows);
			conn.release();
		});
	});
});

//Guardar un nuevo test mini mental
/*
router.post('/guardarMiniMental',(req, res, next) => {
	console.log("Se esta guardando MiniMental");
	const data = {
		ef_id: req.body.ef_id,
        	mim_p1_orientacion_tiempo: req.body.mim_p1_orientacion_tiempo,
       		mim_p2_orientacion_espacio: req.body.mim_p2_orientacion_espacio,
        	mim_p3_memoria: req.body.mim_p3_memoria,
        	mim_p4_atencion_calculo: req.body.mim_p4_atencion_calculo,
        	mim_p5_memoria: req.body.mim_p5_memoria,
        	mim_p6_denominacion: req.body.mim_p6_denominacion,
        	mim_p7_repeticion_frase: req.body.mim_p7_repeticion_frase,
        	mim_p8_compresion: req.body.mim_p8_compresion,
        	mim_p9_lectura: req.body.mim_p9_lectura,
        	mim_p10_escritura: req.body.mim_p10_escritura,
        	mim_p11_copia_dibujo: req.body.mim_p11_copia_dibujo,
        	mim_tiempo_inicial: req.body.mim_tiempo_inicial,
        	mim_tiempo_final: req.body.mim_tiempo_final,
        	mim_tiempo_total: req.body.mim_tiempo_total,
        	mim_estado: req.body.mim_estado,
        	mim_puntaje_total: req.body.mim_puntaje_total
	};
	const query = "INSERT INTO mini_mental (ef_id, mim_p1_orientacion_tiempo, mim_p2_orientacion_espacio, mim_p3_memoria, mim_p4_atencion_calculo, mim_p5_memoria, mim_p6_denominacion, mim_p7_repeticion_frase, mim_p8_compresion, mim_p9_lectura, mim_p10_escritura, mim_p11_copia_dibujo, mim_tiempo_inicial, mim_tiempo_final, mim_tiempo_total, mim_estado, mim_puntaje_total) VALUES (" 
    + "\'" + data.ef_id + "\',\'" + data.mim_p1_orientacion_tiempo + "\',\'" + data.mim_p2_orientacion_espacio + "\',\'" + data.mim_p3_memoria + "\',\'" + data.mim_p4_atencion_calculo + "\',\'" 
    + data.mim_p5_memoria + "\',\'" + data.mim_p6_denominacion + "\',\'" + data.mim_p7_repeticion_frase + "\',\'" + data.mim_p8_compresion + "\',\'" + data.mim_p9_lectura + "\',\'" 
    + data.mim_p10_escritura + "\',\'" + data.mim_p11_copia_dibujo + "\',\'" + data.mim_tiempo_inicial + "\',\'" + data.mim_tiempo_final + "\',\'" + data.mim_tiempo_total + "\',\'" + data.mim_estado + "\',\'" + data.mim_puntaje_total + "\')";

	getConnection(function (err, client) {
		if(err) {
			console.log("No se pudo conectar a la base de datos" + err);

		}
		client.query(query, function (err, result) {
			if(!err) {
				res.json({ status: 'Registro exitoso' });
			}else {
				console.log(err);
			}
		});
	});
});
*/

router.post('/guardarMiniMental',(req, res, next) => {
	console.log("Se esta guardando MiniMental");
	const data = {
			ef_id: req.body.ef_id,
        	mim_orientacion_tiempo_op1: req.body.mim_orientacion_tiempo_op1,
			mim_orientacion_tiempo_op2: req.body.mim_orientacion_tiempo_op2,
			mim_orientacion_tiempo_op3: req.body.mim_orientacion_tiempo_op3,
			mim_orientacion_tiempo_op4: req.body.mim_orientacion_tiempo_op4,
			mim_orientacion_tiempo_op5: req.body.mim_orientacion_tiempo_op5,
       		mim_orientacion_espacio_op1: req.body.mim_orientacion_espacio_op1,
			mim_orientacion_espacio_op2: req.body.mim_orientacion_espacio_op2,
			mim_orientacion_espacio_op3: req.body.mim_orientacion_espacio_op3,
			mim_orientacion_espacio_op4: req.body.mim_orientacion_espacio_op4,
			mim_orientacion_espacio_op5: req.body.mim_orientacion_espacio_op5,
        	mim_memoria_op1: req.body.mim_memoria_op1,
			mim_memoria_op2: req.body.mim_memoria_op2,
			mim_memoria_op3: req.body.mim_memoria_op3,
        	mim_atencion_calculo_op1: req.body.mim_atencion_calculo_op1,
			mim_atencion_calculo_op2: req.body.mim_atencion_calculo_op2,
			mim_atencion_calculo_op3: req.body.mim_atencion_calculo_op3,
			mim_atencion_calculo_op4: req.body.mim_atencion_calculo_op4,
			mim_atencion_calculo_op5: req.body.mim_atencion_calculo_op5,
        	mim_memoria_dif_op1: req.body.mim_memoria_dif_op1,
			mim_memoria_dif_op2: req.body.mim_memoria_dif_op2,
			mim_memoria_dif_op3: req.body.mim_memoria_dif_op3,
        	mim_denominacion_op1: req.body.mim_denominacion_op1,
			mim_denominacion_op2: req.body.mim_denominacion_op2,
        	mim_repeticion_frase_op1: req.body.mim_repeticion_frase_op1,
        	mim_compresion_op1: req.body.mim_compresion_op1,
			mim_compresion_op2: req.body.mim_compresion_op2,
			mim_compresion_op3: req.body.mim_compresion_op3,
        	mim_lectura_op1: req.body.mim_lectura_op1,
        	mim_escritura_op1: req.body.mim_escritura_op1,
        	mim_copia_dibujo_op1: req.body.mim_copia_dibujo_op1,
        	mim_tiempo_inicial: req.body.mim_tiempo_inicial,
        	mim_tiempo_final: req.body.mim_tiempo_final,
        	mim_tiempo_total: req.body.mim_tiempo_total,
        	mim_estado: req.body.mim_estado,
        	mim_puntaje_total: req.body.mim_puntaje_total
	};
	const query = "INSERT INTO mini_mental (ef_id, mim_orientacion_tiempo_op1, mim_orientacion_tiempo_op2, mim_orientacion_tiempo_op3, mim_orientacion_tiempo_op4, mim_orientacion_tiempo_op5, mim_orientacion_espacio_op1,	mim_orientacion_espacio_op2, mim_orientacion_espacio_op3, mim_orientacion_espacio_op4, mim_orientacion_espacio_op5, mim_memoria_op1, mim_memoria_op2, mim_memoria_op3, mim_atencion_calculo_op1, mim_atencion_calculo_op2, mim_atencion_calculo_op3, mim_atencion_calculo_op4,mim_atencion_calculo_op5,mim_memoria_dif_op1,mim_memoria_dif_op2,mim_memoria_dif_op3,mim_denominacion_op1,mim_denominacion_op2,	mim_repeticion_frase_op1,mim_compresion_op1,mim_compresion_op2,	mim_compresion_op3,	mim_lectura_op1,mim_escritura_op1,mim_copia_dibujo_op1, mim_tiempo_inicial, mim_tiempo_final, mim_tiempo_total, mim_estado, mim_puntaje_total) VALUES (" + "\'" + data.ef_id + "\',\'" + data.mim_orientacion_tiempo_op1 + "\',\'" + data.mim_orientacion_tiempo_op2 + "\',\'" + data.mim_orientacion_tiempo_op3 + "\',\'" + data.mim_orientacion_tiempo_op4 + "\',\'" + data.mim_orientacion_tiempo_op5 + "\',\'" + data.mim_orientacion_espacio_op1 + "\',\'" + data.mim_orientacion_espacio_op2 + "\',\'" + data.mim_orientacion_espacio_op3 + "\',\'" + data.mim_orientacion_espacio_op4 + "\',\'" + data.mim_orientacion_espacio_op5 + "\',\'" + data.mim_memoria_op1 + "\',\'" + data.mim_memoria_op2 + "\',\'" + data.mim_memoria_op3 + "\',\'" + data.mim_atencion_calculo_op1 + "\',\'" + data.mim_atencion_calculo_op2 + "\',\'" + data.mim_atencion_calculo_op3 + "\',\'" + data.mim_atencion_calculo_op4 + "\',\'" + data.mim_atencion_calculo_op5 + "\',\'" + data.mim_memoria_dif_op1 + "\',\'" + data.mim_memoria_dif_op2 + "\',\'" + data.mim_memoria_dif_op3 + "\',\'" + data.mim_denominacion_op1 + "\',\'" + data.mim_denominacion_op2 + "\',\'" + data.mim_repeticion_frase_op1 + "\',\'" + data.mim_compresion_op1 + "\',\'" + data.mim_compresion_op2 + "\',\'" + data.mim_compresion_op3 + "\',\'" + data.mim_lectura_op1 + "\',\'" + data.mim_escritura_op1 + "\',\'" + data.mim_copia_dibujo_op1 + "\',\'" + data.mim_tiempo_inicial + "\',\'" + data.mim_tiempo_final + "\',\'" + data.mim_tiempo_total + "\',\'" + data.mim_estado + "\',\'" + data.mim_puntaje_total + "\')";

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


//Consultar Mini Mental por ID
router.get('/consultaMiniMentalById/:mim_id', (req,res) =>{
	console.log("Se consultaron datos del test Mini Mental por Id");
	getConnection(function(err,conn){
		const { mim_id } = req.params;
		if(err){
			return res.sendStatus(400);
		}
		conn.query('SELECT * FROM mini_mental WHERE mim_id = ?',[mim_id],function(err,rows){
			if(err){
				conn.release();
				return res.sendStatus(400,'No se puede conectar a la base de datos');
			}

			res.send(rows);
			conn.release();
		});
	});
});

//Consultar Mini Mental por ID Adulto Mayor
router.get('/consultaMiniMentalByIdAm/:am_id', (req,res) =>{
	console.log("Se consultaron datos del test Mini Mental por Id del Adulto Mayor");
	getConnection(function(err,conn){
		const { am_id } = req.params;
		if(err){
			return res.sendStatus(400);
		}
		conn.query('SELECT mm.* FROM mini_mental mm INNER JOIN encabezado_formulario ef ON ef.ef_id = mm.ef_id WHERE ef.am_id = ?',[am_id],function(err,rows){
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