/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

'use strict';

var Event = require('./event.model').Event;
var Calendar = require('../calendar/calendar.model').Calendar;

exports.index = function(req, res) {
    req.calendar.populate('events', function(err, calendar) {
        return res.status(200).json(calendar.events);
    });
};

exports.create = function(req, res) {
    var event = new Event(req.body);
    event.calendar = req.calendar;

    event.save(function (err, event) {
        if (err) return handleError(res, err);

        req.calendar.events.push(event);
        req.calendar.save(function (err) {
            if (err) return handleError(res, err);
        });

        return res.status(201).json(event);
    });
};

exports.show = function(req, res) {
    return res.status(200).json(req.event);
};

exports.update = function(req, res) {
    if(!!req.event) {
        for (var k in req.body) req.event[k] = req.body[k];
        req.event.save(function (err) {
            if (err) {
                res.send(err);
            }
            return res.status(200).json(req.event);
        });
    }
};

exports.destroy = function (req, res) {
    req.calendar.events.pull(req.event._id);

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
};

function handleError(res, err) {
    return res.status(500).send(err);
}