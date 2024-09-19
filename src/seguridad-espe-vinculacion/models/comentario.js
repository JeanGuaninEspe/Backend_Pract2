import { Schema, model } from 'mongoose';
import { db4 } from './../../databaseMongo.js';

const ComentarioSchema = Schema(
  {
    contenido: {
      type: String,
      required: true,
    },
    usuario: {
      type: Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },
    publicacion: {
      type: Schema.Types.ObjectId,
      ref: "Publicacion",
      required: true,
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Usuario",
      },
    ],
    estado: {
      type: String,
      enum: ["publicado", "borrador"],
      required: true, 
    },
  },
  {
    timestamps: true,
  }
);


ComentarioSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.uid = _id;
  return object;
});

export default db4.model("Comentario", ComentarioSchema);
