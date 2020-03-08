import React from 'react';

let accessToken;
const client_id = "5b3b133da7dc4f749ba57a7a3575e821";
const redirectUri = "http://react-app-jamming.surge.sh";
//const redirectUri = "http://localhost:3000/";
const Spotify = {
  getAccessToken(){
    if (accessToken){
      return accessToken;
    }
    
    // check for access token match
    const accessTokenObtained = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
    if (accessTokenObtained && expiresInMatch) {
      accessToken = accessTokenObtained[1];
      const expiresIn = Number(expiresInMatch[1]);
      // wipe the access token and URL parameters, allowing to grab a new token when it expires
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    
    // in case the access token variable is empty and is not in the URL.
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
      window.location = accessUrl;
    } 
  },

  search(term){
    const accessToken = Spotify.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: {Authorization: `Bearer ${accessToken}`}    

    }).then(response => {
      return response.json();
      
    }).then(jsonResponse => {
      if (!jsonResponse.tracks) {
        return [];
      } 
      return jsonResponse.tracks.items.map(track => {
        return {
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri 
        }
      });
    });
  },

  savePlaylist(playlistName, uriList){
    if (!playlistName || !uriList){
      return
    }
    const accessToken = Spotify.getAccessToken();
    const headers = {Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json"}; 
    let userId;
    return fetch('https://api.spotify.com/v1/me', {headers: headers}    
    ).then(response => response.json()
    ).then(jsonResponse => {
      userId = jsonResponse.id;
      return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        headers: headers,
        method: 'POST',
        body: JSON.stringify({name: playlistName})
      }).then(response => response.json()
      ).then(jsonResponse => {
        const playlistId = jsonResponse.id;
        return fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
          headers: headers,
          method: 'POST',
          body: JSON.stringify({uris: uriList})
        })
      })
    })

  }

}

export default Spotify;