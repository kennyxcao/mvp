import React from 'react';

class RateBeer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      beername: '',
      location: '',
      rating: '',    
      comment: ''
    };
    this.getBeerData = this.getBeerData.bind(this);
    this.handleBeernameChange = this.handleBeernameChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleRatingChange = this.handleRatingChange.bind(this);
    this.handleCommentChange = this.handleCommentChange.bind(this);
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
    this.props.handleRateBeer({
      name: this.state.beername, 
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
