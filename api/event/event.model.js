var mongoose = require('mongoose');
var moment = require('moment');

var defaultDate = {
    'startDate': moment().toDate(),
    'endDate': moment().add(1, 'hours').toDate()
}

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
    calendar:           {type: mongoose.Schema.Types.ObjectId, ref: 'Calendar' },
    title:              String,
    maxAttendees:       {type: Number, default: 1},
    dateInfo:           {
        type:dateStampSchema,
        validate: [dateValidator, 'Start date must be before end date'],
        required: true,
        default: defaultDate
    },
    allDay:             {type: Boolean, default: false},
    repeat:             {
        isRepeated:         Boolean,
        type:               String,
        finalDate:          String,
        interval:           {type: Number, default: 0},
        count:              {type: Number, default: 0},
        daysOfWeek:         [Number],
        excludeDays:        [String]
    }
});

exports.Event = mongoose.model('Event', eventSchema);