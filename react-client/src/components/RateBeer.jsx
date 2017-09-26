import React from 'react';

class RateBeer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      beername: '',
      location: '',
      rating: '',    
      comment: '',
      noResult: false,
      fetched: false,
      beerList: []
    };
    this.getBeerData = this.getBeerData.bind(this);
    this.handleBeernameChange = this.handleBeernameChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleRatingChange = this.handleRatingChange.bind(this);
    this.handleCommentChange = this.handleCommentChange.bind(this);
    this.handleSelectBeer = this.handleSelectBeer.bind(this);
  }

  handleBeernameChange (e) {
    this.setState({beername: e.target.value});
  }

  handleLocationChange (e) {
    this.setState({location: e.target.value});
  }

  handleRatingChange (e) {
    this.setState({rating: e.target.value});
  }

  handleCommentChange (e) {
    this.setState({comment: e.target.value});
  }

  getBeerData (e) {
    $.ajax({
      type: 'GET',      
      url: '/beer', 
      data: {name: this.state.beername},
      dataType: 'json',
      success: (data) => {
        console.log('Sucessiful Fetch Beer Data');
        console.log(data);
        if (data.length === 0) {
          this.setState({noResult: true});
        } else {
          this.setState({
            noResult: false,
            fetched: true,
            beerList: data
          });
        }

      },
      error: (err) => {
        console.error('Fetch Beer Data Failed ', err);
      }
    });     
  }

  handleSelectBeer (e) {
    console.log(e.target.value);
    const selectedBeer = this.state.beerList[e.target.value];
    this.props.handleRateBeer({
      name: selectedBeer.beer_name,
      brewery: selectedBeer.brewery_name,
      breweryLocation: selectedBeer.brewery_location, 
      beerURL: selectedBeer.beer_url,
      location: this.state.location, 
      rating: this.state.rating, 
      comment: this.state.comment}
    );
  }

  render() {
    return (
      <div>
        {!this.props.loggedIn ? null :
        <div className='ratebeer'>
          <h4>Rate a Beer</h4>
          <form>
            <div className="form-group">
              <label htmlFor="beername">Beer Name:</label>
              <input id="beername" className="form-control" type="text" value={this.state.beername} onChange={this.handleBeernameChange} />
            </div>
            <div className="form-group">
              <label htmlFor="location">Location:</label>
              <input id="location" className="form-control" type="text" value={this.state.location} onChange={this.handleLocationChange} />
            </div>
            <div className="form-group">
              <label htmlFor="rating">Rating:</label>
              <input id="rating" className="form-control" type="number" min="0" max="10" step="0.5" value={this.state.rating} onChange={this.handleRatingChange} />
            </div>
            <div className="form-group">
              <label htmlFor="comment">Comment:</label>
              <input id="comment" className="form-control" type="text" value={this.state.comment} onChange={this.handleCommentChange} />
            </div>
            <button type="button" className="btn btn-primary" onClick={this.getBeerData}>Submit</button>
          </form>
          {this.state.noResult ? <h5 className="notFound">Sorry no match found</h5> : null}
          {!this.state.fetched ? null :   
            <div className="form-group">
              <label htmlFor="selectBeer">Select one of the following matching results</label>
                <select className="form-control" defaultValue="" id="selectBeer" onChange={this.handleSelectBeer}>
                  <option value="" disabled hidden>Choose here</option>
                  {this.state.beerList.map((beer, i) => <option key={i} value={i}>{beer.beer_name}, {beer.brewery_name} -- {beer.brewery_location}</option>)}
                </select>
            </div>}
        </div>
      }
  </div>);
  }
}


// PropTypes tell other developers what `props` a component expects
// Warnings will be shown in the console when the defined rules are violated
RateBeer.propTypes = {
  loggedIn: React.PropTypes.bool.isRequired,
  handleRateBeer: React.PropTypes.func.isRequired,
};


export default RateBeer;
