const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../models/prismaClient").user;

require("dotenv").config();

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
};

passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
        const user = await User.findUnique({
            where: {
                id: jwt_payload.sub
            }
        });

        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        };
    } catch (err) {
        return done(err, false);
    }
}))