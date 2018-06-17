module.exports = () => {
  let validators = {
    email: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|br|org|net|gov|info)\b$/,
    name: /^[a-zA-Z ]{2,30}$/
    //...
  };

  let clears = {
    tags: /(<([^>]+)>)/gi,
    all: /[\|&;:\$%"'//<>\(\)]/gi
  };

  this.is = (patternType, param) => {
    if (validators[patternType] && param) {
      return validators[patternType].test(param);
    }

    throw 'validator pattern error!';
  }

  this.sanitaze = (patternType, param) => {
    if (clears[patternType] && param) {
      return param.replace(clears[patternType], '[%%]');
    }

    throw 'clear pattern error!';
  }

  return this;
}
