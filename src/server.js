const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());

const apiRoutes = express.Router();

app.use('/api', apiRoutes);
apiRoutes.use('/v1', routes);

module.exports = app;
