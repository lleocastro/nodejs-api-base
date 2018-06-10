'use strict';

module.exports = () => {

  /**
   * UUID Generator
   */
  this.uuid = () => {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }

  /**
   * Hash Generator
   */
  this.hash255 = () => {
    let hash = this.uuid() + this.uuid() 
             + this.uuid() + this.uuid() 
             + this.uuid() + this.uuid();
    
    let cipher = new Buffer(hash).toString('base64');
    
    cipher = cipher.substr(cipher.length / 2, cipher.length)
    + cipher.substr(0, cipher.length / 2).replace(/==/gi, '');

    return cipher.substr(0, 255);
  }

  /**
   * Invite Code Generator
   */
  this.inviteCode = () => {
    return new Buffer(
      Math.floor(((1 + Math.random()) * 99999) * 0x10000).toString(23).substring(1)
    ).toString('base64').replace(/==/gi, '');
  }

  return this;
}
