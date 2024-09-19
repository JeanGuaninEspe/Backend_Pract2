import express from 'express';
const router = express.Router();
import { getConnection } from '../conexion.js';

//Consulta de adulto mayor por Id
router.get('/adultoMayorById/:am_id', (req,res) =>{
	console.log("Consulta de adulto mayor por ID");
	getConnection(function(err,conn){
		const { am_id } = req.params;
		
		if(err){
			return res.sendStatus(400);
		}
		conn.query('SELECT * FROM adulto_mayor WHERE am_id = ?',[am_id],function(err,rows){
			if(err){
				conn.release();
				return res.sendStatus(400,'No se puede conectar a la base de datos');
			}

			res.send(rows);
			conn.release();
		});
	});
});


//consulta de todos los adultos mayores registrados
router.get('/adultosMayores/', (req,res) =>{
	console.log("Consulta de todos los adultos mayores registrados");
	getConnection(function(err,conn){
		const {  } = req.params;
		
		if(err){
			return res.sendStatus(400);
		}
		conn.query('SELECT * FROM adulto_mayor ',function(err,rows){
			if(err){
				conn.release();
				return res.sendStatus(400,'No se puede conectar a la base de datos');
			}

			res.send(rows);
			conn.release();
		});
	});
});

//Insertar nuevo adulto mayor
router.post('/guardarAdultoMayor/',(req, res, next) => {
	const data = {
		am_id: req.body.am_id,
		tec_id: req.body.tec_id,
		uni_id: req.body.uni_id,
		am_cedula: req.body.am_cedula,
		am_nombre: req.body.am_nombre,
        	am_apellido: req.body.am_apellido,
		am_fecha_de_nacimiento: req.body.am_fecha_de_nacimiento,
		am_sexo: req.body.am_sexo,
		am_autoidentificacion_etnica: req.body.am_autoidentificacion_etnica,
		am_pais_de_origen: req.body.am_pais_de_origen,
        	am_fecha_registro: req.body.am_fecha_registro,
        	am_domicilio: req.body.am_domicilio
	};
	const query = "INSERT INTO adulto_mayor (am_id, tec_id, uni_id, am_cedula, am_nombre, am_apellido, am_fecha_de_nacimiento, am_sexo, am_autoidentificacion_etnica, am_pais_de_origen, am_fecha_registro, am_domicilio) VALUES (" + "\'" + data.am_id + "\',\'" + data.tec_id + "\',\'" + data.uni_id + "\',\'" + data.am_cedula + "\',\'" + data.am_nombre + "\',\'" + data.am_apellido + "\',\'" + data.am_fecha_de_nacimiento + "\',\'" + data.am_sexo + "\',\'" + data.am_autoidentificacion_etnica + "\',\'" + data.am_pais_de_origen + "\',\'" + data.am_fecha_registro + "\',\'" + data.am_domicilio + "\')";

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
		})
	})
});


//Eliminar adulto_mayor por id
router.delete('/eliminarAdultoMayorById/:id', (req, res) => {
	getConnection(function (err, conn) {
		const {id} = req.params;
		if (err) {
			return res.send(err);
		}
		conn.query('DELETE FROM adulto_mayor WHERE am_id = ?', [id], function (err , rows) {
			if (err) {
				conn.release();
				return res.send(400, 'No se puede conectar a la base de datos');
			}
			res.send('Registro eliminado');

			conn.release();
		})
	})
});


export default router;

