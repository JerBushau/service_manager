'use strict';

const express = require('express');
var parser = require('body-parser');
var router = require('./api');

var app = express();

// hook up db
require('./database');

// seed data
require('./seed');

app.use(parser.json());
// serve up static content
app.use('/', express.static('./public'));

// set up api route
app.use('/api', router);

// error handler
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(400).send(err.message);
});

app.listen(3000, function() {
    console.log("Server up on 3000.");
});
