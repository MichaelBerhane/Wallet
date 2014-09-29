// A simple Node.js static file server for development use
// Run with the shell command "node server.js"

var port = 8000,
    express = require('express'),
    app = express();

app.use('/', express.static(__dirname));
app.listen(process.env.PORT || port);
console.log('Now serving http://localhost:'+port+'/index.html');
