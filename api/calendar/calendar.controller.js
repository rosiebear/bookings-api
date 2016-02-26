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
var moment = require('moment');

exports.index = function(req, res, next) {
    Calendar.find(function(err, calendars){
        if (err) return next(err);
        res.status(200).json(calendars);
    });
};

exports.create = function(req, res, next) {
    Calendar.create(req.body, function (err, calendar) {
        if (err) return next(err);
        return res.status(201).json(calendar);
    });
};

exports.show = function(req, res) {
    req.calendar.deepPopulate('events.host', function(err, calendar) {
        res.status(200).json(calendar);
    });
};

exports.update = function(req, res, next) {
    if(!!req.calendar) {
        for (var k in req.body) req.calendar[k] = req.body[k];
        req.calendar['dateUpdated'] = moment().toDate();
        req.calendar.save(function(err, calendar) {
            if (err) return next(err);
            return res.status(200).json(calendar);
        });
    }
};

exports.destroy = function (req, res, next) {
    Calendar.remove({
        _id: req.calendar._id
    }, function(err, calendar) {
        if (err) return next(err);
        Event.remove({
            calendar: req.calendar._id
        }, function(err) {
            if (err) return next(err);
        })
        return res.status(200).json(calendar);
    });
};

