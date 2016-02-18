var mongoose = require('mongoose');
var moment = require('moment');
var addressSchema = require('../address/address.model').addressSchema;

var personSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    address: {
        type: addressSchema
    },
    dob: {
        type: Date
    },
    dateCreated: {
        default: moment().toDate(),
        type: Date
    },
    dateUpdate: {
        default: moment().toDate(),
        type: Date
    }
});

personSchema.plugin(require('mongoose-role'), {
    roles: ['public', 'user', 'admin'],
    accessLevels: {
        'public': ['public', 'user', 'admin'],
        'anon': ['public'],
        'user': ['user', 'admin'],
        'admin': ['admin']
    }
});

exports.Person = mongoose.model('Person', personSchema);