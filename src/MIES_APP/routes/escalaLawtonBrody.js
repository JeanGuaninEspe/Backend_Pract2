import express from 'express';
const router = express.Router();
import { getConnection } from '../conexion.js';

//consultar escala lawton
router.get('/consultaEscalaLawtonBrody/', (req,res) =>{
	console.log("Se consultaron datos del test escala Lawton Brody");
	getConnection(function(err,conn){
		if(err){
			return res.sendStatus(400);
		}
		conn.query('SELECT * FROM escala_lawton_brody',function(err,rows){
			if(err){
				conn.release();
				return res.sendStatus(400,'No se puede conectar a la base de datos');
			}

			res.send(rows);
			conn.release();
		});
	});
});

//Guardar escala_lawton_brody

router.post('/guardarEscalaLawtonBrody',(req, res, next) => {
	console.log("Se estan guardando test escala Lawton Brody");
	const data = {
		ef_id: req.body.ef_id,
        elb_p1_usar_telefono: req.body.elb_p1_usar_telefono,
        elb_p2_hacer_compras: req.body.elb_p2_hacer_compras,
        elb_p3_preparar_comida: req.body.elb_p3_preparar_comida,
        elb_p4_cuidado_casa: req.body.elb_p4_cuidado_casa,
        elb_p5_lavar_ropa: req.body.elb_p5_lavar_ropa,
        elb_p6_uso_transporte: req.body.elb_p6_uso_transporte,
        elb_p7_medicacion: req.body.elb_p7_medicacion,
        elb_p8_utiliza_dinero: req.body.elb_p8_utiliza_dinero,
        elb_tiempo_inicial: req.body.elb_tiempo_inicial,
        elb_tiempo_final: req.body.elb_tiempo_final,
        elb_tiempo_total: req.body.elb_tiempo_total,
        elb_estado: req.body.elb_estado,
        elb_puntaje_total: req.body.elb_puntaje_total
	};
	const query = "INSERT INTO escala_lawton_brody (ef_id, elb_p1_usar_telefono, elb_p2_hacer_compras, elb_p3_preparar_comida, elb_p4_cuidado_casa, elb_p5_lavar_ropa, elb_p6_uso_transporte, elb_p7_medicacion, elb_p8_utiliza_dinero, elb_tiempo_inicial, elb_tiempo_final, elb_tiempo_total, elb_estado, elb_puntaje_total) VALUES (" + "\'" + data.ef_id + "\',\'" + data.elb_p1_usar_telefono + "\',\'" + data.elb_p2_hacer_compras + "\',\'" + data.elb_p3_preparar_comida + "\',\'" + data.elb_p4_cuidado_casa + "\',\'" + data.elb_p5_lavar_ropa + "\',\'" + data.elb_p6_uso_transporte + "\',\'" + data.elb_p7_medicacion + "\',\'" + data.elb_p8_utiliza_dinero + "\',\'" + data.elb_tiempo_inicial + "\',\'" + data.elb_tiempo_final + "\',\'" + data.elb_tiempo_total + "\',\'" + data.elb_estado + "\',\'" + data.elb_puntaje_total + "\')";

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


/*
router.post('/guardarEscalaLawtonBrody',(req, res, next) => {
	console.log("Se estan guardando test escala Lawton Brody");
	const data = {
		ef_id: req.body.ef_id,
        elb_usar_telefono_op1: req.body.elb_usar_telefono_op1,
		elb_usar_telefono_op2: req.body.elb_usar_telefono_op2,
		elb_usar_telefono_op3: req.body.elb_usar_telefono_op3,
		elb_usar_telefono_op4: req.body.elb_usar_telefono_op4,
        elb_hacer_compras_op1: req.body.elb_hacer_compras_op1,
		elb_hacer_compras_op2: req.body.elb_hacer_compras_op2,
		elb_hacer_compras_op3: req.body.elb_hacer_compras_op3,
		elb_hacer_compras_op4: req.body.elb_hacer_compras_op4,
		elb_preparar_comida_op1: req.body.elb_preparar_comida_op1,
		elb_preparar_comida_op2: req.body.elb_preparar_comida_op2,
		elb_preparar_comida_op3: req.body.elb_preparar_comida_op3,
        elb_preparar_comida_op4: req.body.elb_preparar_comida_op4,
		elb_cuidado_casa_op1: req.body.elb_cuidado_casa_op1,
		elb_cuidado_casa_op2: req.body.elb_cuidado_casa_op2,
		elb_cuidado_casa_op3: req.body.elb_cuidado_casa_op3,
        elb_cuidado_casa_op4: req.body.elb_cuidado_casa_op4,
		elb_cuidado_casa_op5: req.body.elb_cuidado_casa_op5,
        elb_lavar_ropa_op1: req.body.elb_lavar_ropa_op1,
		elb_lavar_ropa_op2: req.body.elb_lavar_ropa_op2,
		elb_lavar_ropa_op3: req.body.elb_lavar_ropa_op3,
        elb_uso_transporte_op1: req.body.elb_uso_transporte_op1,
		elb_uso_transporte_op2: req.body.elb_uso_transporte_op2,
		elb_uso_transporte_op3: req.body.elb_uso_transporte_op3,
		elb_uso_transporte_op4: req.body.elb_uso_transporte_op4,
		elb_uso_transporte_op5: req.body.elb_uso_transporte_op5,
        elb_medicacion_op1: req.body.elb_medicacion_op1,
		elb_medicacion_op2: req.body.elb_medicacion_op2,
		elb_medicacion_op3: req.body.elb_medicacion_op3,
        elb_utiliza_dinero_op1: req.body.elb_utiliza_dinero_op1,
		elb_utiliza_dinero_op2: req.body.elb_utiliza_dinero_op2,
		elb_utiliza_dinero_op3: req.body.elb_utiliza_dinero_op3,
        elb_tiempo_inicial: req.body.elb_tiempo_inicial,
        elb_tiempo_final: req.body.elb_tiempo_final,
        elb_tiempo_total: req.body.elb_tiempo_total,
        elb_estado: req.body.elb_estado,
        elb_puntaje_total: req.body.elb_puntaje_total
	};
	const query = "INSERT INTO escala_lawton_brody (ef_id,elb_usar_telefono_op1,elb_usar_telefono_op2,elb_usar_telefono_op3,elb_usar_telefono_op4,elb_hacer_compras_op1,elb_hacer_compras_op2,elb_hacer_compras_op3,elb_hacer_compras_op4,elb_preparar_comida_op1,elb_preparar_comida_op2, elb_preparar_comida_op3,	elb_preparar_comida_op4, elb_cuidado_casa_op1,elb_cuidado_casa_op2,elb_cuidado_casa_op3,elb_cuidado_casa_op4,elb_cuidado_casa_op5,elb_lavar_ropa_op1,elb_lavar_ropa_op2,elb_lavar_ropa_op3,	elb_uso_transporte_op1,	elb_uso_transporte_op2,	elb_uso_transporte_op3,	elb_uso_transporte_op4,	elb_uso_transporte_op5,	elb_medicacion_op1,	elb_medicacion_op2,	elb_medicacion_op3,	elb_utiliza_dinero_op1,	elb_utiliza_dinero_op2,	elb_utiliza_dinero_op3,	elb_tiempo_inicial,	elb_tiempo_final, elb_tiempo_total, elb_estado,	elb_puntaje_total) VALUES (" + "\'" + data.ef_id + "\',\'" + data.elb_usar_telefono_op1 + "\',\'" + data.elb_usar_telefono_op2 + "\',\'" + data.elb_usar_telefono_op3 + "\',\'" + data.elb_usar_telefono_op4 + "\',\'" 	+ data.elb_hacer_compras_op1 + "\',\'" + data.elb_hacer_compras_op2 + "\',\'" + data.elb_hacer_compras_op3 + "\',\'" + data.elb_hacer_compras_op4 + "\',\'" + data.elb_preparar_comida_op1 + "\',\'" + data.elb_preparar_comida_op2 + "\',\'" + data.elb_preparar_comida_op3 + "\',\'" + data.elb_preparar_comida_op4 + "\',\'" + data.elb_cuidado_casa_op1 + "\',\'" + data.elb_cuidado_casa_op2 + "\',\'" + data.elb_cuidado_casa_op3 + "\',\'" + data.elb_cuidado_casa_op4 + "\',\'" + data.elb_cuidado_casa_op5 + "\',\'" + data.elb_lavar_ropa_op1 + "\',\'" + data.elb_lavar_ropa_op2 + "\',\'" + data.elb_lavar_ropa_op3 + "\',\'" + data.elb_uso_transporte_op1 + "\',\'" + data.elb_uso_transporte_op2 + "\',\'" + data.elb_uso_transporte_op3 + "\',\'" + data.elb_uso_transporte_op4 + "\',\'" + data.elb_uso_transporte_op5 + "\',\'" + data.elb_medicacion_op1 + "\',\'" + data.elb_medicacion_op2 + "\',\'" + data.elb_medicacion_op3 + "\',\'" + data.elb_utiliza_dinero_op1 + "\',\'" + data.elb_utiliza_dinero_op2 + "\',\'" + data.elb_utiliza_dinero_op3 + "\',\'" + data.elb_tiempo_inicial + "\',\'" + data.elb_tiempo_final + "\',\'" + data.elb_tiempo_total + "\',\'" + data.elb_estado + "\',\'" + data.elb_puntaje_total + "\')";

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

//Consultar escala_lawton_brody por ID
router.get('/consultaEscalaLawtonBrodyById/:elb_id', (req,res) =>{
	console.log("Se consultaron datos del test escala Lawton Brody por Id");
	getConnection(function(err,conn){
		const { elb_id } = req.params;
		if(err){
			return res.sendStatus(400);
		}
		conn.query('SELECT * FROM escala_lawton_brody WHERE elb_id = ?',[elb_id],function(err,rows){
			if(err){
				conn.release();
				return res.sendStatus(400,'No se puede conectar a la base de datos');
			}

			res.send(rows);
			conn.release();
		});
	});
});

//Consultar escala_lawton_brody por ID Adulto Mayor
router.get('/consultaEscalaLawtonBrodyByIdAm/:am_id', (req,res) =>{
	console.log("Se consultaron datos del test escala Lawton Brody por Id del Adulto Mayor");
	getConnection(function(err,conn){
		const { am_id } = req.params;
		if(err){
			return res.sendStatus(400);
		}
		conn.query('SELECT elb.* FROM escala_lawton_brody elb INNER JOIN encabezado_formulario ef ON ef.ef_id = elb.ef_id WHERE ef.am_id = ?',[am_id],function(err,rows){
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