var express = require('express');
var router = express.Router();
var Event = require('../models/Event').Event;

router.get('/', function(req, res, next) {
    Event.find(function(err,events){
        res.send(events)
    })
});

router.route('/:id')

    .get(function(req, res) {
        Event.findById(req.params.id, function(err,event){
            res.send(event)
        })
    })

    .put(function(req, res){
        Event.findById(req.params.id, function(err, event){
            if (err) {
                res.send(err);
            }

            if(!!event) {
                event.title = req.body.title;

                event.save(function(err){
                    if(err) {
                        res.send(err);
                    }

                    res.send(event)
                });
            }
        })
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

