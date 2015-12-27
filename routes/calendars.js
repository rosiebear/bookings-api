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
        Calendar.find(function(err, calendars){
            res.send(calendars)
        })
    })
    .post(function(req, res) {
        var calendar = new Calendar(req.body);
        calendar.save(function(err, calendar){
            if(err){ return next(err); }
            res.send(calendar);
        });
    });

router.route('/:calendar')
    .get(function(req, res) {
        Calendar.findById(req.params.calendar, function(err, calendar){
            res.send(calendar)
        })
    })
    .put(function(req, res){
        Calendar.findById(req.params.calendar, function(err, calendar){
            if (err) { res.send(err); }
            if(!!calendar) {
                for(var k in req.body) calendar[k]=req.body[k];
                calendar.save(function(err){
                    if(err) { res.send(err); }
                    res.send(calendar)
                });
            }
        })
    })
    .delete(function(req, res) {
        Calendar.remove({
            _id: req.params.calendar
        }, function(err, calendar) {
            if (err) { res.send(err);}
            res.json({ message: calendar + 'Successfully deleted' });
        });
    });

router.route('/:calendar/events/')
    .get(function(req, res) {
        Calendar
        .findById(req.params.calendar)
        .populate('events')
        .exec(function (err, calendar) {
            if (err) return handleError(err);
            res.send(calendar);
        });
    })

    .post(function(req, res, next) {
        var event = new Event(req.body);
        event.calendar = req.calendar;

        event.save(function(err, event){
            if(err){ return next(err); }

            req.calendar.events.push(event);
            req.calendar.save(function(err, calendar) {
                if(err){ return next(err);
            }

            Calendar
                .findById(calendar)
                .populate('events')
                .exec(function (err, calendar) {
                    if (err) return handleError(err);
                    res.send(calendar);
                });

            });
        });
    });


router.route('/:calendar/events/:event')
    .get(function(req, res) {
        res.send(req.event)
    })


    .put(function(req, res){
        var event = req.event;
        for(var k in req.body) event[k]=req.body[k];
        event.save(function(err){
            if(err) { res.send(err); }
            res.send(event)
        });
    })

    .delete(function(req, res) {

        var index = req.calendar.events.indexOf(req.event._id);
        if (index > -1) {
            req.calendar.events.splice(index, 1);
        }
        req.calendar.save(function(err) {
            if (err) {
                return next(err);
            }
        });

        Event.remove({
            _id: req.event._id
        }, function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });

module.exports = router;

