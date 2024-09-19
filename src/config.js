import { config } from "dotenv"
config();

export default{
    mongodbURLVIN:process.env.MONGODB_URI_VIN,
    mongodbURLENC:process.env.MONGODB_URI_ENC,
    mongodbSSEGRI:process.env.DB_CNN,
    //mongodbSSEGRI4: process.env.DB_CNN_VINCULACION,
    mongodbSSEGRI4: "mongodb://localhost:27017/unidad_educativa_fase2",
    mongodbSSEGRI2:process.env.JWT_KEY,
    mongodbSSEGRI3:process.env.TOKEN_NOTIFICAIONES
}
