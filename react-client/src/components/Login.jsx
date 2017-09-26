import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      pw: ''
    };
    this.getLoginData = this.getLoginData.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleUsernameChange (e) {
    this.setState({username: e.target.value});
  }

  handlePasswordChange (e) {
    this.setState({pw: e.target.value});
  }

  getLoginData (e) {
    this.props.handleLogin({name: this.state.username, pw: this.state.pw});
  }

  render() {
    return (
      <div>
        {this.props.loggedIn ? null :
        <div className='login'>
          <h4>Login Page</h4>
          <form>
            <label htmlFor="username">Username:</label>
            <input id="username" type="text" value={this.state.username} onChange={this.handleUsernameChange} />
            <label htmlFor="password">Password:</label>
            <input id="password" type="password" value={this.state.pw} onChange={this.handlePasswordChange} />
            <button type="button" onClick={this.getLoginData}>Login</button>
          </form>
        </div>
      }
  </div>);
  }
}

// const Login = (props) => (
//   <div className='login'>
//     <h4>Login Page</h4>
//     {props.loggedIn ? null :
//       <form onSubmit={props.handleLogin}>
//         <label htmlFor="username">Username:</label>
//         <input id="username" type="text" ref="username" />
//         <label htmlFor="password">Password:</label>
//         <input id="password" type="password" ref="password" />
//         <input id="loginSubmit" type="submit"/>
//       </form>
//     }
//   </div>
// );


// PropTypes tell other developers what `props` a component expects
// Warnings will be shown in the console when the defined rules are violated
Login.propTypes = {
  loggedIn: React.PropTypes.bool.isRequired,
  handleLogin: React.PropTypes.func.isRequired
};


export default Login;
