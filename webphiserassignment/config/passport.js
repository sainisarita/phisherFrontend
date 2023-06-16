const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const dbQuery = require("../dbQuery/user");
require("dotenv").config();
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET_KEY;
opts.passReqToCallback = true;
opts.ignoreExpiration = true;
module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, async (req, jwt_payload, done) => {
      let to = new Date();
      let today = Math.ceil(to.getTime() / 1000);
      if (jwt_payload.exp < today) {
        return done(null, "Unothorise");
      }
      const user = await dbQuery.getUserById(jwt_payload.id);
      if (!user) return done(null, "Unothorise");
      return done(null, user);
    })
  );
};
