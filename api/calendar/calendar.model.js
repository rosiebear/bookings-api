var mongoose = require('mongoose');
var moment = require('moment');

var calendarSchema = new mongoose.Schema({

    description: String,
    title: {
        type: String,
        required: true
    },
    dateCreated: {
        default: moment().toDate(),
        type: Date
    },
    dateUpdated: {
        default: moment().toDate(),
        type: Date
    },
    events:    [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Event'
        }
    ]
});

exports.Calendar = mongoose.model('Calendar', calendarSchema);
