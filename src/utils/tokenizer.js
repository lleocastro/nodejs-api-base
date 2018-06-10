'use strict';

const cipher = require('./cipher')();

module.exports = () => {

  this.generate = (json) => {
    let buffer = new Buffer(JSON.stringify(json)).toString('base64');
    return cipher.obscure(buffer);
  }

  this.decode = (token) => {
    let bytes = cipher.illumin(token.toString());
    return JSON.parse(new Buffer(bytes.toString(), 'base64').toString('ascii'));
  }

  return this;
}
