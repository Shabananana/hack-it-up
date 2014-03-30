'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Experience = mongoose.model('Experience'),
    _ = require('lodash');


/**
 * Find experience by id
 */
exports.experience = function(req, res, next, id) {
    Experience.load(id, function(err, experience) {
        if (err) return next(err);
        if (!experience) return next(new Error('Failed to load experience ' + id));
        req.experience = experience;
        next();
    });
};

/**
 * Create an experience
 */
exports.create = function(req, res) {
    var experience = new Experience(req.body);
    experience.awardee = req.user;
    experience.awarder = req.user;

    experience.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                experience: experience
            });
        } else {
            res.jsonp(experience);
        }
    });
};

/**
 * Update an experience
 */
exports.update = function(req, res) {
    var experience = req.experience;

    experience = _.extend(experience, req.body);

    experience.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                experience: experience
            });
        } else {
            res.jsonp(experience);
        }
    });
};

/**
 * Delete an experience
 */
exports.destroy = function(req, res) {
    var experience = req.experience;

    experience.remove(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                experience: experience
            });
        } else {
            res.jsonp(experience);
        }
    });
};

/**
 * Show an experience
 */
exports.show = function(req, res) {
    res.jsonp(req.experience);
};

/**
 * List of Experiences
 */
exports.all = function(req, res) {
    Experience.find().sort('-created').populate([{path: 'awarder', select: 'name username'}, {path: 'awardee', select: 'name username'}]).exec(function(err, experiences) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(experiences);
        }
    });
};
