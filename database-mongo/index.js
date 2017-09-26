const data = require('./data.js');
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
    beername: String,
    brewery: String,
    breweryLocation: String,
    beerURL: String,
    style: String,
    rating: Number,
    location: String,
    comment: String,
    updatedAt: { 
      type: Date, 
      default: Date.now 
    }
  }],
  friends: [ObjectId],
  created: { 
    type: Date, 
    default: Date.now 
  }
});

let User = mongoose.model('User', userSchema);

// data.userSamples.forEach(function(user) {
//   var newUser = new User({
//     name: user.name,
//     pw: user.pw,
//     beerList: user.beerList,
//     friends: user.friends
//   }).save(function(err) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log('user saved');
//     }
//   });
// });


let beerSchema = mongoose.Schema({
  name: String,
  brewery: String,
  beerURL: String,
  location: String,
  style: String,
  avgRating: Number,
  abv: Number,
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

// data.beerSamples.forEach(function(beer) {
//   var newBeer = new Beer({
//     name: beer.name,
//     brewery: beer.brewery,
//     beerURL: beer.beerURL,
//     location: beer.location,
//     style: beer.style,
//     avgRating: beer.avgRating,
//     abv: beer.abv,
//     count: beer.count
//   }).save(function(err) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log('beer saved');
//     }
//   });
// });


// var selectAll = function(callback) {
//   Item.find({}, function(err, items) {
//     if (err) {
//       callback(err, null);
//     } else {
//       callback(null, items);
//     }
//   });
// };

// module.exports.selectAll = selectAll;

module.exports.db = db;
module.exports.User = User;
module.exports.Beer = Beer;