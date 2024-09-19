import { Schema, model } from 'mongoose';
import { db4 } from './../../databaseMongo.js';
const MensajeSchema = Schema(
  {
    mensaje: {
      type: String,
      required: true,
    },
    usuario: {
      type: Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);


MensajeSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  return object;
});

export default db4.model("Mensaje", MensajeSchema);