var express = require('express');
var router = express.Router();
var Calendar = require('../models/Calendar').Calendar;

router.route('/')
    .get(function(req, res) {
        Calendar.find(function(err, calendars){
            res.send(calendars)
        })
    })
    .post(function(req, res) {
        console.log(req.body);
        var calendar = new Calendar(req.body);
        calendar.save(function(err, calendar){
            if(err){ return next(err); }
            res.send(calendar);
        });
    });

router.route('/:calendar')
    .get(function(req, res) {
        Calendar.findById(req.params.id, function(err, calendar){
            res.send(calendar)
        })
    })
    .put(function(req, res){
        Calendar.findById(req.params.id, function(err, calendar){
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
            _id: req.params.id
        }, function(err, calendar) {
            if (err) { res.send(err);}
            res.json({ message: calendar + 'Successfully deleted' });
        });
    });

module.exports = router;

