const httpUtils = require('../utils/http')();
const userController = require('../controllers/user')();

module.exports = (app) => {

  app.get('/v1/users', (req, res) => {
    userController.getAllUsers().then((users) => {
      httpUtils.successHandler(req, res, {users: users});
    }, (err) => {
      httpUtils.errorHandler(req, res, [err]);
    })
  });

  app.post('/v1/users', (req, res) => {
    userController.create(req.body)
      .then((data) => httpUtils.successHandler(req, res, data, 201))
      .catch((err) => httpUtils.errorHandler(req, res, [err]));
  });

  app.delete('/v1/users/:id', (req, res) => {
    let userId = escape(req.params.id);
    userController.deleteUser(parseInt(userId)).then((err) => {
      if (err) httpUtils.errorHandler(req, res, [err]);
      httpUtils.successHandler(req, res, {msg: 'Usuário deletado!'});
    });
  });

}
