
/*
 * GET users listing.
 */
var mongoose = require('mongoose');
var configuration = require('../configuration');
mongoose.connect(configuration.connectionString);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  var kittySchema = mongoose.Schema({
    name: String
  });
  var Kitten = mongoose.model('Kitten', kittySchema);
  var silence = new Kitten({ name: 'Silence' });
  kittySchema.methods.speak = function () {
    var greeting = this.name ? "Meow name is " + this.name : "I don't have a name";
    console.log(greeting);
  }
  var Kitten = mongoose.model('Kitten', kittySchema)
  var fluffy = new Kitten({ name: 'fluffy' });
  fluffy.save(function (err, fluffy) {
    if (err) return console.error(err);
  });
  Kitten.find(function (err, kittens) {
    if (err) return console.error(err);
    console.log(kittens)
  });
});
exports.list = function(req, res){
  res.send("respond with a resource");
};