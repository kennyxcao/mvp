import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Login from './components/Login.jsx';
import Logout from './components/Logout.jsx';
import RateBeer from './components/RateBeer.jsx';
import UserBeerList from './components/UserBeerList.jsx';
import TopBeerList from './components/TopBeerList.jsx';
import _ from 'lodash';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      user: '',
      userBeers: [],
      topBeers: []
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleRateBeer = this.handleRateBeer.bind(this);
    this.fetchUserBeer = this.fetchUserBeer.bind(this);
    this.handleTopBeerFetch = this.handleTopBeerFetch.bind(this);
  }

  componentDidMount() {
    this.handleTopBeerFetch();
  }

  handleTopBeerFetch (e) {
    //console.log(e.target.value);
    $.ajax({
      type: 'GET',      
      url: '/topbeer', 
      data: {sortBy: 'avgRating'},
      dataType: 'json',
      success: (data) => {
        console.log('Sucessiful Fetch Top Beer Data');
        console.log(data);
        this.setState({
          topBeers: data
        });
      },
      error: (err) => {
        console.error('Fetch Top Beer Data Failed ', err);
      }
    }); 
  }

  handleLogin (info) {
    console.log(info);
    $.ajax({
      type: 'POST',
      url: '/login', 
      data: JSON.stringify(info),
      dataType: 'json',
      contentType: 'application/json',
      success: (data) => {
        console.log('Sucessiful Login');
        this.setState({
          loggedIn: true,
          user: data.name
        });
        this.fetchUserBeer();
      },
      error: (err) => {
        console.error('Login Failed', err);
      }
    });    
  }

  handleLogout (e) {
    this.setState({
      user: '',
      loggedIn: false
    });
  }

  handleRateBeer (info) {
    info['user'] = this.state.user;
    console.log(info);
    $.ajax({
      type: 'POST',      
      url: '/beer', 
      data: JSON.stringify(info),
      contentType: 'application/json',
      success: (data) => {
        console.log('Sucessiful Submit Beer Data');
        this.fetchUserBeer();
      },
      error: (err) => {
        console.error('Submit Beer Data Failed ', err);
      }
    }); 
  }

  fetchUserBeer () {
    $.ajax({
      type: 'GET',      
      url: '/user', 
      data: {user: this.state.user},
      dataType: 'json',
      success: (data) => {
        console.log('Sucessiful Fetch User Beer Data');
        console.log(data);
        this.setState({
          userBeers: data
        });
      },
      error: (err) => {
        console.error('Fetch User Beer Data Failed ', err);
      }
    });  
  }

  render () {
    return (<div className='.container-fluid'>
      <h1>Rate My Beer</h1>
      <div className="col-md-12">
        <Login loggedIn={this.state.loggedIn} handleLogin={this.handleLogin}/>
      </div>
      <div className="col-md-12">
        <Logout loggedIn={this.state.loggedIn} user={this.state.user} handleLogout={this.handleLogout} />
      </div>
      <div className="col-md-12 form-inline">      
        <RateBeer loggedIn={this.state.loggedIn} handleRateBeer={this.handleRateBeer}/>
      </div>
      <div className="col-md-12">
        <UserBeerList loggedIn={this.state.loggedIn} userBeers={this.state.userBeers}/>
      </div>
      <div className="col-md-12">
        <TopBeerList topBeers={this.state.topBeers} handleTopBeerFetch={this.handleTopBeerFetch}/>
      </div>      
    </div>);
  }
}

ReactDOM.render(<App />, document.getElementById('app'));