import { config } from "dotenv";
config();

console.log("MONGODB_URI_VIN:", process.env.MONGODB_URI_VIN);
console.log("MONGODB_URI_ENC:", process.env.MONGODB_URI_ENC);
console.log("DB_CNN:", process.env.DB_CNN);
console.log("DB_CNN_VINCULACION:", process.env.DB_CNN_VINCULACION);
console.log("JWT_KEY:", process.env.JWT_KEY);
console.log("TOKEN_NOTIFICAIONES:", process.env.TOKEN_NOTIFICAIONES);

export default {
    mongodbURLVIN: process.env.MONGODB_URI_VIN,
    mongodbURLENC: process.env.MONGODB_URI_ENC,
    mongodbSSEGRI: process.env.DB_CNN,
    mongodbSSEGRI4: process.env.DB_CNN_VINCULACION,
    jwtKey: process.env.JWT_KEY,
    tokenNotificaciones: process.env.TOKEN_NOTIFICAIONES
};
