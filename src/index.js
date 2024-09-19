import { server, initializeSockets } from './app.js';
import './databaseMongo.js';

server.listen(3000, () => {
  console.log('Server started on port ' + 3000);
  initializeSockets(); // Initialize sockets after the server has started listening
});
