import React from 'react';
import UserBeerListItem from './UserBeerListItem.jsx';

const UserBeerList = (props) => (
  <div>
    {!props.loggedIn ? null :
      <div className='userBeerList'>
        <h4>Your've rated { props.userBeers.length } Beer</h4>  
        <table className="table table-hover">
          <thead className="thead-default">
            <tr>
              <th>Beer Name</th>
              <th>Brewery</th>
              <th>Brewery Location</th>
              <th>Your Rating</th>
              <th>Location</th>
              <th>Comment</th>            
            </tr>
          </thead>
          <tbody>
            {props.userBeers.map((beer, i) => <UserBeerListItem key={i} beer={beer}/>)}
          </tbody>
        </table>
      </div>
    }
  </div>
);


// PropTypes tell other developers what `props` a component expects
// Warnings will be shown in the console when the defined rules are violated
UserBeerList.propTypes = {
  loggedIn: React.PropTypes.bool.isRequired,
  userBeers: React.PropTypes.array.isRequired,
};

export default UserBeerList;