var mongoose = require('mongoose');

var eventSchema = new mongoose.Schema({
    calendar:           {type: mongoose.Schema.Types.ObjectId, ref: 'Calendar' },
    title:              String,
    maxAttendees:       {type: Number, default: 1},
    eventStart:         {type: Date, default: Date.now},
    eventEnd:           {type: Date, default: Date.now},
    allDay:             Boolean,
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
