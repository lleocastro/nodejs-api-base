'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const graphql = require('graphql')

const userSchema = new mongoose.Schema({
  first_name: {type: String, required: true},
  last_name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  created_at: {type: Date, default: new Date()},
  updated_at: {type: Date, default: new Date()}
});

const graphqlSchema = new graphql.GraphQLSchema({
  query: new graphql.GraphQLObjectType({
    name: 'Query',
    fields: {
      user: {
        type: new graphql.GraphQLObjectType({
          name: 'User',
          fields: {
            id: {type: new graphql.GraphQLNonNull(graphql.GraphQLString)},
            first_name: {type: graphql.GraphQLString},
            last_name: {type: graphql.GraphQLString},
            email: {type: graphql.GraphQLString}
          }
        }),
        args: {
          id: {type: graphql.GraphQLString},
          email: {type: graphql.GraphQLString}
        },
        resolve: function (_ , args) {
          let user = new Promise((resolve, reject) => {
            mongoose.model('User', userSchema).find({_id: {$eq: args.id}}, (err, docs) => {
              if (docs && docs[0]) {
                resolve(docs[0]);
              } else {
                reject(err);
              }
            });
          });

          return user.then((resp) => {
            return resp;
          });
        }
      }
    }
  })
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

  this.getGraphqlSchema = () => {
    return graphqlSchema;
  }

  return this;
}
