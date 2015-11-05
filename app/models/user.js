var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var Schema = require('../config').Schema;



var users = new Schema({
  username: {type: String, unique: true},
  password: String,
  timestamps: Date
});

users.pre('save', function(next) {
  var user = this;
  // var cipher = Promise.promisify(bcrypt.hash);
  bcrypt.hash(user.password, null, null, function(err, hash) {
    console.log('hashing username: ', user.username);
    console.log('hashing password: ', user.password);
    user.password = hash;
    next();
  });
})

users.methods.comparePassword = function(attemptedPassword, callback) {
  bcrypt.compare(attemptedPassword, this.password, function(err, isMatch) {
    if (err) {
      callback(err);
    }
    callback(isMatch);
  });
}


var User = db.mongoose.model('User', users);

module.exports = User;
