import mongoose from 'mongoose';
const config = require("../../config")
const dbConnection = async () => {
  try {
    await mongoose.connect(config.default.mongodbSSEGRI4);

    console.log("DB Online");
  } catch (error) {
    console.log(error);
    throw new Error("Error en la base de datos - Hable con el admin ");
  }
};

export default {
  dbConnection,
};
  