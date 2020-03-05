import React from 'react';

let accessToken;
const client_id = "5b3b133da7dc4f749ba57a7a3575e821";
const redirectUri = "http://localhost:3000/";
//const client_secret = "2e77fc3fd5d7477195256991456138d3";

class Spotify extends React.Component {
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
    
    //
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
      window.location = accessUrl;
    } 
  }
}

export default Spotify;