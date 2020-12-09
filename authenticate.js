const passport = require('passport'); //contains different strategies to authenticate a user
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user');

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

const config = require('./config.js');

exports.local = passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.getToken = function(user) {
    return jwt.sign(user, config.secretKey, {expiresIn: 3600});
};

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;

exports.jwtPassport = passport.use(
    new JwtStrategy(
        opts,
        (jwt_payload, done) => {
            console.log('JWT payload:', jwt_payload);
            User.findOne({_id: jwt_payload._id}, (err, user) => {
                if (err) {
                    return done(err, false);
                } else if (user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            });
        }
    )
);

//authenticate a user to see if they are in the database
//Evertime you use this middleware it will always return "req.user"

//line 64-79 is an algorithim that is querying the database
exports.verifyUser = passport.authenticate('jwt', {session: false}); //canceling out sessions and using JWT

exports.verifyAdmin = ((req, res, next) => {
    console.log(req.user.admin);
    User.findById({_id: req.user._id})
    .then((user) => {
        if (user.admin == true) {
            console.log("This user is an admin", req.user.admin);
            return next();
        } else {
            const err = new Error("You are not authorized to perform this operation!");
            res.statusCode = 403;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})

exports.verifyAdmin = passport.authenticate('admin', {session: false});