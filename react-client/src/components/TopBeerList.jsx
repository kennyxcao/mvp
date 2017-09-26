import React from 'react';
import TopBeerListItem from './TopBeerListItem.jsx';

const TopBeerList = (props) => (
  <div className='topBeerList'>
    <h4>Top 25 Beer</h4>  

    <table className="table table-hover top-beer">
      <thead className="thead-default">
        <tr>
          <th>Beer Name</th>
          <th>Brewery</th>
          <th>Brewery Location</th>
          <th>Average Rating</th>
          <th>Rated Count</th>
          <th>Created</th>
          <th>Updated</th>
        </tr>
      </thead>
      <tbody>
        {props.topBeers.map((beer, i) => <TopBeerListItem key={i} beer={beer}/>)}
      </tbody>
    </table>
  </div>
);


// PropTypes tell other developers what `props` a component expects
// Warnings will be shown in the console when the defined rules are violated
TopBeerList.propTypes = {
  handleTopBeerFetch: React.PropTypes.func.isRequired,
  topBeers: React.PropTypes.array.isRequired,
};

export default TopBeerList;