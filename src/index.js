const config = require('./config');
const server = require('./server');

server.listen(config.port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server started on port ${config.port} (${config.env})`);
});

module.exports = server;
