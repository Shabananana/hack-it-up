'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Article Schema
 */
var ArticleSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    xp: {
        type: Number,
        min: [-250, 'The xp you are awarding({VALUE}) is beneath the limit ({MIN}).'],
        max: [250, 'The xp you are awarding({VALUE}) is over the limit ({MAX}).'],
        required: true
    },
    description: {
        type: String,
        default: '',
        trim: true,
        required: true
    },
    awarder: {
        type: Schema.ObjectId,
        ref: 'User',
        required: true
    },
    awardee: {
        type: Schema.ObjectId,
        ref: 'User',
        required: true
    }
});

/**
 * Validations
 */
ArticleSchema.path('description').validate(function(description) {
    return description.length;
}, 'Description cannot be blank');

ArticleSchema.path('xp').validate(function(xp) {
    return (xp >= -250 && xp <= 250);
}, 'XP must fall between the min and max allowed values.');

ArticleSchema.path('awarder').validate(function(awarder) {
    return awarder.length;
}, 'Awarder cannot be blank.');

ArticleSchema.path('awardee').validate(function(awardee) {
    return awardee.length;
}, 'Awardee cannot be blank.');

/**
 * Statics
 */
ArticleSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('awarder', 'name username').exec(cb);
};

mongoose.model('Article', ArticleSchema);
