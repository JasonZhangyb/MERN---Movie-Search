const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const user_model = require('../models/users');

// custom cookie extractor
const cookieExtractor = req => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies["access_token"];
    }
    return token;
};

// authenticated local strategy using email and password
passport.use(new LocalStrategy({usernameField: 'email'},
    (username, password, done) => {
    user_model.findOne({email: username}, (err, user) => {
        if (err) {
            return done(err);
        }
        // user not found
        if (!user) {
            return done(null, false);
        }
        // check if input password is correct
        user.comparePassword(password, done);
    })
}));

// authorization using jwt
passport.use(new JwtStrategy({
    jwtFromRequest: cookieExtractor,
    secretOrKey: "CS5610NPE"
}, (payload, done) => {
    user_model.findById({_id: payload.sub}, (err, user) => {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        }
        else {
            return done(err, false);
        }
    });
}));