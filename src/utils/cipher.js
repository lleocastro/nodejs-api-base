'use strict';

const cryptoJS = require('crypto-js');
const moment = require('moment');

module.exports = () => {
  let key = 'hahahahaha';

  this.obscure = (text) => {
    var cipherText = cryptoJS.AES.encrypt(
      text.toString(),
      ('' + key + parseInt(((Math.PI * 9999) / moment().year()) * (91 + ((4 / 2) * 8))))
    );

    return _revert(cipherText.toString());
  }

  this.illumin = (cipherText) => {
    if (cipherText && cipherText.length) {
      cipherText = _revert(cipherText);

      var bytes = cryptoJS.AES.decrypt(
        cipherText.toString(),
        ('' + key + parseInt(((Math.PI * 9999) * (91 + ((4 / 2) * 8))) / moment().year()))
      );

      return bytes.toString(cryptoJS.enc.Utf8);
    }

    return null;
  }

  function _revert(text) {
    return text.substr(text.length / 2, text.length)
      + text.substr(0, text.length / 2);
  }

  return this;
}
