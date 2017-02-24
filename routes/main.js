var express = require('express');
var passport = require('passport');
var app = express.Router();
var bunnyCtrl = require('../controllers/bunny.controller');
var User = require('../models/User');

function authChecker(req, res, next) {
    var publicPaths = [
        "/",
        "/signin",
        "/signup",
        "/about",
        "/signout",
    ];

    // var privatePaths = [
    //     "/profile",
    //     "/users",
    //     "/rebates",
    //     "/distributor",
    //     "/vendor"
    // ];

    var pathIsPublic = publicPaths.some(function (publicPath) {
        return publicPath.match(req.path);
    });

    // var pathIsPrivate = privatePaths.some(function (privatePath) {
    //     return privatePath.match(req.path);
    // });

    if (pathIsPublic || req.user) {
        next();
    } else {
        res.redirect('/signin');
    }
}

app.use(authChecker);

/* GET home page. */
app.get('/', function(req, res, next) {
    res.render('index', { title: 'Get the information you need fast' });
});


/* GET signin page */
app.get('/signin', function(req, res, next) {
    if (req.user) {
        res.redirect('/profile');
    }
    res.render('signin', { title: 'Secure Login' });
});

app.post('/signin', passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: '/signin'
}));

/* GET signup page */
app.get('/signup', function(req, res, next) {
    res.render('signup', { title: 'Sign up for bunnyfat' });
});

app.post('/signup', function(req, res, next) {
    var entry = new User ({
        email: req.body.email,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        company: req.body.company,
        business: req.body.business,
    });

    User.register(entry, req.body.password, function(err, user) {
        if (err) {
            return res.render('signup', {title: 'New User (error)', message: err, user: user});
        }
        passport.authenticate('local',{
            successRedirect: '/profile',
            failureRedirect: '/signin'
        })(req, res, next);
    });

});

app.get('/signout', function(req, res) {
    req.logout();
    res.redirect('/');
});

app.get('/profile', function(req, res) {
    return bunnyCtrl.findByEmail(req, res);
});

app.get('/about', function(req, res) {
    res.render('about', { title: 'About'})
});

module.exports = app;