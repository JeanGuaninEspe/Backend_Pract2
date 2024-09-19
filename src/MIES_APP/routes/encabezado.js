import express from 'express';
const router = express.Router();
import { getConnection } from '../conexion.js';

//Consultar encabezado Id
router.get('/consultaEncabezadoFormularioById/:ef_id', (req,res) =>{
	console.log("Se esta consultando por Id");
	getConnection(function(err,conn){
		const { ef_id } = req.params;
		if(err){
			return res.sendStatus(400);
		}
		conn.query('SELECT * FROM encabezado_formulario WHERE ef_id = ?',[ef_id],function(err,rows){
            if(err){
				conn.release();
				return res.sendStatus(400,'No se puede conectar a la base de datos');
			}

			res.send(rows);
			conn.release();
		});
	});
});

//consultar todos los encabezados
router.get('/encabezados/', (req,res) =>{
	console.log("Se consultaron todos los encabezados");
	getConnection(function(err,conn){
		if(err){
			return res.sendStatus(400);
		}
		conn.query('SELECT * FROM encabezado_formulario',function(err,rows){
			if(err){
				conn.release();
				return res.sendStatus(400,'No se puede conectar a la base de datos');
			}

			res.send(rows);
			conn.release();
		});
	});
});


router.post('/guardarEncabezado/',(req, res, next) => {
	console.log("Se guarda encabezados");
	const data = {
		am_id: req.body.am_id,
		ef_observacion_preguntas: req.body.ef_observacion_preguntas,
		ef_observacion_tecnico: req.body.ef_observacion_tecnico,
		ef_ubicacion: req.body.ef_ubicacion,
		ef_estado: req.body.ef_estado,
		ef_representante: req.body.ef_representante,
		ef_foto_adulto: req.body.ef_foto_adulto,
		ef_tiempo_inicial: req.body.ef_tiempo_inicial,
		ef_tiempo_final: req.body.ef_tiempo_final,
		ef_tiempo_total: req.body.ef_tiempo_total,
		ef_fecha_aplicacion: req.body.ef_fecha_aplicacion
	};
	const query = "INSERT INTO encabezado_formulario (am_id,ef_observacion_preguntas,ef_observacion_tecnico,ef_ubicacion,ef_estado,ef_representante,ef_foto_adulto,ef_tiempo_inicial,ef_tiempo_final,ef_tiempo_total,ef_fecha_aplicacion) VALUES (" + "\'" + data.am_id + "\',\'" + data.ef_observacion_preguntas + "\',\'" + data.ef_observacion_tecnico + "\',\'" + data.ef_ubicacion + "\',\'" + data.ef_estado + "\',\'" + data.ef_representante + "\',\'" + data.ef_foto_adulto + "\',\'" + data.ef_tiempo_inicial + "\',\'" + data.ef_tiempo_final + "\',\'" + data.ef_tiempo_total + "\',\'" + data.ef_fecha_aplicacion + "\')";

	getConnection(function (err, client) {
		if(err) {
			console.log("No se pudo conectar a la base de datos" + err);

		}
		client.query(query, function (err, result) {
			if(!err) {
				res.json({ status: 'Registro exitoso' });
			}else {
				console.log(err);
				res.status(500).json({error: 'No se realiza el insert.'});
			}
		})
	})
})

//Actualizar encabezado por id
router.post('/actualizarFotObsEncabezadoById/:id',(req, res, next) => {
	console.log("Se actualiza encabezado");
	const{id} = req.params;
	const data = {
		ef_observacion_preguntas: req.body.ef_observacion_preguntas,
		ef_observacion_tecnico: req.body.ef_observacion_tecnico,
		ef_foto_adulto: req.body.ef_foto_adulto
	};
	const query = "UPDATE encabezado_formulario SET ef_observacion_preguntas = \'" + data.ef_observacion_preguntas + "\' , ef_observacion_tecnico = \'" + data.ef_observacion_tecnico + "\' , ef_foto_adulto = \'" + data.ef_foto_adulto + "\' WHERE ef_id= " + id;
	
	getConnection(function (err, client) {
		if(err) {
			console.log("No se pudo conectar a la base de datos" + err);

		}
		client.query(query, function (err, result) {
			if(!err) {
				res.json({ status: 'Actualizacion exitosa' });
			}else {
				console.log(err);
			}
		})
	});
});

//Actualizar foto del encabezado por id
router.post('/actualizarFotoEncabezadoById/:id',(req, res, next) => {
	console.log("Se actualiza foto del encabezado");
	const{id} = req.params;
	const data = {
		ef_foto_adulto: req.body.ef_foto_adulto
	};
	const query = "UPDATE encabezado_formulario SET ef_foto_adulto = \'" + data.ef_foto_adulto + "\' WHERE ef_id= " + id;
	
	getConnection(function (err, client) {
		if(err) {
			console.log("No se pudo conectar a la base de datos" + err);

		}
		client.query(query, function (err, result) {
			if(!err) {
				res.json({ status: 'Actualizacion exitosa' });
			}else {
				console.log(err);
			}
		})
	});
});

//Consultar n encabezados
router.get('/ultimoIdEncabezado/', (req,res) =>{
	console.log("Se esta consultando cantida de encabezados");
	getConnection(function(err,conn){
		if(err){
			return res.sendStatus(400);
		}
		conn.query('SELECT count(ef_id) as "Cantidad" FROM mies.encabezado_formulario',function(err,rows){
            if(err){
				conn.release();
				return res.sendStatus(400,'No se puede conectar a la base de datos');
			}

			res.send(rows);
			conn.release();
		});
	});
});

router.get('/ultimoIdEncabezado2/:am_id', (req,res) =>{
	console.log("Se esta consultando ultimo encabezados de adulto mayor");
	const{am_id} = req.params;
	getConnection(function(err,conn){
		if(err){
			return res.sendStatus(400);
		}
		conn.query('select ef_id from mies.encabezado_formulario where am_id = ? order by ef_id desc limit 1;',[am_id],function(err,rows){
            if(err){
				conn.release();
				return res.sendStatus(400,'No se puede conectar a la base de datos');
			}

			res.send(rows);
			conn.release();
		});
	});
});


router.post('/guardarEncabezado2/',(req, res, next) => {
	console.log("Se guarda encabezados");
	const data = {
		ef_id: req.body.ef_id,
		am_id: req.body.am_id,
		ef_observacion_preguntas: req.body.ef_observacion_preguntas,
		ef_observacion_tecnico: req.body.ef_observacion_tecnico,
		ef_ubicacion: req.body.ef_ubicacion,
		ef_estado: req.body.ef_estado,
		ef_representante: req.body.ef_representante,
		ef_foto_adulto: req.body.ef_foto_adulto,
		ef_tiempo_inicial: req.body.ef_tiempo_inicial,
		ef_tiempo_final: req.body.ef_tiempo_final,
		ef_tiempo_total: req.body.ef_tiempo_total,
		ef_fecha_aplicacion: req.body.ef_fecha_aplicacion
	};
	const query = "INSERT INTO encabezado_formulario (ef_id, am_id,ef_observacion_preguntas,ef_observacion_tecnico,ef_ubicacion,ef_estado,ef_representante,ef_foto_adulto,ef_tiempo_inicial,ef_tiempo_final,ef_tiempo_total,ef_fecha_aplicacion) VALUES (" + "\'" + data.ef_id + "\',\'" + data.am_id + "\',\'" + data.ef_observacion_preguntas + "\',\'" + data.ef_observacion_tecnico + "\',\'" + data.ef_ubicacion + "\',\'" + data.ef_estado + "\',\'" + data.ef_representante + "\',\'" + data.ef_foto_adulto + "\',\'" + data.ef_tiempo_inicial + "\',\'" + data.ef_tiempo_final + "\',\'" + data.ef_tiempo_total + "\',\'" + data.ef_fecha_aplicacion + "\')";

	getConnection(function (err, client) {
		if(err) {
			console.log("No se pudo conectar a la base de datos" + err);

		}
		client.query(query, function (err, result) {
			if(!err) {
				res.json({ status: 'Registro exitoso' });
			}else {
				console.log(err);
				res.status(500).json({error: 'No se realiza el insert.'});
			}
		})
	})
})




export default router;