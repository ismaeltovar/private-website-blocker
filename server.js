var express = require('express');
var app = express();
app.use(express.static(__dirname + '/src'));
const port = 8080;
app.listen(port);
console.log('server on ' + port);