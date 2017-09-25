const mongoose = require('mongoose');
const Promise = require('bluebird');
mongoose.Promise = require('bluebird');

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const mongodbURI = process.env.MONGODB_URI || 'mongodb://localhost/rmb';

mongoose.connect(mongodbURI);

let db = mongoose.connection;
db.on('error', function() {
  console.log('mongoose connection error');
});
db.once('open', function() {
  console.log('mongoose connected successfully');
});

let userSchema = mongoose.Schema({
  name: {
    type: String,
    unique: true
  },
  pw: {
    type: String,
    required: true
  },
  beerList: [{
    beerID: ObjectId,
    rating: Number,
    comment: String
  }],
  friends: [ObjectId],
  created: { 
    type: Date, 
    default: Date.now 
  }
});

let User = mongoose.model('User', userSchema);


let beerSchema = mongoose.Schema({
  name: String,
  brewery: String,
  beerURL: String,
  location: String,
  type: String,
  avgRating: Number,
  count: Number,
  updated: { 
    type: Date, 
    default: Date.now 
  },
  created: { 
    type: Date, 
    default: Date.now 
  }
});

let Beer = mongoose.model('Beer', beerSchema);

var selectAll = function(callback) {
  Item.find({}, function(err, items) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, items);
    }
  });
};

module.exports.selectAll = selectAll;

module.exports.db = db;
module.exports.User = User;
module.exports.Beer = Beer;