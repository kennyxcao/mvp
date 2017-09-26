import React from 'react';

// class Login extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       loggedin: false
//     };
//   }

//   render() {
//     return (<div>
//       <h4>Login Page</h4>
//     </div>);
//   }
// }

var Login = (props) => (
  <div>
    <h4>Login Page</h4>
    <form action="/login" method="post">
      <div>
        <label htmlFor="username">Username:</label>
        <input id="username" type="text" name="username" />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input id="password" type="password" name="password" />
      </div>
      <div>
        <input type="submit" value="Login" />
      </div>
    </form>    
  </div>
);


// PropTypes tell other developers what `props` a component expects
// Warnings will be shown in the console when the defined rules are violated
Login.propTypes = {
  loggedIn: React.PropTypes.bool.isRequired
};


export default Login;
