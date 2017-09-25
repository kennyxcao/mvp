var express = require('express');
var bodyParser = require('body-parser');
var ba = require('beeradvocate-api');

var items = require('../database-mongo');

var app = express();

// UNCOMMENT FOR REACT
app.use(express.static(__dirname + '/../react-client/dist'));

// UNCOMMENT FOR ANGULAR
// app.use(express.static(__dirname + '/../angular-client'));
// app.use(express.static(__dirname + '/../node_modules'));

app.get('/items', function (req, res) {
  ba.beerPage('/beer/profile/16333/54413/', function(beers) {
    console.log(beers);
    res.json(beers);
  });
  // items.selectAll(function(err, data) {
  //   if (err) {
  //     res.sendStatus(500);
  //   } else {
  //     res.json(data);
  //   }
  // });
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

