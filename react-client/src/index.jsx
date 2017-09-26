import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Login from './components/Login.jsx';
import List from './components/List.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      user: '',
      items: []
    };

    this.handleLogin = this.handleLogin.bind(this);
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
  }



  render () {
    return (<div className='.container-fluid'>
      <h1>Rate My Beer <small>App</small></h1>
      <Login loggedIn={this.state.loggedIn} handleLogin={this.handleLogin}/>
    </div>);
  }
}

ReactDOM.render(<App />, document.getElementById('app'));