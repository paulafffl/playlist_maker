import React from 'react';
import './App.css';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';
import toast, { Toaster } from 'react-hot-toast';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchResults: [],
            playlistName: 'Type your playlist name',
            playlistTracks: [],
            alert: '',
        };
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.updatePlaylistName = this.updatePlaylistName.bind(this);
        this.savePlaylist = this.savePlaylist.bind(this);
        this.search = this.search.bind(this);
        this.fetchTracks = this.fetchTracks.bind(this);
    }

    addTrack(track) {
        let tracks = this.state.playlistTracks;
        if (tracks.find((savedTrack) => savedTrack.id === track.id)) {
            return;
        }
        tracks.push(track);
        this.setState({ playlistTracks: tracks });
    }

    removeTrack(track) {
        let tracks = this.state.playlistTracks;
        tracks = tracks.filter((currentTrack) => currentTrack.id !== track.id);
        this.setState({ playlistTracks: tracks });
    }

    updatePlaylistName(name) {
        this.setState({ playlistName: name });
    }

    savePlaylist() {
        const tracksUris = this.state.playlistTracks.map((track) => track.uri);
        Spotify.savePlaylist(this.state.playlistName, tracksUris).then(() => {
            this.setState({
                alert: `Your new playlist '${this.state.playlistName}' was created!`,
                playlistName: 'New Playlist Name',
                playlistTracks: [],
            });
        });
    }

    search(term) {
        if (term) {
            localStorage.setItem('savedTerm', term);
            this.fetchTracks(term);
        } else {
            toast(`🎧 Please first type\na Song, Album of Artist`, {
                style: {
                    textAlign: 'center',
                    fontWeight: '700',
                    fontFamily: 'Poppins',
                    borderRadius: '10px',
                    background: '#d6acad',
                    color: '#010c3f',
                },
            });
        }
    }

    async fetchTracks(term) {
        Spotify.getAccessToken()
            .then((accessToken) => {
                Spotify.search(term, accessToken).then((mappedTracks) => {
                    this.setState({
                        searchResults: mappedTracks || [],
                    });
                });
            })
            .catch((error) => {
                console.error('User must grant access to search results');
            });
    }

    componentDidMount() {
        const savedTerm = localStorage.getItem('savedTerm');
        if (savedTerm) {
            console.log('FETCH FROM COMPONENT DID MOUNT');
            this.fetchTracks(savedTerm);
        }
    }

    render() {
        return (
            <div>
                <h1>
                    ja<span className="highlight">mm</span>ing
                    <p>Create a Spotify Playlist</p>
                </h1>
                <div className="App">
                    <SearchBar onSearch={this.search} />
                    <div className="App-playlist">
                        <SearchResults
                            searchResults={this.state.searchResults}
                            onAdd={this.addTrack}
                        />
                        <Playlist
                            playlistName={this.state.playlistName}
                            playlistTracks={this.state.playlistTracks}
                            alert={this.state.alert}
                            onRemove={this.removeTrack}
                            onNameChange={this.updatePlaylistName}
                            onSave={this.savePlaylist}
                        />
                    </div>
                </div>
                <footer>
                    Built by
                    <a
                        href="https://www.linkedin.com/in/paulafernandeslima/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Paula Lima
                    </a>
                </footer>
                <Toaster />
            </div>
        );
    }
}

export default App;
