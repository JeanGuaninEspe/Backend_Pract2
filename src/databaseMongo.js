import mongoose from "mongoose";
import config from './config.js';

const db1 = mongoose.createConnection(config.mongodbURLVIN, { useNewUrlParser: true, useUnifiedTopology: true });
db1.on('error', console.error.bind(console, 'Error de conexión en db1:'));
db1.once('open', () => {
  console.log('Connected to db1:', db1.name);
});

const db2 = mongoose.createConnection(config.mongodbURLENC, { useNewUrlParser: true, useUnifiedTopology: true });
db2.on('error', console.error.bind(console, 'Error de conexión en db2:'));
db2.once('open', () => {
  console.log('Connected to db2:', db2.name);
});

const db3 = mongoose.createConnection(config.mongodbSSEGRI, { useNewUrlParser: true, useUnifiedTopology: true });
db3.on('error', console.error.bind(console, 'Error de conexión en db3:'));
db3.once('open', () => {
  console.log('Connected to db3:', db3.name);
});

const db4 = mongoose.createConnection(config.mongodbSSEGRI4, { useNewUrlParser: true, useUnifiedTopology: true });
db4.on('error', console.error.bind(console, 'Error de conexión en db4:'));
db4.once('open', () => {
  console.log('Connected to db4:', db4.name);
});

export { db1, db2, db3, db4 };
