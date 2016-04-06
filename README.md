# nodejs-gmail-api-example

This example needs secret file and token file.  
Also, you can make them in this url link.  
[Node.js Quickstart](https://developers.google.com/gmail/api/quickstart/nodejs#prerequisites)  

### source

```
co(function *() {
  let secret = yield loadJSONFile(SECRET_PATH);
  let token = yield loadJSONFile(TOKEN_PATH);
  
  let Gmail = require("./gmail.js"); 
  let gmail = new Gmail(secret, token);
  
  let labels = yield gmail.listLabels();
  console.log(labels);
});
```