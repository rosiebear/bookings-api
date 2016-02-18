/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

'use strict';

var Person = require('./person.model').Person;
var moment = require('moment');

exports.index = function(req, res) {
    Person.find(function(err, persons){
        if (err) return handleError(res, err);
        res.status(200).json(persons);
    });
};

exports.create = function(req, res) {
    Person.create(req.body, function (err, person) {
        if (err) return handleError(err);
        return res.status(201).json(person);
    });
};

exports.show = function(req, res) {
    if(!!req.person) {
        return res.status(200).json(req.person);
    };
};

exports.update = function(req, res) {
    if(!!req.person) {
        for (var k in req.body) req.person[k] = req.body[k];
        req.person['dateUpdated'] = moment().toDate();
        req.person.save(function(err, person) {
            if (err) return handleError(res, err);
            return res.status(200).json(person);
        });
    }
};

exports.destroy = function (req, res) {
    Person.remove({
        _id: req.person._id
    }, function(err, person) {
        if (err) return handleError(res, err);
        Person.remove({
            person: req.person._id
            //need to remove from event
        }, function(err) {
            if (err) return handleError(res, err);
        })
        return res.status(200).json(person);
    });
};

function handleError(res, err) {
    return res.status(500).send(err);
}