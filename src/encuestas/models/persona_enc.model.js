import mongoose from 'mongoose';
const { Schema } = mongoose;
import { db2 } from './../../databaseMongo.js';

const persona_encSchema = new Schema({
    codigo_persona:{type: String, required: true, unique:true},
    nombre_persona:{type: String, required:true},
    dir_persona:{type: String, required:true},
    com_persona:{type: String, required:true},
    barr_persona:{type: String, required:true},
    jun_ag_persona:{type: String, required:true},
    edad_persona:{type: String, required:true},
    sexo_persona:{type: String, required:true},
    longitud_persona:{type: String, required:true},
    latitud_persona:{type: String, required:true}
});

export default db2.model("Persona_enc", persona_encSchema);