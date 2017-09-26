import React from 'react';

class RateBeer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      location: '',
      rating: '',
      comment: ''
    };
    this.fetchBeerData = this.fetchBeerData.bind(this);
    this.handleBeernameChange = this.handleBeernameChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
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

  fetchBeerData (e) {

    // this.props.handleLogin({name: this.state.username, pw: this.state.pw});
  }

  render() {
    return (
      <div>
        {!this.props.loggedIn ? null :
        <div className='ratebeer'>
          <h4>Rate a Beer</h4>
          <form>
            <label htmlFor="beername">Beer Name:</label>
            <input id="beername" type="text" value={this.state.beername} onChange={this.handleBeernameChange} />
            <label htmlFor="location">Location:</label>
            <input id="location" type="text" value={this.state.location} onChange={this.handleLocationChange} />
            <label htmlFor="rating">Rating:</label>
            <input id="rating" type="text" value={this.state.rating} onChange={this.handleRatingChange} />
            <label htmlFor="comment">Comment:</label>
            <input id="comment" type="text" value={this.state.comment} onChange={this.handleCommentChange} />
            <button type="button" onClick={this.fetchBeerData}>Submit</button>
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
};


export default RateBeer;
