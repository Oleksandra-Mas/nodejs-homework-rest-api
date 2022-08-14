require('dotenv').config();

const app = require('./app')
const PORT = process.env.PORT || 3000;
const uriDb = process.env.DB_HOST;
const mongoose = require('mongoose');

const connection = mongoose.connect(uriDb, {
  promiseLibrary: global.Promise,
  useUnifiedTopology: true,
});

connection
  .then(() => {
    app.listen(PORT, function () {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch(err =>
    console.log(`Server not running. Error message: ${err.message}`),
);

module.exports = app