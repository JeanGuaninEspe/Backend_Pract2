import mongoose from 'mongoose';
const { Schema } = mongoose;
import { db2 } from './../../databaseMongo.js';

const encuesta2Schema = new Schema({
    id_encuestador:{type: String, required: true},
    codigo_encuesta:{type: String, required:true, unique:true},
    lugar:{type: String, required: true},
    longitud:{type: String, required:false},
    latitud:{type: String, required: false},
    fecha:{type: String, required: true},
    horaInicio:{type: String, required: true},
    horaFin: {type: String, required: true},
    horaMuestra: {type: String, required: true},
    nombre_persona:{type: String, required: true},
    direccion_persona:{type: String, required: false},
    comunidad:{type: String, required: false},
    barrio: {type: String, required: false},
    junta: {type: String, required: false},
    aspecto: {type: String, required: true},
    observaciones: {type: String, required: false},    
    cloroLibreResidual: {type: String, required: true},
    pH: {type: String, required: true},
    monocloroaminas: {type: String, required: true},
    conductividad: {type: String, required: true}
});

export default db2.model("Encuesta2", encuesta2Schema);