import mongoose from 'mongoose';
const { Schema } = mongoose;
import { db2 } from './../../databaseMongo.js';

const encuestadorSchema = new Schema({
    codigo:{type: String, required: true, unique:true},
    nombre:{type: String, required:true}
});

export default db2.model("Encuestador", encuestadorSchema);