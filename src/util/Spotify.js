const client_id = '5b3b133da7dc4f749ba57a7a3575e821';

//redirectUri for deployment
const redirectUri = 'http://react-app-jamming.surge.sh';

//redirectUri for local use
// const redirectUri = 'http://localhost:3000/';

const Spotify = {
    getAccessTokenFromUrl() {
        const urlWithToken = window.location.href.match(/access_token=([^&]*)/);
        const expiresIn = window.location.href.match(/expires_in=([^&]*)/);
        if (urlWithToken && expiresIn) {
            const accessToken = urlWithToken[1];
            localStorage.setItem('accessToken', accessToken);

            const expirationDate = Number(expiresIn[1]);
            window.setTimeout(() => {
                localStorage.removeItem('accessToken');
                window.history.pushState('Access Token', null, '/');
            }, expirationDate * 1000);
            window.location = redirectUri;
            return accessToken;
        }
    },

    getAccessToken() {
        return new Promise((resolve, reject) => {
            let accessToken = localStorage.getItem('accessToken');
            if (accessToken) {
                resolve(accessToken);
            } else {
                let accessTokenFromUrl = Spotify.getAccessTokenFromUrl();
                if (accessTokenFromUrl) {
                    accessToken = accessTokenFromUrl;
                    resolve(accessToken);
                } else {
                    const accessUrl = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
                    window.location = accessUrl;
                    let accessTokenFromUrl = Spotify.getAccessTokenFromUrl();
                    accessToken = accessTokenFromUrl;
                    reject(accessToken);
                }
            }
        });
    },

    search(term, accessToken) {
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            headers: { Authorization: `Bearer ${accessToken}` },
        })
            .then((response) => {
                return response.json();
            })
            .then((jsonResponse) => {
                if (!jsonResponse.tracks) {
                    return [];
                }
                return jsonResponse.tracks.items.map((track) => {
                    return {
                        id: track.id,
                        name: track.name,
                        artist: track.artists[0].name,
                        album: track.album.name,
                        uri: track.uri,
                    };
                });
            });
    },

    savePlaylist(playlistName, uriList) {
        if (!playlistName || !uriList) {
            return;
        }
        const accessToken = Spotify.getAccessToken();
        const headers = {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        };
        let userId;
        return fetch('https://api.spotify.com/v1/me', { headers: headers })
            .then((response) => response.json())
            .then((jsonResponse) => {
                userId = jsonResponse.id;
                return fetch(
                    `https://api.spotify.com/v1/users/${userId}/playlists`,
                    {
                        headers: headers,
                        method: 'POST',
                        body: JSON.stringify({ name: playlistName }),
                    },
                )
                    .then((response) => response.json())
                    .then((jsonResponse) => {
                        const playlistId = jsonResponse.id;
                        return fetch(
                            `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
                            {
                                headers: headers,
                                method: 'POST',
                                body: JSON.stringify({ uris: uriList }),
                            },
                        );
                    });
            });
    },
};

export default Spotify;
