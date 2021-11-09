const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const routes = require('./routes');
const errorMiddleware = require('./middlewares/error');

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());

const apiRoutes = express.Router();

app.use('/api', apiRoutes);
apiRoutes.use('/v1', routes);

// if error is not an instanceOf ApiError, convert it.
app.use(errorMiddleware.converter);

// catch 404 and forward to error handler
app.use(errorMiddleware.notFound);

// error handler, send stacktrace only during development
app.use(errorMiddleware.handler);

module.exports = app;
