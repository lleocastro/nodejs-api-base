'use strict';

module.exports = (app) => {

  this.successHandler = (req, res, data, status) => {
    status = status || 200;
    res.status(status).jsonp({
      status: status,
      server_date: new Date(),
      data: data || null
    });
  }

  this.errorHandler = (req, res, errors, status) => {
    status = status || 400;
    res.status(status).jsonp({
      status: status,
      server_date: new Date(),
      errors: errors || []
    });
  }

  return this;
}
