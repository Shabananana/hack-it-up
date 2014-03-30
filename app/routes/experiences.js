'use strict';

// Experiences routes use experiences controller
var experiences = require('../controllers/experiences');
var authorization = require('./middlewares/authorization');

// Experience authorization helpers
var hasAuthorization = function(req, res, next) {
    if (req.experience.user.id !== req.user.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function(app) {

    app.get('/experiences', experiences.all);
    app.post('/experiences', authorization.requiresLogin, experiences.create);
    app.get('/experiences/:experienceId', experiences.show);
    app.put('/experiences/:experienceId', authorization.requiresLogin, hasAuthorization, experiences.update);
    app.del('/experiences/:experienceId', authorization.requiresLogin, hasAuthorization, experiences.destroy);

    // Finish with setting up the experienceId param
    app.param('experienceId', experiences.experience);

};