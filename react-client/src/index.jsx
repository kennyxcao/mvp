import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Login from './components/Login.jsx';
import Logout from './components/Logout.jsx';
import RateBeer from './components/RateBeer.jsx';
import _ from 'lodash';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      user: '',
      userBeers: [],
      topRatedBeer: []
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleRateBeer = this.handleRateBeer.bind(this);
  }

  componentDidMount() {
    // $.ajax({
    //   url: '/items', 
    //   success: (data) => {
    //     this.setState({
    //       items: data
    //     });
    //   },
    //   error: (err) => {
    //     console.log('err', err);
    //   }
    // });
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
        console.log(data);
        // this.setState({
        //   fetched: true,
        //   beerChoices: data
        // });
      },
      error: (err) => {
        console.error('Submit Beer Data Failed ', err);
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
    </div>);
  }
}

ReactDOM.render(<App />, document.getElementById('app'));