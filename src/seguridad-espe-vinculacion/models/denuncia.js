import { Schema, model } from 'mongoose';
import { db4 } from './../../databaseMongo.js';
const DenunciaSchema  =  Schema(
  {
    publicacion: {
      type: Schema.Types.ObjectId,
      ref: 'Publicacion',
      required: true,
    },
    motivo: {
      type: String,
      required: true,
    },
    detalles: {
      type: String,
    },
    denunciante: {
      type: Schema.Types.ObjectId,
      ref: 'Usuario',
      required: true,
    },
    fecha: {
      type: Date,
      default: Date.now,
    },
  },
);

DenunciaSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.uid = _id;
    return object;
});

export default   db4.model('Denuncia', DenunciaSchema);