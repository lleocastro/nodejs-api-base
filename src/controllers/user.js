'use strict';

const userModel = require('../models/user')();
const validator = require('../utils/validator')();
const _ = require('lodash');
const bcrypt = require('bcrypt-nodejs');

module.exports = () => {

  this.getById = (userId) => {
    return __getById(userId);
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

      __usedEmail(sanitazedUser.email).then((yes) => {
        reject([{email: 'Este email já está sendo usado.'}]);
      }).catch((no) => {

        if (user.first_name) sanitazedUser.first_name = validator.sanitaze('all', user.first_name.toString());
        else errors.push({first_name: 'Nome está inválido(a). Verifique!'});

        if (user.last_name) sanitazedUser.last_name = validator.sanitaze('all', user.last_name.toString());
        else errors.push({last_name: 'Sobrenome está inválido(a). Verifique!'});

        if (user.password) sanitazedUser.password = user.password.toString();
        else errors.push({password: 'Senha está inválido(a). Verifique!'});
        
        
        if (!errors.length) {
          userModel.save(sanitazedUser, (err) => {
            if (err) reject(err);
            resolve({msg: 'Usuário "' + sanitazedUser.first_name + '" criado.'});
          });
        } else {
          reject(_.uniqWith(errors, _.isEqual));
        }

      });

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
        
        __usedEmail(sanitazedUser.email).then((yes) => {
          reject([{email: 'Este email já está sendo usado.'}]);
        });
        
      }

      if (user.first_name) {
        if (user.first_name.length > 1) sanitazedUser.first_name = validator.sanitaze('all', user.first_name.toString());
        else errors.push({first_name: 'Nome está inválido(a). Verifique!'});
      }

      if (user.last_name) {
        if (user.last_name.length > 1) sanitazedUser.last_name = validator.sanitaze('all', user.last_name.toString());
        else errors.push({last_name: 'Sobrenome está inválido(a). Verifique!'});
      }

      
      if (!errors.length) {
        userModel.edit(sanitazedUser, (err, docs) => {
          if (docs) resolve({msg: 'Dados atualizados com sucesso.'});
          reject(err);
        });
      } else {
        reject(_.uniqWith(errors, _.isEqual));
      }
      
    });
  };

  this.passwordUpdate = (user) => {
    return new Promise((resolve, reject) => {
      let sanitazedUser = {
        _id: validator.sanitaze('all', user._id.toString()),
        currrent_password: '',
        new_password: ''
      };

      let errors = [];

      
      if (user.currrent_password) sanitazedUser.currrent_password = user.currrent_password.toString();
      else errors.push({currrent_password: 'Senha atual está inválido(a). Verifique!'});

      if (user.new_password) sanitazedUser.new_password = user.new_password.toString();
      else errors.push({new_password: 'Nova senha está inválido(a). Verifique!'});

      if (user.new_password == user.currrent_password) {
        errors.push({password: 'A nova senha deve ser diferente da atual!'});
      }

      if (errors.length) {
        reject(errors);
      }


      __getById(sanitazedUser._id).then((docs) => {
        if (bcrypt.compareSync(sanitazedUser.currrent_password, docs[0].password)) {
          let newPassword = bcrypt.hashSync(sanitazedUser.new_password);

          userModel.edit({_id: sanitazedUser._id, password: newPassword}, (err, docs) => {
            if (docs) resolve({msg: 'Senha atualizada com sucesso. No próximo login use-a!'});
            reject(err);
          });

        } else {
          reject({currrent_password: 'Senha atual está incorreto(a). Verifique!'});
        }
      }).catch((err) => {
        reject({not_user: 'Usuário não encontrado. Verifique!'});
      });

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

  function __usedEmail(email) {
    return new Promise((resolve, reject) => {
      userModel.findByEmail(email, (err, docs) => {
        if (docs[0]) resolve(true);
        reject(false);
      });
    });
  }

  function __getById(userId) {
    return new Promise((resolve, reject) => {
      userModel.findById(userId, (err, docs) => {
        if (docs) resolve(docs);
        reject(err);
      });
    });
  }

  return this;
}
