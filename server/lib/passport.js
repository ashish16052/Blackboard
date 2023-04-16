const passport = require("passport");
const googleStrategy = require('passport-google-oauth20').Strategy
require("dotenv").config();

const mongoose = require("mongoose");
require("../model/User");
const mainModel = mongoose.model('User');

passport.use(new googleStrategy(
    {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
        passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, cb) {
        // console.log(profile);
        mainModel.findById(profile.id, function (err, doc) {
            if (err) {
                return console.log(err);
            } else if (!doc) {
                const newModel = new mainModel({
                    _id: profile.id,
                    name: profile.displayName,
                    pfp: profile.photos[0].value,
                    email: profile.emails[0].value,
                });

                newModel.save(function (err, doc) {
                    if (err)
                        return console.log(err);
                    else
                        return cb(err, doc);
                });
            }
            else {
                return cb(err, doc);
            }
        });
    }
));

passport.serializeUser((user, done) => {
    console.log('serialize',user);
    done(null, user);
});

passport.deserializeUser((user, done) => {
    console.log('deserialize',user);
    done(null, user);
});