const httpUtils = require('../utils/http')();
const userController = require('../controllers/user')();
const graphqlHTTP = require('express-graphql');
const auth = require('../config/auth')();

module.exports = (app) => {

  // *** GraphQL Routes *** //

  app.use('/api/v1/user', graphqlHTTP({
    schema: userController.getGraphqlSchema(), 
    pretty: true
  }));



  // *** Common Routes *** //

  app.get('/api/v1/users', auth.authenticate(), (req, res) => {
    userController.getAll()
      .then((data) => httpUtils.successHandler(req, res, {users: data}))
      .catch((err) => httpUtils.errorHandler(req, res, [err]));
  });

  app.get('/api/v1/users/:id', auth.authenticate(), (req, res) => {
    userController.getById(req.params.id)
      .then((data) => httpUtils.successHandler(req, res, {user: data}))
      .catch((err) => httpUtils.errorHandler(req, res, [err]));
  });

  app.post('/api/v1/users', auth.authenticate(), (req, res) => {
    userController.create(req.body)
      .then((data) => httpUtils.successHandler(req, res, data, 201))
      .catch((err) => httpUtils.errorHandler(req, res, err));
  });

  app.put('/api/v1/users', auth.authenticate(), (req, res) => {
    userController.update(req.body)
      .then((data) => httpUtils.successHandler(req, res, data))
      .catch((err) => httpUtils.errorHandler(req, res, [err]));
  });

  app.put('/api/v1/users/password_update', auth.authenticate(), (req, res) => {
    userController.passwordUpdate(req.body)
      .then((data) => httpUtils.successHandler(req, res, data))
      .catch((err) => httpUtils.errorHandler(req, res, [err]));
  });

  app.delete('/api/v1/users/:id', auth.authenticate(), (req, res) => {
    userController.delete(escape(req.params.id))
      .then((data) => httpUtils.successHandler(req, res, data))
      .catch((err) => httpUtils.errorHandler(req, res, [err]));
  });

}
