'use strict';

// External Libs
const express = require('express');
const bodyParser = require('body-parser');
const validator  = require('express-validator');
const consign = require('consign');
const helmet = require('helmet');

// Node Core
const evt = require('events').EventEmitter();


/**
 * MONGODB CONNECTION
 */
require('./database')();

module.exports = () => {
  let app = express();

  // Loading external modules
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(validator());
  app.use(helmet());

  // Mapping modules
  consign()
    .include('src/jobs')
    .include('src/utils')
    .include('src/models')
    .include('src/controllers')
    .then('src/routes')
    .into(app);

  return app;
}
