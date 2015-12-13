var express = require("express");
var mongoose = require("mongoose");
var cors = require("cors");
var bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/simple');

var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var eventRouter = require('./routes/events');
app.use('/events', eventRouter);


var server = app.listen(3000, function(){
    console.log('Server running at http://localhost:' + server.address().port)
});
