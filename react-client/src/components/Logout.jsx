import React from 'react';

const Logout = (props) => (
  <div>
    {!props.loggedIn ? null : 
      <div className='logout'>
        <h4>Welcome Back {props.user}!</h4>
        <button type="button" className="btn btn-primary" onClick={props.handleLogout}>Logout</button> 
      </div>
    }
  </div>
);


// PropTypes tell other developers what `props` a component expects
// Warnings will be shown in the console when the defined rules are violated
Logout.propTypes = {
  loggedIn: React.PropTypes.bool.isRequired,
  handleLogout: React.PropTypes.func.isRequired,
  user: React.PropTypes.string.isRequired
};

export default Logout;
