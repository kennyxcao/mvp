var userSamples = [
  {
    name: 'kenny',
    pw: 'kenny',
    // beerList: [{
    //   beerID: '1',
    //   rating: 9,
    //   comment: 'Great Beer'
    // }],
    // friends: ['2', '3']
  },
  {
    name: 'james',
    pw: '123',
    // beerList: [{
    //   beerID: '1',
    //   rating: 9,
    //   comment: 'Nice Beer'
    // }],
    // friends: ['1', '3']
  },
  {
    name: 'john',
    pw: '456',
    // beerList: [{
    //   beerID: '1',
    //   rating: 5,
    //   comment: 'Bad Beer'
    // }],
    // friends: ['1', '2']
  },  
];

var beerSamples = [
  {
    name: 'Kentucky Brunch Brand Stout',
    brewery: 'Toppling Goliath Brewing Company',
    beerURL: '/beer/profile/23222/',
    location: 'My backyard',
    style: 'Imperial Stout',
    abv: 8.5,
    avgRating: 9.7,
    count: 10
  },
  {
    name: 'Good Morning',
    brewery: 'Tree House Brewing Company',
    beerURL: 'beer/profile/28743/136936/',
    location: 'Hack Reactor',
    type: 'Imperial Stout',
    abv: 8.4,
    avgRating: 9.2,
    count: 5
  },
  {
    name: 'Pliny The Younger',
    brewery: 'Russian River Brewing Company',
    beerURL: 'beer/profile/863/21690/',
    location: 'Hack Reactor',
    type: 'Imperial Stout',
    abv: 10.25,
    avgRating: 9.5,
    count: 20
  }
];

module.exports.userSamples = userSamples;
module.exports.beerSamples = beerSamples;
