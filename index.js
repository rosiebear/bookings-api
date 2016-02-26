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
app.use(errorHandler);

function errorHandler(err, req, res, next) {
    res.status(500);
    res.json({ error: err });
}

var person = require('./api/person-api');
app.use('/api/v1/person', person);


var calendar = require('./api/calendar-api');
app.use('/api/v1/calendar', calendar);


var server = app.listen(3001, function(){
    console.log('Server running at http://localhost:' + server.address().port)
});
