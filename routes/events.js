var express = require('express');
var router = express.Router();
var Event = require('../models/Event').Event;

router.get('/', function(req, res, next) {
    Event.find(function(err,events){
        res.send(events)
    })
});

router.get('/:title', function(req, res) {
    Event.findOne({title: title}, function(err,event){
        res.send(event)
    })
});

router.put('/:title', function(req, res){
    var title = req.params.title;
    Event.findOneAndUpdate({title: title}, {maxAttendees: req.body}, function(){
        res.end();
    });
});

router.post('/', function(req, res) {
    console.log(req.body);
    var event = new Event(req.body);
    event.save(function(err, event){
        if(err){ return next(err); }

        res.send(event);
    });
});

module.exports = router;

