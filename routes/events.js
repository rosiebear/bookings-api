var express = require('express');
var router = express.Router();
var Calendar = require('../models/Calendar').Calendar;
var Event = require('../models/Event').Event;

// Preload calendar objects on routes with ':calendar'
router.param('calendar', function(req, res, next, id) {
    var query = Calendar.findById(id);

    query.exec(function (err, calendar){
        if (err) { return next(err); }
        if (!calendar) { return next(new Error("can't find calendar")); }

        req.calendar = calendar;
        return next();
    });
});

// Preload event objects on routes with ':event'
router.param('event', function(req, res, next, id) {
    var query = Event.findById(id);

    query.exec(function (err, event){
        if (err) { return next(err); }
        if (!event) { return next(new Error("can't find event")); }

        req.event = event;
        return next();
    });
});

router.route('/')
    .get(function(req, res) {
        Event.find(function(err,events){
            res.send(events)
        })
    })

    .post(function(req, res, next) {
        var event = new Event(req.body);
        event.calendar = req.calendar;

        event.save(function(err, event){
            if(err){ return next(err); }

            req.calendar.events.push(event);
            req.calendar.save(function(err, event) {
                if(err){ return next(err); }

                res.json(event);
            });
        });
    });


router.route('/:event')
    .get(function(req, res) {
        Event.findById(req.params.event, function(err,event){
            res.send(event)
        })
    })
    .put(function(req, res){
        Event.findById(req.params.event, function(err, event){
            if (err) {
                res.send(err);
            }

            if(!!event) {
                for(var k in req.body) event[k]=req.body[k];

                event.save(function(err){
                    if(err) {
                        res.send(err);
                    }

                    res.send(event)
                });
            }
        })
    })
    .delete(function(req, res) {
        Event.remove({
            _id: req.params.event
        }, function(err, bear) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });

module.exports = router;

