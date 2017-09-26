import React from 'react';

const UserBeerListItem = (props) => (
  <tr>
    <td>{props.beer.beername}</td>
    <td>{props.beer.brewery}</td>
    <td>{props.beer.breweryLocation}</td>
    <td>{props.beer.rating}</td>
    <td>{props.beer.location}</td>
    <td>{props.beer.comment}</td>    
  </tr>
);

// PropTypes tell other developers what `props` a component expects
// Warnings will be shown in the console when the defined rules are violated
UserBeerListItem.propTypes = {
  beer: React.PropTypes.object.isRequired,
};


export default UserBeerListItem;