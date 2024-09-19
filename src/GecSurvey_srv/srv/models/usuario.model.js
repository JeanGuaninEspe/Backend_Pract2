import { Schema, model } from 'mongoose';
import { db1 } from '../../../databaseMongo.js';

const usuarioSchema = new Schema({
    usuario: {type: String, required: true},
    nombre: {type: String, required: true},
    apellido: {type: String, required: true},
    contrasenia: {type: String, required: true}
});

export default db1.model('usuario',usuarioSchema);