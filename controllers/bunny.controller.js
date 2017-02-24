
var User = require('../models/User');
var passport = require('passport');

exports.listUsers = function(req, res) {
    var query = User.find();

    query.sort({created_on: 'desc'})
        .limit(15)
        .exec(function (err, results) {
            res.render('users', {title: 'List of Users', users: results});
        });
};

exports.findByEmail = function (req, res) {
    var email = req.user.email;
    var query;

    User.findOne({'email': email})
        .exec(function (err, result) {
            res.render('profile', {title: 'Profile', user: result});
        });
};