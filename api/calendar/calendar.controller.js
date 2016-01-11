/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

'use strict';

var Calendar = require('./calendar.model').Calendar;

exports.index = function(req, res) {
    Calendar.find(function(err, calendars){
        if (err) return handleError(res, err);
        res.status(200).json(calendars)
    });
};

exports.create = function(req, res) {
    Calendar.create(req.body, function (err, calendar) {
        if (err) return handleError(err);
        return res.status(201).json(calendar);
    });
};

exports.show = function(req, res) {
    Calendar
    .findById(req.params.calendar_id)
    .populate('events')
    .exec(function (err, calendar){
        if (err) return handleError(res, err);
        if (!calendar) { return res.send(404); }
        return res.status(200).json(calendar);
    });
};

exports.update = function(req, res) {
    Calendar.findById(req.params.calendar_id, function(err, calendar) {
        if (err) return handleError(res, err);
        for (var k in req.body) calendar[k] = req.body[k];

        calendar.save(function(err, calendar) {
            if (err) return handleError(res, err);
            return res.status(200).json(calendar);
        });
    });
};

exports.destroy = function (req, res) {
    Calendar.remove({
        _id: req.params.calendar_id
    }, function(err) {
        if (err) return handleError(res, err);
        return res.status(200).json(calendar);
    });
};

function handleError(res, err) {
    return res.send(500, err);
}