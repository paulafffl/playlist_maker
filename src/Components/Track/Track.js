import React from 'react';
import PropTypes from 'prop-types';
import './Track.css';

class Track extends React.Component{
  constructor(props){
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }

  renderAction(){
    if (this.props.isRemoval){
      return <button className="Track-action" onClick={this.removeTrack}>-</button>;
    } else {
      return <button className="Track-action" onClick={this.addTrack}>+</button>
    }
  }

  addTrack(){
    this.props.onAdd(this.props.track) 
  }

  removeTrack(){
    this.props.onRemove(this.props.track) 
  }
  
  render(){
    return(
      <div className="Track">
      <div className="Track-information">
        <h4 data-test='trackName'>{this.props.track.name}</h4>
        <p data-test='trackArtistAndAlbum'>{this.props.track.artist} | {this.props.track.album}</p>
      </div>
        {this.renderAction()}
      </div>
    )
  }
}

Track.propTypes = {
  track: PropTypes.object.isRequired,
  onAdd: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  isRemoval: PropTypes.bool.isRequired
}

export default Track;