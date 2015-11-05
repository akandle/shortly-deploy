var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var Schema = require('../config').Schema;

// var User = db.Model.extend({
//   tableName: 'users',
//   hasTimestamps: true,
//   initialize: function(){
//     this.on('creating', this.hashPassword);
//   },
//   // comparePassword: function(attemptedPassword, callback) {
//   //   bcrypt.compare(attemptedPassword, this.get('password'), function(err, isMatch) {
//   //     callback(isMatch);
//   //   });
//   // },
//   hashPassword: function(){
//     var cipher = Promise.promisify(bcrypt.hash);
//     return cipher(this.get('password'), null, null).bind(this)
//       .then(function(hash) {
//         this.set('password', hash);
//       });
//   }
// });

var users = new Schema({
  username: {type: String, unique: true},
  passowrd: String,
  timestamps: Date
});

users.pre('save', function(next) {
  var user = this;
  var cipher = Promise.promisify(bcrypt.hash);
  return cipher(user.password, null, null).then(function(hash) {
      user.password = hash;
    }));
})

users.methods.comparePassword = function(attemptedPassword, callback) {
  bcrypt.compare(attemptedPassword, this.password, function(err, isMatch) {
    if (err) {
      callback(err);
    }
    callback(isMatch);
  });
}


var User = mongoose.model('User', users);

module.exports = User;
