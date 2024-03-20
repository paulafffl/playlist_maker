# Front-End React Application

A client-side front-end React application, utilizing the Spotify API.
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Website functionalities

-   Search the Spotify library
-   Create a custom playlist
-   Save it to your Spotify account.

## Installation & Usage

1. Download the repository
1. Run `npm install` to install dependencies
1. Open react_app_jamming/src/util/Spotify.js
1. On src/util/Spotify.js, comment `redirectUri` and uncomment `redirectUriLocal`
1. Run `npm start` to launch a local environment
1. Files will be served at `http://localhost:3000`, but the website has also been deployed at http://react-app-jamming.surge.sh/

## Deployment

Run `npm run deploy` - this script will execute:

1. `npm run build` to build the application
2. `node postbuild.js` to set the domain name with the CNAME file
3. `surge --project ./build` to deploy the build directory using [Surge](https://surge.sh/)
