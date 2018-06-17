'use strict';

const httpUtils = require('../utils/http')();
const generators = require('../utils/generators')();
const authController = require('../controllers/auth')();

module.exports = (app) => {

  app.get('/', (req, res) => {
    httpUtils.successHandler(req, res, {
      message: 'API is running...',
      generators: {
        code: generators.code5(),
        uuid: generators.uuid(),
        hash: generators.hash255()
      }
    });
  });

  app.post('/v1/common_auth', (req, res) => {
    if (req.body.email && req.body.password) {
      let payload = {
        email: req.body.email,
        password: req.body.password
      };

      authController.authenticate(payload)
        .then((result) => {
          httpUtils.successHandler(req, res, {token: result});
        })
        .catch((err) => {
          httpUtils.errorHandler(req, res, [err], 401);
        });
    } else {
      httpUtils.errorHandler(req, res, []);
    }
  });

}
