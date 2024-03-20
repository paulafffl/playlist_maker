import React from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList';

class Playlist extends React.Component {
    constructor(props) {
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
    }

    handleNameChange(e) {
        this.props.onNameChange(e.target.value);
    }

    render() {
        return (
            <div className="Playlist">
                <input
                    value={this.props.playlistName}
                    onChange={this.handleNameChange}
                />
                <TrackList
                    tracks={this.props.playlistTracks}
                    onRemove={this.props.onRemove}
                    isRemoval={true}
                />
                {this.props.playlistTracks.length > 0 && (
                    <div className="Button-Container">
                        <button
                            className="Playlist-save"
                            onClick={this.props.onSave}
                        >
                            SAVE TO SPOTIFY
                        </button>
                    </div>
                )}
                {this.props.alert && (
                    <p className="Succes-Message">
                        {this.props.alert}
                        <br />
                        <a href={'https://open.spotify.com/'} target="_blank">
                            Listen on your Spotify
                        </a>
                    </p>
                )}
            </div>
        );
    }
}

export default Playlist;
