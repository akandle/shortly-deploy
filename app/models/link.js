var db = require('../config');
var crypto = require('crypto');

// var Link = db.Model.extend({
//   tableName: 'urls',
//   hasTimestamps: true,
//   defaults: {
//     visits: 0
//   },
//   initialize: function(){
//     this.on('creating', function(model, attrs, options){
//       var shasum = crypto.createHash('sha1');
//       shasum.update(model.get('url'));
//       model.set('code', shasum.digest('hex').slice(0, 5));
//     });
//   }
// });

var urls = new db.Schema({
  id: Number,
  url: String,
  base_url: String,
  code: String,
  title: String,
  visits: Number,
  timestamps: Date
});

urls.pre('save', function(next) {
  var shasum = crypto.createHash('sha1');
  console.log('------------------', shasum);
  shasum.update(this.url);
  this.code = shasum.digest('hex').slice(0, 5);
  console.log('------------url: ', this.code);
  next();
})

var Link = db.mongoose.model('Link', urls);

module.exports = Link;
