'use strict';

const mongoose = require('mongoose');

module.exports = () => {
  let conData = {
    host: '//127.0.0.1',
    port: 27017,
    username: '',
    password: '',
    database: 'base_test_api',
    driver: 'mongodb'
  };

  let options = {
    autoIndex: false, // Don't build indexes
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0
  };

  let url = `${conData.driver}:${conData.host}:${conData.port}/${conData.database}`;

  let db = mongoose.connect(url, options).then(() => {
    console.info('mongodb: Is connected!!');
  }, (err) => {
    throw 'mongodb: Something is wrong on connection!!'
  });

  return db;
}
