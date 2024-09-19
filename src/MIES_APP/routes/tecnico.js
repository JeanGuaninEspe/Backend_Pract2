// import express from 'express';
import express from 'express';
const router = express.Router();
// const getConnection = require('../conexion.js');
import { getConnection } from '../conexion.js';

//Consultar tecnico cedula
router.get('/tecnicoByCedula/:cedula', (req,res) =>{
	console.log("El Tecnico entro por usuario y contraseÃ±a");
	getConnection(function(err,conn){
		const { cedula } = req.params;
		if(err){
			return res.sendStatus(400);
		}
		conn.query('SELECT * FROM tecnico WHERE tec_cedula = ?',[cedula],function(err,rows){
            if(err){
				conn.release();
				return res.sendStatus(400,'No se puede conectar a la base de datos');
			}

			res.send(rows);
			conn.release();
		});
	});
});

//Consultar tecnico id
router.get('/tecnicoBySupId/:id', (req,res) =>{
	console.log("El Tecnico consulto por id");
	getConnection(function(err,conn){
		const {id} = req.params;
		if(err){
			return res.sendStatus(400);
		}
		conn.query('SELECT * FROM tecnico WHERE sup_id = ?',[id],function(err,rows){
            if(err){
				conn.release();
				return res.sendStatus(400,'No se puede conectar a la base de datos');
			}

			res.send(rows);
			conn.release();
		});
	});
});


//consultar todos los tecnicos
router.get('/tecnicos/', (req,res) =>{
	console.log("Se consultaron todos los datos del tecnico");
	getConnection(function(err,conn){
		if(err){
			return res.sendStatus(400);
		}
		conn.query('SELECT * FROM tecnico',function(err,rows){
			if(err){
				conn.release();
				return res.sendStatus(400,'No se puede conectar a la base de datos');
			}

			res.send(rows);
			conn.release();
		});
	});
});



//Guardar un nuevo tecnico
router.post('/guardarTecnico',(req, res, next) => {
	const data = {
		sup_id: req.body.sup_id,
		tec_nombre: req.body.tec_nombre,
		tec_apellido: req.body.tec_apellido,
		tec_cedula: req.body.tec_cedula,
		tec_telefono: req.body.tec_telefono,
		tec_correo: req.body.tec_correo,
		tec_direccion: req.body.tec_direccion,
		tec_contraseña: req.body.tec_contraseña
	};
	const query = "INSERT INTO tecnico (sup_id, tec_nombre, tec_apellido, tec_cedula, tec_telefono, tec_correo, tec_direccion, tec_contraseña) VALUES (" + "\'" + data.sup_id + "\',\'" + data.tec_nombre + "\',\'" + data.tec_apellido + "\',\'" + data.tec_cedula + "\',\'" + data.tec_telefono + "\',\'" + data.tec_correo + "\',\'" + data.tec_direccion + "\',\'" + data.tec_contraseña + "\')";

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
		})
	})
})

//Eliminar tecnico por id
router.get('/eliminarTecnicoById/:id', (req, res) => {
	getConnection(function (err, conn) {
		const {id} = req.params;
		if (err) {
			return res.send(err);
		}
		conn.query('DELETE FROM tecnico WHERE tec_id = ?', [id], function (err , rows) {
			if (err) {
				conn.release();
				return res.send(400, 'No se puede conectar a la base de datos');
			}
			res.send('Registro eliminado');

			conn.release();
		})
	})
});

//Actualizar tecnico por id
router.post('/actualizarTecnicoById/:id',(req, res, next) => {
	console.log("Se actualiza Tecnico");
	const{id} = req.params;
	const data = {
		sup_id: req.body.sup_id,
		tec_nombre: req.body.tec_nombre,
		tec_apellido: req.body.tec_apellido,
		tec_cedula: req.body.tec_cedula,
		tec_telefono: req.body.tec_telefono,
		tec_correo: req.body.tec_correo,
		tec_direccion: req.body.tec_direccion,
		tec_contraseña: req.body.tec_contraseña
	};
	const query = "UPDATE tecnico SET sup_id = " + data.sup_id + ", tec_nombre= \'" + data.tec_nombre + "\', tec_apellido= \'"+ data.tec_apellido + "\', tec_cedula = \'" + data.tec_cedula + "\', tec_telefono = \'" + data.tec_telefono + "\', tec_correo = \'" + data.tec_correo + "\', tec_direccion = \'" + data.tec_direccion + "\', tec_contraseña = \'" + data.tec_contraseña + "\' WHERE tec_id= " + id;
	
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


export default router;