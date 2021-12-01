const midtransClient = require('midtrans-client');
const config = require('.');

const snap = new midtransClient.Snap({
  isProduction: false,
  clientKey: config.midtransClientKey,
  serverKey: config.midtransServerKey,
});

module.exports = snap;
