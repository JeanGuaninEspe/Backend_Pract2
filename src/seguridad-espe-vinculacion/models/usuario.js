import { Schema, model } from 'mongoose';
import { db4 } from './../../databaseMongo.js';


const UsuarioSchema = Schema({
  nombre: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  ubicaciones: [
    {
      type: Schema.Types.ObjectId,
      ref: "Ubicacion",
    },
  ],  
  unidadEducativa: {
    type: String,
    required: true,
  },
  telefono: {
    type: String,
  },
  telefonos : [
    {
      type: String,
    }
  ],
  img: {
    type: String,
  },
  online: {
    type: Boolean,
    default: false,
  },
  tokenApp: {
    type: String,
    default: null,
  },
  google: {
    type: Boolean,
    default: false,
  },
  isOpenRoom: {
    type: Boolean,
    default: false,
  },
  isActivo: {
    type: Boolean,
    default: true,
  },
  isPublicacionPendiente: {
    type: Boolean,
    default: false,
  },
  isSalasPendiente: {
    type: Boolean,
    default: false,
  },
  isNotificacionesPendiente: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    required: true,
    default: "USER_ROLE",
  },
  salas: [
    {
      salaId: { type: Schema.Types.ObjectId, ref: "Sala" },
      mensajesNoLeidos: { type: Number, default: 0 },
      ultimaVezActivo: { type: Date, default: null },
      isRoomOpen: { type: Boolean, default: false },
    },
  ],
},
{
  timestamps: true,
}
);



UsuarioSchema.method("toJSON", function () {
  const { __v, _id, password, ...object } = this.toObject();
  object.uid = _id;
  return object;
});

export default db4.model("Usuario", UsuarioSchema);

