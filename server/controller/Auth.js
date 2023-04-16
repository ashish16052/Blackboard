const express = require("express");
const passport = require("passport");
const mainRouter = express.Router();

module.exports.controllerFunction = function (app) {

    mainRouter.get('/user', (req, res) => {
        console.log(req.user);
        console.log(req.session);
        res.send(req.user)
    })

    mainRouter.get('/login', passport.authenticate('google',
        {
            scope: ['profile', 'email']
        }
    ));

    mainRouter.get('/google/callback', passport.authenticate('google',
        {
            successRedirect: process.env.CLIENT_URL + "/",
            failureRedirect: process.env.CLIENT_URL + "/",
            scope: ['profile', 'email'],
        }
    ));

    mainRouter.get('/logout', (req, res) => {
        req.logout(function (err) {
            if (err)
                return console.log(err);
            else
                res.redirect(process.env.CLIENT_URL);
        });
    })

    app.use("/auth", mainRouter);
};
