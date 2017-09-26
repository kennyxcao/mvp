import React from 'react';

const TopBeerListItem = (props) => (
  <tr>
    <td>{props.beer.name}</td>
    <td>{props.beer.brewery}</td>
    <td>{props.beer.location}</td>
    <td>{parseFloat(props.beer.avgRating).toFixed(1)}</td>
    <td>{props.beer.count}</td>
    <td>{moment(new Date(props.beer.created)).fromNow()}</td>
    <td>{moment(new Date(props.beer.updated)).fromNow()}</td>       
  </tr>
);

// PropTypes tell other developers what `props` a component expects
// Warnings will be shown in the console when the defined rules are violated
TopBeerListItem.propTypes = {
  beer: React.PropTypes.object.isRequired,
};


export default TopBeerListItem;