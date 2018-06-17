'use strict';

const userModel = require('../models/user')();
const validator = require('../utils/validator')();
const _ = require('lodash');

module.exports = () => {

  this.getById = (userId) => {
    return new Promise((resolve, reject) => {
      userModel.findById(userId, (err, docs) => {
        if (docs) resolve(docs);
        reject(err);
      });
    });
  };

  this.getAll = () => {
    return new Promise((resolve, reject) => {
      userModel.getAll((err, docs) => {
        if (docs) resolve(docs);
        reject(err);
      });
    });
  };

  this.create = (user) => {
    return new Promise((resolve, reject) => {
      let sanitazedUser = {
        first_name: '',
        last_name: '',
        email: '',
        password: ''
      };

      let errors = [];

      let email = __validator('email', user.email, 'Email');
      if (email && !email.error) sanitazedUser.email = email;
      else errors.push(email.error);

      if (user.first_name) sanitazedUser.first_name = validator.sanitaze('all', user.first_name.toString());
      else errors.push({first_name: 'Nome está inválido(a). Verifique!'});

      if (user.last_name) sanitazedUser.last_name = validator.sanitaze('all', user.last_name.toString());
      else errors.push({last_name: 'Sobrenome está inválido(a). Verifique!'});

      if (user.password) sanitazedUser.password = user.password.toString();
      else errors.push({password: 'Senha está inválido(a). Verifique!'});
      
      
      if (!errors.length) {
        userModel.save(sanitazedUser, (err) => {
          if (err) reject(err);
          resolve({
            name: sanitazedUser.first_name + ' ' + sanitazedUser.last_name, 
            email: sanitazedUser.email
          });
        });
      } else {
        reject(_.uniqWith(errors, _.isEqual));
      }

    });
  };

  this.update = (user) => {
    return new Promise((resolve, reject) => {
      let sanitazedUser = {
        _id: validator.sanitaze('all', user._id.toString())
      };

      let errors = [];

      
      if (user.email) {
        let email = __validator('email', user.email, 'Email');
        if (email && !email.error) sanitazedUser.email = email;
        else errors.push(email.error);
      }

      if (user.first_name) {
        if (user.first_name) sanitazedUser.first_name = validator.sanitaze('all', user.first_name.toString());
        else errors.push({first_name: 'Nome está inválido(a). Verifique!'});
      }

      if (user.last_name) {
        if (user.last_name) sanitazedUser.last_name = validator.sanitaze('all', user.last_name.toString());
        else errors.push({last_name: 'Sobrenome está inválido(a). Verifique!'});
      }

      
      if (!errors.length) {
        userModel.edit(sanitazedUser, (err, docs) => {
          if (docs) resolve(docs);
          reject(err);
        });
      } else {
        reject(_.uniqWith(errors, _.isEqual));
      }
      
    });
  };

  this.delete = (userId) => {
    return new Promise((resolve, reject) => {
      userModel.destroy(userId, (err) => {
        if (err) reject(err);
        resolve(userId);
      });
    });
  };

  function __validator(pattern, param, label) {
    let invalid = {};

    if (param) {
      let sanitazedValue = validator.sanitaze('all', param);
      if (validator.is(pattern, param)) {
        return sanitazedValue;
      }
    }

    label = (label) ? label : pattern.toString();
    invalid[pattern] = label + ' está inválido(a). Verifique!';
    return {error: invalid};
  }

  return this;
}
