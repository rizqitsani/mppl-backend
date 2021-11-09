require('dotenv').config();
const server = require('./server');

server.listen(process.env.PORT, () => {
  console.log(
    `Server started on port ${process.env.PORT} (${process.env.NODE_ENV})`
  );
});

module.exports = server;
