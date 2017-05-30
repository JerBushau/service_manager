'use strict';

const express = require('express');
const parser = require('body-parser');
const router = require('./api');

const app = express();

require('./database');

app.use('/', express.static('./public'));
app.use(parser.json());

app.use('/api', router);

// error handler
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(400).send(err.message);
});

app.listen(3000, function() {
    console.log("Server up on 3000.");
});
