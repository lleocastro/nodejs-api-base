'use strict';

const httpUtils = require('../utils/http')();
const generators = require('../utils/generators')();
const tokenizer = require('../utils/tokenizer')();

module.exports = (app) => {

  app.get('/', (req, res) => {
    httpUtils.successHandler(req, res, {
      message: 'API is running...',
      generators: {
        code: generators.inviteCode(),
        uuid: generators.uuid(),
        hash: generators.hash255()
      }
    });
  });

  //...

}
