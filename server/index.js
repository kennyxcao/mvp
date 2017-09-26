var express = require('express');
var db = require('../database-mongo/index');
var bodyParser = require('body-parser');
var ba = require('beeradvocate-api');

const Promise = require('bluebird');

var app = express();

app.use(bodyParser.json());

app.use(express.static(__dirname + '/../react-client/dist'));
app.use('/js', express.static(__dirname + '/../node_modules/bootstrap/dist/js'));  // redirect bootstrap JS
app.use('/js', express.static(__dirname + '/../node_modules/jquery/dist')); // redirect JS jQuery
app.use('/css', express.static(__dirname + '/../node_modules/bootstrap/dist/css')); // redirect CSS bootstrap
app.use('/css', express.static(__dirname + '/../react-client/dist/css'));


app.post('/login', (req, res) => {
  // Check user login data with User collection
  const query = req.body;
  db.User.findOne(query).exec()
    .then(result => {
      console.log(result);
      result ? res.status(200).json(result) : res.status(404).json(null);
    });
});


app.get('/items', (req, res) => {
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

app.listen(3000, () => {
  console.log('listening on port 3000!');
});

