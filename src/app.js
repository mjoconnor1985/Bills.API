const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const apiPort = 8888;

const index = require('./routes/index');
const users = require('./routes/users');
const bills = require('./bills/bills.routes');

const dbName = 'BillsDb';
const connStr = 'mongodb://localhost:27017/' + dbName;

mongoose.connect(connStr, function (err) {
    if (err)
        console.log('connection error', err);
    else
        console.log('connection to ' + connStr + ' successfully');
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use('/', index);
app.use('/users', users);
app.use('/bills', bills);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});


app.listen(apiPort);
console.log('API started on port ' + apiPort);

module.exports = app;
