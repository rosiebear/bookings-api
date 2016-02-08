var mongoose = require('mongoose');
var moment = require('moment');

var defaultDate = {
    'startDate': moment().toDate(),
    'endDate': moment().add(1, 'hours').toDate()
};

var dateStampSchema = {
    startDate: {
        type:Date
    },
    endDate: {
        type:Date
    }
};

function dateValidator(value) {
    return moment(value.endDate).isAfter(moment(value.startDate));
}

var eventSchema = new mongoose.Schema({
    calendar: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Calendar'
    },
    title: {
        type: String,
        required: true
    },
    host: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Person'
    },
    maxAttendees: {
        type: Number,
        default: 1,
        required: true
    },
    dateInfo: {
        type:dateStampSchema,
        validate: [dateValidator, 'Start date must be before end date'],
        required: true,
        default: defaultDate
    },
    allDay: {
        type: Boolean,
        default: false
    },
    repeat: {
        isRepeated: {
            type: Boolean,
            default: false
        },
        type: {
            type: String,
            default: 'WEEKLY'
        },
        finalDate: {
            type: Date,
            default: moment().add(3000, 'years').toDate()
        },
        interval: {
            type: Number,
            default: 1
        },
        count: {
            type: Number,
            default: 0
        },
        daysOfWeek: {
            type: [Number],
            default: moment().isoWeekday()
        },
        excludeDays: [Date]
    }
});

exports.Event = mongoose.model('Event', eventSchema);