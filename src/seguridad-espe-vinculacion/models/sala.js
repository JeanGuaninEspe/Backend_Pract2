import { Schema, model } from 'mongoose';
import { db4 } from './../../databaseMongo.js';


const SalaSchema = Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    codigo: {
      type: String,
      required: true,
      unique: true,
    },
    color: {
      type: String,
      required: true,
    },
    isLike : {
      type: Boolean,
      default: false
    },
    propietario: {
      type: Schema.Types.ObjectId,
      ref: "Usuario",
    },
    isActivo: {
      type: Boolean,
      default: true,
    },
    usuarios: [{ type: Schema.Types.ObjectId, ref: "Usuario" }],
    mensajes: [{ type: Schema.Types.ObjectId, ref: "Mensaje" }],
  },

  {
    timestamps: true,
  }
);

SalaSchema.method("toJSON", function () {
  const { __v, _id,...object } = this.toObject();
  object.uid = _id;
  return object;
});

export default db4.model("Sala", SalaSchema);