require('dotenv').config();

const app = require('./app');
const PORT = process.env.PORT || 3000;
const uriDb = process.env.DB_HOST;
const mongoose = require('mongoose');

const connection = mongoose.connect(uriDb, {
  promiseLibrary: global.Promise,
  useUnifiedTopology: true,
});

let server;

connection
  .then(() => {
    server = app.listen(PORT, function () {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch((err) =>
    console.log(`Server not running. Error message: ${err.message}`)
  );

const closeConnection = () => {
  mongoose.connection.close();
  if (server) {
    server.close();
  }
};

module.exports = { app, closeConnection };
