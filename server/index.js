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
  const name = req.query.user;

  db.User.findOne({name}).exec()
    .then(userData => {
      userData.beerList.reverse();
      res.status(200).json(userData.beerList);
    })
    .catch(error => {
      res.status(404).send();
    });
});

app.get('/topbeer', (req, res) => {

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
  const beer = req.body;

  db.Beer.findOne({name: beer.name, brewery: beer.brewery}).exec()
    .then(result => {
      if (!result) {
        throw result;
      }

      let newBeer = {
        beerID: result._id, 
        beername: result.name, 
        brewery: result.brewery, 
        breweryLocation: result.location,
        beerURL: result.beerURL,
        style: result.style,
        rating: +beer.rating,
        location: beer.location,
        comment: beer.comment,
        updatedAt: Date.now()
      };

      let newAvgRating = (result.avgRating * result.count + +beer.rating) / (result.count + 1);
      console.log(newAvgRating);
      let newCount = ++result.count;
      
      db.Beer.update({_id: result._id}, {avgRating: newAvgRating, count: newCount, updated: Date.now()}).exec()
        .then(beerUpdateResult => {
          console.log('Existing Beer Updated');
          console.log(beerUpdateResult);

          return db.User.findOneAndUpdate({name: beer.user}, {$push: {beerList: newBeer}}).exec();
        })
        .then(userUpdateResult => {
          res.status(201).send();
        })
        .catch(error => {
          console.error(error);
        });    
    })
    .catch(result => {
      console.log('*********** CATCH - FETCHING BEER DETAILS**********');
      ba.beerPage(beer.beerURL, (beerDetail) => {
        beerDetail = JSON.parse(beerDetail);
        console.log(beerDetail);

        db.Beer.create({
          name: beer.name,
          brewery: beer.brewery,
          beerURL: beer.beerURL,
          location: beer.breweryLocation,
          style: beerDetail.beer_sytle,
          avgRating: +beer.rating || 5,
          count: 1
        })
          .then(result => {
            console.log('New Beer Created');
            console.log(result);
            const newBeer = {
              beerID: result._id, 
              beername: result.name, 
              brewery: result.brewery, 
              breweryLocation: result.location,
              beerURL: result.beerURL,
              style: result.style,
              rating: +beer.rating,
              location: beer.location,
              comment: beer.comment,
              updatedAt: Date.now()
            };
            return db.User.findOneAndUpdate({name: beer.user}, {$push: {beerList: newBeer}}).exec();
          })
          .then(updateResult => {
            res.status(201).send();
          })
          .catch(error => {
            console.error(error);
          });
      });
    })
    .error(error => {
      console.error(error);
    });
});



app.listen(3000, () => {
  console.log('listening on port 3000!');
});

