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
var Person = require('../person/person.model').Person;

exports.index = function(req, res) {
    req.calendar.deepPopulate('events.host', function(err, calendar) {
        return res.status(200).json(calendar.events);
    });
};

exports.create = function(req, res, next) {
    var event = new Event(req.body);
    event.calendar = req.calendar;

    var query = Person.findById(event.host);
    query.exec(function (err, person){
        if (err) return next(err);
        if (!person) {
            res.status(404);
            return next(new Error("can't find host"));
        }
    });

    event.save(function (err, event) {
        if (err) return next(err);
        req.calendar.events.push(event);
        req.calendar.save(function (err) {
            if (err) return next(err);
        });

        return res.status(201).json(event);
    });
};

exports.show = function(req, res) {
    req.event.populate('host', function(err, event) {
        return res.status(200).json(event);
    });
};

exports.update = function(req, res, next) {
    if(!!req.event) {
        for (var k in req.body) req.event[k] = req.body[k];
        req.event.save(function (err) {
            if (err) return next(err);
            return res.status(200).json(req.event);
        });
    }
};

exports.destroy = function (req, res, next) {
    req.calendar.events.id(req.event._id).remove();
    req.calendar.save(function(err) {
        if (err) return next(err);
    });

    Event.remove({
        _id: req.event._id
    }, function(err) {
        if (err) return next(err);
        res.json({ message: 'Successfully deleted' });
    });
};
