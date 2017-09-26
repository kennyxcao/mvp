const express = require('express');
const db = require('../database-mongo/index');
const bodyParser = require('body-parser');
const querystring = require('querystring');

const ba = require('beeradvocate-api');

const Promise = require('bluebird');

const app = express();

app.use(bodyParser.json());

app.use(express.static(__dirname + '/../react-client/dist'));
app.use('/js', express.static(__dirname + '/../node_modules/bootstrap/dist/js'));  // redirect bootstrap JS
app.use('/js', express.static(__dirname + '/../node_modules/jquery/dist')); // redirect JS jQuery
app.use('/css', express.static(__dirname + '/../node_modules/bootstrap/dist/css')); // redirect CSS bootstrap
app.use('/css', express.static(__dirname + '/../react-client/dist/css')); // redirect custom css file


app.post('/login', (req, res) => {
  // Check user login data with User collection
  const query = req.body;
  db.User.findOne(query).exec()
    .then(result => {
      console.log(result);
      result ? res.status(200).json(result) : res.status(404).json(null);
    });
});

app.get('/user', (req, res) => {

});

app.post('/user', (req, res) => {

});


app.get('/beer', (req, res) => {
  console.log(req.query);
  const beername = req.query.name;
  ba.beerSearch(beername, (beers) => {
    res.status(200).send(beers);
  });
});


app.post('/beer', (req, res) => {
  console.log(req.body);
  const data = req.body;
  ba.beerSearch(data.name, (beers) => {
    beers = JSON.parse(beers);
    if (beers.length === 0) { return res.status(404).json(null); }
    let beer = beers[0];
    console.log(beer);

    db.Beer.findOne({name: beer.beer_name, brewery: beer.brewery_name}).exec()
      .then(result => {
        if (!result) {
          throw result;
        }
        let newAvgRating = (result.avgRating * result.count + +data.rating) / (result.count + 1);
        let newCount = result.count++;
        return db.Beer.update({name: beer.beer_name, brewery: beer.brewery_name}, { $set: { avgRating: newAvgRating, count: newCount}}).exec();
      })
      .catch(result => {
        console.log('*********** CATCH **********');
        ba.beerPage(beer.beer_url, (beerDetail) => {
          beerDetail = JSON.parse(beerDetail);
          console.log(beerDetail);
          db.Beer.create({
            name: beer.beer_name,
            brewery: beer.brewery_name,
            location: beer.brewery_location,
            style: beerDetail.beer_sytle,
            avgRating: data.rating || 5,
            count: 1
          });
        });
      });
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

