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

// Get a single thing
exports.show = function(req, res) {
    Calendar
    .findById(req.params.calendar)
    .populate('events')
    .exec(function (err, calendar){
        if (err) { return handleError(res, err); }
        if (!calendar) { return res.send(404); }
        return res.json(calendar);

    });
};

function handleError(res, err) {
    return res.send(500, err);
}