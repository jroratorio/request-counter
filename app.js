require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const dao = require('./dao');

const process = require('./routes/process');
const stats = require('./routes/stats');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/process', dao.clearTimeoutRequests, dao.addUUIDandStartTimeToDB, process);
app.use('/stats', dao.clearTimeoutRequests, stats);

// catch 404 and forward to error handler
app.use((req, res, next) => {
	next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
	return res.status(err.status || 500).send(err);
});

module.exports = app;
