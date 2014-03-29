/**
 * Created by Jeffrey on 3/29/2014.
 */
'use strict';

// Articles routes use articles controller
var experiences = require('../controllers/experiences');
var authorization = require('./middlewares/authorization');

// Article authorization helpers
var hasAuthorization = function(req, res, next) {
    if (req.article.user.id !== req.user.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function(app) {

    app.get('/xp', experiences.all);
    app.post('/xp', authorization.requiresLogin, experiences.create);
    app.get('/xp/:xpId', experiences.show);
    app.put('/xp/:xpId', authorization.requiresLogin, hasAuthorization, experiences.update);
    app.del('/xp/:xpId', authorization.requiresLogin, hasAuthorization, experiences.destroy);

    // Finish with setting up the articleId param
    app.param('xpId', experiences.experience);

};