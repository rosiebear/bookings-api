/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

'use strict';

var Event = require('../event/event.model').Event;
var Calendar = require('./calendar.model').Calendar;

exports.index = function(req, res) {
    Calendar.find(function(err, calendars){
        if (err) return handleError(res, err);
        res.status(200).json(calendars);
    });
};

exports.create = function(req, res) {
    Calendar.create(req.body, function (err, calendar) {
        if (err) return handleError(err);
        return res.status(201).json(calendar);
    });
};

exports.show = function(req, res, next) {
    req.calendar.populate('events', function(err, calendar) {
        res.status(200).json(calendar);
    });
};

exports.update = function(req, res) {
    if(!!req.calendar) {
        for (var k in req.body) req.calendar[k] = req.body[k];
        req.calendar.save(function(err, calendar) {
            if (err) return handleError(res, err);
            return res.status(200).json(calendar);
        });
    }
};

exports.destroy = function (req, res) {
    Calendar.remove({
        _id: req.calendar._id
    }, function(err, calendar) {
        if (err) return handleError(res, err);
        Event.remove({
            calendar: req.calendar._id
        }, function(err) {
            if (err) return handleError(res, err);
        })
        return res.status(200).json(calendar);
    });
};

function handleError(res, err) {
    return res.send(500, err);
}