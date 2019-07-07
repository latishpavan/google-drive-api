const { google } = require('googleapis');
const fs = require('fs');

const { installed: { client_id, client_secret, redirect_uris } } = JSON.parse(fs.readFileSync('./credentials.json'));

const auth = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
);

const client = callback => {
    fs.readFile('./token.json', (err, token) => {
    auth.setCredentials(JSON.parse(token));
    callback(auth);
});
};

module.exports = client;
