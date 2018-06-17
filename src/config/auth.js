const passport = require('passport');
const passportJWT = require('passport-jwt');

const ExtractJwt = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;

const config = {
  jwtSecret: 'MyS3cr3tK3Y',
  jwtSession: {session: false}
};

module.exports = () => {
  let params = {
    secretOrKey: config.jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
  };

  let strategy = new Strategy(params, (payload, done) => {
    let id = payload.id || null;

    if (id) {
      return done(null, {id: id});
    } else {
      return done(new Error('user_not_found'), null);
    }

  });

  passport.use(strategy);

  return {
    initialize: () => {
      return passport.initialize();
    },
    authenticate: () => {
      return passport.authenticate('jwt', config.jwtSession);
    },
    config: config
  };

}
