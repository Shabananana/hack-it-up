'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
    mongoose = require('mongoose'),
    User = mongoose.model('User');

//Globals
var user, user2, user3;

describe('<Unit Test>', function() {
    describe('Model User:', function() {
        beforeEach(function() {
            user = new User({
                name: 'Full name',
                email: 'test@test.com',
                username: 'user',
                password: 'password',
                provider: 'local'
            });

            user2 = new User(user);

            user3 = new User({
                name: 'Full name',
                email: 'testa@test.com',
                username: 'user',
                password: 'password',
                provider: 'local'
            });
        });

        describe('Method giveExperience', function() {
            it('should execute without errors', function(done) {
                user.giveExperience(
                    user3, // towards this user
                    1, // this amount
                    'woot', // with this message
                    function(err) { // and this callback
                        should(err).not.ok;
                        done();
                    });
            });

            it('should award xp to the other user', function(done) {
                var originalXp = user3.xp;
                user.giveExperience(user3, 1, 'woot',
                        function() {
                            user3.xp.should.equal(originalXp + 1);
                            done();
                        });
            });
        });

        describe('Method Save', function() {
            it('should begin without the test user', function(done) {
                User.find({ email: 'test@test.com' }, function(err, users) {
                    users.should.have.length(0);
                    done();
                });
            });

            it('should be able to save without problems', function(done) {
                user.save(done);
            });

            it('should start with 100 xp', function() {
                user.xp.should.equal(100);
            });

            it('should start with 0 xp issued', function() {
                user.xpIssued.should.equal(0);
            });

            it('should fail to save an existing user again', function(done) {
                user.save(function(err) {
                    should.not.exist(err, 'user outer save \n' + err);
                    return user2.save(function(err) {
                        should.exist(err);
                        done();
                    });
                });
            });

            it('should show an error when try to save without name', function(done) {
                user.name = '';
                return user.save(function(err) {
                    should.exist(err);
                    done();
                });
            });
        });

        afterEach(function(done) {
            user.remove(function() { user3.remove(done); });
        });
    });
});
