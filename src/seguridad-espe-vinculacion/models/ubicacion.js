import { Schema, model } from 'mongoose';
import { db4 } from './../../databaseMongo.js';
const UbicacionSchema = Schema(
  {
    latitud: {
      type: Number,
      required: true,
    },
    longitud: {
      type: Number,
      required: true,
    },
    barrio: {
      type: String,
      required: true,
    },
    parroquia: {
      type: String,
    },
    ciudad: {
      type: String,
      required: true,
    },
    pais: {
      type: String,
      required: true,
    },
    referencia : {
      type: String,
    },
    estado: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

UbicacionSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.uid = _id;
  return object;
});

export default db4.model("Ubicacion", UbicacionSchema);
