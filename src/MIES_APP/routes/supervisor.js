import express from 'express';
const router = express.Router();
import { getConnection } from '../conexion.js';

//Consultar supervisor por cedula
router.get('/supervisorByCedula/:cedula', (req,res) =>{
	console.log("El supervisor entro por usuario y contraseña");
	getConnection(function(err,conn){
		const { cedula } = req.params;
		if(err){
			return res.sendStatus(400);
		}
		conn.query('SELECT * FROM supervisor WHERE sup_cedula = ?',[cedula],function(err,rows){
            if(err){
				conn.release();
				return res.sendStatus(400,'No se puede conectar a la base de datos');
			}

			res.send(rows);
			conn.release();
		});
	});
});

//consultar todos los supervisores
router.get('/supervisores/', (req,res) =>{
	console.log("Se consultaron todos los datos de los supervisores");
	getConnection(function(err,conn){
		if(err){
			return res.sendStatus(400);
		}
		conn.query('SELECT * FROM supervisor',function(err,rows){
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