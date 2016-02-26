var express = require('express');
var calendar = require('./calendar/calendar.controller.js');
var event = require('./event/event.controller.js');
var Calendar = require('./calendar/calendar.model').Calendar;
var Event = require('./event/event.model').Event;
var router = express.Router();

// Preload calendar objects on routes with ':calendar'
router.param('calendar', function(req, res, next, id) {
    var query = Calendar.findById(id);
    query.exec(function (err, calendar){
        if (err) return next(err);
        if (!calendar) {
            res.status(404);
            return next(new Error("can't find calendar"));
        }
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

router.get('/', calendar.index);
router.post('/', calendar.create);
router.get('/:calendar', calendar.show);
router.put('/:calendar', calendar.update);
router.delete('/:calendar', calendar.destroy);

router.get('/:calendar/event', event.index);
router.post('/:calendar/event', event.create);
router.get('/:calendar/event/:event', event.show);
router.put('/:calendar/event/:event', event.update);
router.delete('/:calendar/event/:event', event.destroy);


module.exports = router;

