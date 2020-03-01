import React from 'react';
import './App.css';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      searchResults: [
        {name: 'name1', artist: 'artist1',  album: 'album1', id: 1},
        {name: 'name2', artist: 'artist2',  album: 'album2', id: 2},
        {name: 'name6', artist: 'artist6',  album: 'album6', id: 3}
      ],
      playlistName: 'playlistName1',
      playlistTracks: [
        {playlistname: 'name4', playlistartist: 'artist4',  playlistalbum: 'album4', playlistid: 4},
        {playlistname: 'name5', playlistartist: 'artist5',  playlistalbum: 'album5', playlistid: 5},
        {playlistname: 'name6', playlistartist: 'artist6',  playlistalbum: 'album6', playlistid: 6}
      ]
    }
  }
  
  render(){
    return(
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
        <div className="App-playlist">
          <SearchResults searchResults = {this.state.searchResults}/>
          <Playlist playlistName = {this.state.playlistName} playlistTracks={this.state.playlistTracks}/>
        </div>
        </div>
      </div>
    )}
}

export default App;