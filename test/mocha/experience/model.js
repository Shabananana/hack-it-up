'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Experience = mongoose.model('Experience');


var user;
var experience;

//The tests
describe('Model test', function() {
    describe('Experience:', function() {

        beforeEach(function(done) {
            experience = null;
            
            user = new User({
                name: 'Full name',
                email: 'test@test.com',
                username: 'user',
                password: 'password'
            });
            
            user.save(function() {
                experience = new Experience({
                    awarder: user,
                    awardee: user,
                    description: 'test xp',
                    xp: 1
                });

                done();
            });
        });

        describe('Method Save', function() {
            it('should be able to save without problems', function(done) {
                return experience.save(function(err) {
                    should.not.exist(err);
                    done();
                });
            });

            it('should be able to show an error when try to save without description', function(done) {
                experience.description = '';

                return experience.save(function(err) {
                    should.exist(err);
                    done();
                });
            });

            it('should be able to show an error when try to save with 0 xp', function(done) {
                experience.xp = 0;

                return experience.save(function(err) {
                    should.exist(err);
                    done();
                });
            });
        });

        afterEach(function(done) {
            user.remove();
            experience.remove();
            
            done();
        });
    });
});