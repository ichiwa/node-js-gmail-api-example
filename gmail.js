'use strict';

let google      = require('googleapis');
let googleAuth  = require('google-auth-library');
let gmail       = google.gmail('v1');

let Gmail = function(secret, tokens) {
  let auth = new googleAuth();
  this.oauth2Client = new auth.OAuth2(
    secret.client_id, 
    secret.client_secret, 
    secret.redirect_uris[0]
  );
  this.oauth2Client.credentials = tokens;
}

Gmail.prototype.callback = function(resolve, reject, apiName) {
  reject = reject || null;
  apiName = apiName || 'No name';
  return function(err, response) {
    if (err && reject != null) {
      console.log('The ' + apiName + ' API returned an error');
      return reject(err);
    }
    resolve(response);
  }
}

Gmail.prototype.listLabels = function() {
  return new Promise((resolve, reject) => {
    gmail.users.labels.list(
      {
        auth: this.oauth2Client,
        userId: 'me' 
      }, this.callback(resolve, reject, 'gmail.users.labels.list'));
  });
};

module.exports = Gmail;


