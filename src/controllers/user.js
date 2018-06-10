'use strict';

const userModel = require('../models/user')();

module.exports = () => {

  // this.getById = (id) => {
  //   return userModel.getById({});
  // }

  this.getAllUsers = () => {
    return userModel.getAll();
  }

  this.create = (user) => {
    return new Promise((resolve, reject) => {
      userModel.save(user, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve({msg: 'User created!'});
        }
      });
    });
  }

  this.deleteUser = (userId) => {
    return new Promise((resolve, reject) => {
      userModel.destroy(userId, (err) => resolve(err));
    });
  }

  return this;
}
