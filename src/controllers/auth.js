'use strict';

const userModel = require('../models/user')();
const bcrypt = require('bcrypt-nodejs');
const authConfig = require('../config/auth')().config;
const jwt = require('jwt-simple');

module.exports = () => {

  this.authenticate = (payload) => {
    return new Promise((resolve, reject) => {
     
      userModel.findByEmail(payload.email, (err, docs) => {

        if (docs[0] && bcrypt.compareSync(payload.password, docs[0].password)) {
          resolve(jwt.encode({user: docs[0]}, authConfig.jwtSecret));
        } else {
          reject('email or password incorrect! ', err);
        }

      });

    });
  };

  return this;
}
