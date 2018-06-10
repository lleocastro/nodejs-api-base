'use strict';

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  user_id: Number,
  name: String,
  created_at: {type: Date, default: new Date()},
  updated_at: {type: Date, default: new Date()}
});

module.exports = () => {
  let User = mongoose.model('User', userSchema);

  /** */
  this.getAll = () => {
    return User.find({});
  }

  /** */
  this.findById = (userId, callback) => {
    return User.find({user_id: {$gte: userId}});
  }

  /** */
  this.save = (user, callback) => {
    user.user_id = Math.floor(Math.random() * 99999);
    new User(user).save((err) => callback(err));
    return user;
  }

  /** */
  this.edit = (user, callback) => {
    user.updated_at = new Date();
    //...
  }

  /** */
  this.destroy = (userId, callback) => {
    new User.remove({user_id: {$gte: userId}}, (err) => callback(err));
    return userId;
  }

  //...

  return this;
}
