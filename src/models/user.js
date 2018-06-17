'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const userSchema = new mongoose.Schema({
  first_name: {type: String, required: true},
  last_name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  created_at: {type: Date, default: new Date()},
  updated_at: {type: Date, default: new Date()}
});

module.exports = () => {
  let User = mongoose.model('User', userSchema);

  this.getAll = (callback) => {
    User.find({}, (err, docs) => {
      callback(err, docs);
    });
  };

  this.findById = (userId, callback) => {
    User.find({_id: {$eq: userId}}, (err, docs) => {
      callback(err, docs);
    });
  };

  this.findByEmail = (userEmail, callback) => {
    User.find({email: {$eq: userEmail}}, (err, docs) => {
      callback(err, docs);
    });
  };

  this.save = (user, callback) => {
    if (user.password) {
      user.password = bcrypt.hashSync(user.password);
    }

    new User(user).save((err) => callback(err));
    return user;
  };

  this.edit = (user, callback) => {
    user.updated_at = new Date();
    
    let id = user._id;
    delete user._id;

    User.update({_id: id}, { $set: user}, (err, docs) => callback(err, docs));
    return user;
  };

  this.destroy = (userId, callback) => {
    User.remove({_id: {$eq: userId}}, (err) => callback(err));
    return userId;
  };
  
  return this;
}
