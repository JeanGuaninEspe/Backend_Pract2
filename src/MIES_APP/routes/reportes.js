import express from 'express';
const router = express.Router();
import { getConnection } from '../conexion.js';

//Consultar Indice Barthel por ID
router.get('/reporteBarthelById/:ib_id', (req,res) =>{
	console.log("Se consultaron reportes del test Indice Barthel por Id");
	getConnection(function(err,conn){
		const { ib_id } = req.params;
		if(err){
			return res.sendStatus(400);
		}
		conn.query('SELECT am.am_nombre, und.uni_zona, und.uni_distrito, und.uni_modalidad, und.uni_unidad_atencion, am.am_fecha_de_nacimiento, tec.tec_nombre, tec.tec_apellido, enc.ef_fecha_aplicacion, ib.* FROM mies.indice_barthel as ib inner join mies.encabezado_formulario as enc on enc.ef_id = ib.ef_id inner join mies.adulto_mayor as am on am.am_id = enc.am_id inner join mies.und_atencion as und on und.uni_id = am.uni_id inner join mies.tecnico as tec on tec.tec_id = am.tec_id where ib.ef_id = ?',[ib_id],function(err,rows){
			if(err){
				conn.release();
				return res.sendStatus(400,'No se puede conectar a la base de datos');
			}

			res.send(rows);
			conn.release();
		});
	});
});

//Consultar Indice Barthel por ID
router.get('/reporteLawtonById/:elb_id', (req,res) =>{
	console.log("Se consultaron reportes del test Lawton por Id");
	getConnection(function(err,conn){
		const { elb_id } = req.params;
		if(err){
			return res.sendStatus(400);
		}
		conn.query('SELECT am.am_nombre, und.uni_zona, und.uni_distrito, und.uni_modalidad, und.uni_unidad_atencion, am.am_fecha_de_nacimiento, tec.tec_nombre, tec.tec_apellido, enc.ef_fecha_aplicacion, elb.* FROM mies.escala_lawton_brody as elb inner join mies.encabezado_formulario as enc on enc.ef_id = elb.ef_id inner join mies.adulto_mayor as am on am.am_id = enc.am_id inner join mies.und_atencion as und on und.uni_id = am.uni_id inner join mies.tecnico as tec on tec.tec_id = am.tec_id where elb.ef_id = ?',[elb_id],function(err,rows){
			if(err){
				conn.release();
				return res.sendStatus(400,'No se puede conectar a la base de datos');
			}

			res.send(rows);
			conn.release();
		});
	});
});

//Consultar Indice Barthel por ID 
router.get('/reporteYesavajeById/:ely_id', (req,res) =>{
	console.log("Se consultaron reportes del test Yesavaje por Id");
	getConnection(function(err,conn){
		const { ely_id } = req.params;
		if(err){
			return res.sendStatus(400);
		}
		conn.query('SELECT am.am_nombre, und.uni_zona, und.uni_distrito, und.uni_modalidad, und.uni_unidad_atencion, am.am_fecha_de_nacimiento, tec.tec_nombre, tec.tec_apellido, enc.ef_fecha_aplicacion, ely.* FROM mies.escala_yesavage as ely inner join mies.encabezado_formulario as enc on enc.ef_id = ely.ef_id inner join mies.adulto_mayor as am on am.am_id = enc.am_id inner join mies.und_atencion as und on und.uni_id = am.uni_id inner join mies.tecnico as tec on tec.tec_id = am.tec_id where ely.ef_id =	?',[ely_id],function(err,rows){
			if(err){
				conn.release();
				return res.sendStatus(400,'No se puede conectar a la base de datos');
			}

			res.send(rows);
			conn.release();
		});
	});
});

//Consultar Indice Barthel por ID 
router.get('/reporteMiniById/:mim_id', (req,res) =>{
	console.log("Se consultaron reportes del test Yesavaje por Id");
	getConnection(function(err,conn){
		const { mim_id } = req.params;
		if(err){
			return res.sendStatus(400);
		}
		conn.query('SELECT am.am_nombre, und.uni_zona, und.uni_distrito, und.uni_modalidad, und.uni_unidad_atencion, am.am_fecha_de_nacimiento, tec.tec_nombre, tec.tec_apellido, enc.ef_fecha_aplicacion, min.* FROM mies.mini_mental as min inner join mies.encabezado_formulario as enc on enc.ef_id = min.ef_id inner join mies.adulto_mayor as am on am.am_id = enc.am_id inner join mies.und_atencion as und on und.uni_id = am.uni_id inner join mies.tecnico as tec on tec.tec_id = am.tec_id where min.ef_id =  ?',[mim_id],function(err,rows){
			if(err){
				conn.release();
				return res.sendStatus(400,'No se puede conectar a la base de datos');
			}

			res.send(rows);
			conn.release();
		});
	});
});

/*
SELECT am.am_nombre, und.uni_zona, und.uni_distrito, und.uni_modalidad, und.uni_unidad_atencion, am.am_fecha_de_nacimiento, tec.tec_nombre, tec.tec_apellido, enc.ef_fecha_aplicacion, min.* FROM mies.mini_mental as min inner join mies.encabezado_formulario as enc on enc.ef_id = min.ef_id inner join mies.adulto_mayor as am on am.am_id = enc.am_id inner join mies.und_atencion as und on und.uni_id = am.uni_id inner join mies.tecnico as tec on tec.tec_id = am.tec_id where min.ef_id = */
export default router;