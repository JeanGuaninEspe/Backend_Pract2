import express from 'express';
const router = express.Router();
import { getConnection } from '../conexion.js';

//Consultar tecnico cedula
router.get('/testAmById/:am_id', (req,res) =>{
	console.log("El Tecnico entro por usuario y contraseÃ±a");
	getConnection(function(err,conn){
		const { am_id } = req.params;
		if(err){
			return res.sendStatus(400);
		}

		conn.query('SELECT elb.*, ey.*, ib.*, mm.* FROM encabezado_formulario ef INNER JOIN escala_lawton_brody elb  ON  elb.ef_id = ef.ef_id INNER JOIN escala_yesavage ey ON ey.ef_id = ef.ef_id INNER JOIN indice_barthel ib ON ib.ef_id  = ef.ef_id INNER JOIN mini_mental mm ON mm.ef_id = mm.ef_id WHERE ef.am_id = ?',[am_id],function(err,rows){
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