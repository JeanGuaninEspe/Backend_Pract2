import { Schema, model } from 'mongoose';
import { db1 } from '../../../databaseMongo.js';

const encuestaSchema = new Schema({
    usuario: String,
    encuestado: {},
    encuesta: {}
});
 
export default db1.model('encuestas_f1', encuestaSchema);