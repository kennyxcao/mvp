import React from 'react';
import TopBeerListItem from './TopBeerListItem.jsx';

const TopBeerList = (props) => (
  <div className='topBeerList'>
    <h4>Top 25 Beer</h4>  
    <div className="btn-group sort-select" data-toggle="buttons">
      <label className="btn btn-primary" onClick={props.handleTopBeerFetch}>
        <input type="radio" value="avgRating" id="best-rated"/> Best Rated
      </label>
      <label className="btn btn-primary" onClick={props.handleTopBeerFetch}>
        <input type="radio" value="count" id="most-rated" onClick={props.handleTopBeerFetch}/> Most Rated
      </label>
      <label className="btn btn-primary" onClick={props.handleTopBeerFetch}>
        <input type="radio" value="created" id="newest" onClick={props.handleTopBeerFetch}/> Newest
      </label>    
    </div>
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