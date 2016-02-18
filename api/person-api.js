var express = require('express');
var person = require('./person/person.controller');
var Person = require('./person/person.model').Person;
var router = express.Router();

// Preload person objects on routes with ':person'
router.param('person', function(req, res, next, id) {
    var query = Person.findById(id);
    query.exec(function (err, person){
        if (err) { return next(err); }
        if (!person) { return next(new Error("can't find person")); }
        req.person = person;
        return next();
    });
});

router.get('/', person.index);
router.post('/', person.create);
router.get('/:person', person.show);
router.put('/:person', person.update);
router.delete('/:person', person.destroy);

module.exports = router;