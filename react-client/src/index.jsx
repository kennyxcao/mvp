import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Login from './components/Login.jsx';
import Logout from './components/Logout.jsx';
import RateBeer from './components/RateBeer.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      user: '',
      userBeers: [],
      topRatedBeer: [],
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
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

  handleLogin (data) {
    console.log(data);
    $.ajax({
      type: 'POST',
      url: '/login', 
      data: JSON.stringify(data),
      dataType: 'json',
      contentType: 'application/json',
      success: (data) => {
        console.log('Sucessiful Login');
        console.log(data);
        this.setState({
          loggedIn: true,
          user: data.name
        });
      },
      error: (err) => {
        console.log('err', err);
      }
    });    
  }

  handleLogout (e) {
    this.setState({
      user: '',
      loggedIn: false
    });
  }


  render () {
    return (<div className='.container-fluid'>
      <h1>Rate My Beer</h1>
      <Login loggedIn={this.state.loggedIn} handleLogin={this.handleLogin}/>
      <Logout loggedIn={this.state.loggedIn} user={this.state.user} handleLogout={this.handleLogout} />
      <RateBeer loggedIn={this.state.loggedIn}/>
    </div>);
  }
}

ReactDOM.render(<App />, document.getElementById('app'));