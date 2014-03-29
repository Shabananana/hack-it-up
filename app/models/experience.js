/**
 * Created by Jeffrey on 3/29/2014.
 */
'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    xpMin = [-250, 'The xp you are awarding({VALUE}) is beneath the limit ({MIN}).'],
    xpMax = [250, 'The xp you are awarding({VALUE}) is above the limit ({MAX}).'];


/**
 * Experience Schema
 */
var ExperienceSchema = new Schema({
    DateAwarded: {
        type: Date,
        default: Date.now
    },
    SourcePeepName: {
        type: String,
        default: '',
        trim: true
    },
    SourcePeepId: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    Description: {
        type: String,
        default: '',
        trim: true
    },
    XP: {
        type: { type: Number, min: xpMin, max: xpMax }
    },
    PeepId: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

/**
 * Validations
 */
ExperienceSchema.path('Description').validate(function(description) {
    return description.length;
}, 'Description cannot be blank');

/**
 * Statics
 */
ExperienceSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('user', 'name username').exec(cb);
};

mongoose.model('Experience', ExperienceSchema);
