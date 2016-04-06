'use strict';

let fs          = require('fs');
let co          = require('co');
let google      = require('googleapis');
let googleAuth  = require('google-auth-library');

let SECRET_PATH = './secret.json';
let TOKEN_PATH  = './token.json';

function loadJSONFile(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, content) => {
      if (err) {
        return reject(err);
      }
      content = JSON.parse(content);
      resolve(content);
    });
  });
};

co(function *() {
  let secret = yield loadJSONFile(SECRET_PATH);
  let token = yield loadJSONFile(TOKEN_PATH);
  
  let Gmail = require("./gmail.js"); 
  let gmail = new Gmail(secret, token);
  
  let labels = yield gmail.listLabels();
  console.log(labels);
});
